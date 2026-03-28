'use client';

import React, { useState, useEffect, useRef } from 'react';
import Confetti from './Confetti';
import DifficultySelector from './DifficultySelector';
import ShareButton from './ShareButton';
import GuessInput from './GuessInput';
import WordSplitDisplay from './WordSplitDisplay';
import GuessList from './GuessList';
import useGuess from '../../hooks/useGuess';
import useDifficulty from '../../hooks/useDifficulty';
import RefreshButton from './RefreshButton';
import useAircraft from '../../hooks/useAircraft';
import useDaily from '../../hooks/useDaily';
import { incrementGuesses } from '../../hooks/useIncrement';
import { useSession } from '@/app/hooks/useSession';
import { GameMode } from '@/app/types';

interface AirlineAircraftProps {
    mode: GameMode;
}

export default function AirlineAircraft({ mode }: AirlineAircraftProps) {
    const [difficulty, setDifficulty] = useDifficulty();
    const [practiceAircraft, setPracticeAircraft] = useAircraft(difficulty);
    const daily = useDaily();

    const isDaily = mode === 'daily';
    const aircraft = isDaily ? daily.aircraft : practiceAircraft;

    const [airlineGuess, setAirlineGuess] = useState('');
    const [aircraftGuess, setAircraftGuess] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [gameId, setGameId] = useState(0);

    const airlineGuessing = useGuess(aircraft?.airline, triggerConfetti, gameId);
    const aircraftGuessing = useGuess(aircraft?.aircraft, triggerConfetti, gameId);

    const postedRef = useRef(false);
    const dailyPostedRef = useRef(false);

    const { user, setUser } = useSession();

    // Reset refs when game changes
    useEffect(() => {
        postedRef.current = false;
    }, [gameId, aircraft?.airline, aircraft?.aircraft]);

    useEffect(() => {
        dailyPostedRef.current = false;
    }, [mode]);

    // Increment user score when both guessed correctly
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
      }, [airlineGuessing.status, aircraftGuessing.status, aircraft, gameId, user?.id]);

    // Save daily completion
    useEffect(() => {
        if (!isDaily || dailyPostedRef.current) return;

        const airlineDone = !airlineGuessing.available;
        const aircraftDone = !aircraftGuessing.available;

        if (!airlineDone || !aircraftDone) return;

        dailyPostedRef.current = true;
        daily.markCompleted({
            airlineGuesses: airlineGuessing.status === 'true' ? airlineGuessing.guesses.length + 1 : airlineGuessing.guesses.length,
            aircraftGuesses: aircraftGuessing.status === 'true' ? aircraftGuessing.guesses.length + 1 : aircraftGuessing.guesses.length,
            airlineWon: airlineGuessing.status === 'true',
            aircraftWon: aircraftGuessing.status === 'true',
        });
    }, [isDaily, airlineGuessing.available, aircraftGuessing.available]);

    // Show loading state
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

    // If daily is already completed, show the result
    if (isDaily && daily.completed) {
        return (
            <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily Challenge Complete!</h2>
                <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full max-w-md sm:max-w-6xl p-4 sm:p-6 mb-6">
                    <WordSplitDisplay word={aircraft.airline.toUpperCase()} correct="true" guessCount={6} />
                    <WordSplitDisplay word={aircraft.aircraft.toUpperCase()} correct="true" guessCount={6} />
                </div>
                <div className="text-center text-gray-700 mb-4">
                    <p>Airline: {daily.completed.airlineWon ? `${daily.completed.airlineGuesses}/6` : 'X/6'} {daily.completed.airlineWon ? 'v' : 'x'}</p>
                    <p>Aircraft: {daily.completed.aircraftWon ? `${daily.completed.aircraftGuesses}/6` : 'X/6'} {daily.completed.aircraftWon ? 'v' : 'x'}</p>
                </div>
                <ShareButton
                    airlineGuesses={daily.completed.airlineGuesses}
                    aircraftGuesses={daily.completed.aircraftGuesses}
                    airlineWon={daily.completed.airlineWon}
                    aircraftWon={daily.completed.aircraftWon}
                    difficulty="medium"
                    isDaily
                />
                <p className="text-gray-500 text-sm mt-4">Come back tomorrow for a new challenge!</p>
            </div>
        );
    }

    function triggerConfetti() {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    }

    const gameFinished = !airlineGuessing.available && !aircraftGuessing.available;

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            {!isDaily && (
                <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            )}

            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full max-w-md sm:max-w-6xl p-4 sm:p-6 mb-6">
                <WordSplitDisplay word={aircraft.airline.toUpperCase()} correct={airlineGuessing.status} guessCount={airlineGuessing.guesses.length} />
                <WordSplitDisplay word={aircraft.aircraft.toUpperCase()} correct={aircraftGuessing.status} guessCount={aircraftGuessing.guesses.length} />
            </div>
            {!isDaily && (
                <RefreshButton
                    difficulty={difficulty}
                    setAircraft={setPracticeAircraft}
                    setGameId={setGameId}
                />
            )}
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
                            ? 'Correct!'
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
                            ? 'Correct!'
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
            {gameFinished && (
                <ShareButton
                    airlineGuesses={airlineGuessing.status === 'true' ? airlineGuessing.guesses.length + 1 : airlineGuessing.guesses.length}
                    aircraftGuesses={aircraftGuessing.status === 'true' ? aircraftGuessing.guesses.length + 1 : aircraftGuessing.guesses.length}
                    airlineWon={airlineGuessing.status === 'true'}
                    aircraftWon={aircraftGuessing.status === 'true'}
                    difficulty={isDaily ? 'medium' : difficulty}
                    isDaily={isDaily}
                />
            )}
            {showConfetti && (
                <Confetti />
            )}
        </div>
    );
}
