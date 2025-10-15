'use client';

import React, { useState, useEffect, useRef } from 'react';
import { fetchRandomAircraft } from '../../api/airlineAircraftApi';
import Confetti from './Confetti';
import DifficultySelector from './DifficultySelector';
import GuessInput from './GuessInput';
import WordSplitDisplay from './WordSplitDisplay';
import GuessList from './GuessList';
import useGuess from '../../hooks/useGuess';
import useDifficulty from '../../hooks/useDifficulty';
import RefreshButton from './RefreshButton';
import useAircraft from '../../hooks/useAircraft';
import { incrementGuesses } from '../../hooks/useIncrement';
import { useSession } from '@/app/hooks/useSession';

export default function AirlineAircraft() {
    const [difficulty, setDifficulty] = useDifficulty();
    const [aircraft, setAircraft] = useAircraft(difficulty);
    const [airlineGuess, setAirlineGuess] = useState('');
    const [aircraftGuess, setAircraftGuess] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [gameId, setGameId] = useState(0);

    const airlineGuessing = useGuess(aircraft?.airline, triggerConfetti, gameId);
    const aircraftGuessing = useGuess(aircraft?.aircraft, triggerConfetti, gameId);

    const postedRef = useRef(false);

    const { user, setUser } = useSession();

    useEffect(() => {
        postedRef.current = false;
    }, [gameId, aircraft?.airline, aircraft?.aircraft]);

    useEffect(() => {
        const bothCorrect = airlineGuessing.status === 'true' && aircraftGuessing.status === 'true';

        if (!user || !bothCorrect || postedRef.current || !aircraft) return;

        postedRef.current = true;
        
        incrementGuesses(user.id)
        .then((updatedUser) => {
            setUser(updatedUser);
          })
        .catch(err => {
            console.error("Error incrementing guesses:", err);
            postedRef.current = false;
        });
      }, [airlineGuessing.status, aircraftGuessing.status, aircraft, gameId, user?.id,]);




    if (!aircraft || !aircraft.airline || !aircraft.aircraft) {
        return <div className="text-gray-700 loading">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>;
    }

    function triggerConfetti() {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    }

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />

            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full max-w-md sm:max-w-6xl p-4 sm:p-6 mb-6">
                <WordSplitDisplay word={aircraft.airline.toUpperCase()} correct={airlineGuessing.status} />
                <WordSplitDisplay word={aircraft.aircraft.toUpperCase()} correct={aircraftGuessing.status} />
            </div>
            <RefreshButton 
                difficulty={difficulty}
                setAircraft={setAircraft}
                setGameId={setGameId}
            />
            <GuessInput
                guess={airlineGuess}
                setGuess={setAirlineGuess}
                onSubmit={() => {
                    if (airlineGuessing.available) airlineGuessing.check(airlineGuess);
                }}
                disabled={!airlineGuessing.available}
                placeholder="Type in your airline guess..."
                feedback={{
                    className: airlineGuessing.guessed
                        ? airlineGuessing.status === 'true'
                            ? 'text-green-500 bounce'
                            : 'text-red-500'
                        : '',
                    text:
                        airlineGuessing.status === 'true'
                            ? '🎉 Correct!'
                            : airlineGuessing.status === 'false'
                                ? 'Incorrect! Try again.'
                                : airlineGuessing.status === 'limit-reached'
                                    ? 'You have reached the limit of guesses!'
                                    : '',

                }}
                buttonText="Check Your Airline Guess"
            />

            <GuessInput
                guess={aircraftGuess}
                setGuess={setAircraftGuess}
                onSubmit={() => {
                    if (aircraftGuessing.available) aircraftGuessing.check(aircraftGuess);
                }}
                disabled={!aircraftGuessing.available}
                placeholder="Type in your aircraft guess..."
                feedback={{
                    className: aircraftGuessing.guessed
                        ? aircraftGuessing.status === 'true'
                            ? 'text-green-500 bounce'
                            : 'text-red-500'
                        : '',
                    text:
                        aircraftGuessing.status === 'true'
                            ? '🎉 Correct!'
                            : aircraftGuessing.status === 'false'
                                ? 'Incorrect! Try again.'
                                : aircraftGuessing.status === 'limit-reached'
                                    ? 'You have reached the limit of guesses!'
                                    : '',
                }}
                buttonText="Check Your Aircraft Guess"
            />

            <div className="w-full max-w-md sm:max-w-xl mt-6 grid grid-cols-1 gap-4 guess-div">
                <GuessList
                    type="Airline"
                    array={airlineGuessing.guesses}
                />
                <GuessList
                    type="Aircraft"
                    array={aircraftGuessing.guesses}
                />
            </div>
            {showConfetti && (
                <Confetti />
            )}
        </div>
    );
}