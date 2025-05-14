'use client';

import React, { useState, useEffect, use } from 'react';
import { fetchRandomAircraft } from '../api/airlineAircraftApi';

export default function AirlineAircraft() {
    const [aircraft, setAircraft] = useState(null);
    const [guess, setGuess] = useState('');
    const [correctAirline, setCorrectAirline] = useState(null);
    const [correctAircraft, setCorrectAircraft] = useState(null);
    const [airlineGuessed, setAirlineGuessed] = useState(false);
    const [aircraftGuessed, setAircraftGuessed] = useState(false);
    const [airlineGuessArray, setAirlineGuessArray] = useState([]);
    const [aircraftGuessArray, setAircraftGuessArray] = useState([]);
    const [availAircraft, setAvailAircraft] = useState(true);
    const [availAirline, setAvailAirline] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [difficulty, setDifficulty] = useState(() => {
        if (typeof window !== 'undefined') {
           return localStorage.getItem('difficulty') || 'easy';
       }
        return 'easy'; // fallback for SSR
    });

    // Fetch random aircraft data when the component mounts or when the difficulty changes
    useEffect(() => {
        fetchRandomAircraft(difficulty)
            .then((data) => setAircraft(data))
            .catch((error) => console.error('Error fetching aircraft data:', error));
    }, [difficulty]);

    // Store the difficulty level in the local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('difficulty', difficulty);
    }, [difficulty]);

    if(!aircraft) {
        return <div>Loading...</div>;
    }

    function triggerConfetti() {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    }    

    function checkAirlineGuess(guess) {
        const isCorrect = guess.toLowerCase() === aircraft.airline.toLowerCase();
        if (isCorrect) {
            setCorrectAirline('true');
            setAvailAirline(false);
            triggerConfetti();
        } else {
            setCorrectAirline('false');
        }
        setAirlineGuessArray((prev) => {
            const updated = [...prev, guess];
            // After adding the current guess, is it now more than 6?
            if (!isCorrect && updated.length > 5) {
                setCorrectAirline('limit-reached');
                setAvailAirline(false);
            }
            return updated;
        });
        setAirlineGuessed(true);
    }

    function checkAircraftGuess(guess) {
        console.log('Guess:', guess);
        console.log('Correct Answer:', aircraft.aircraft);
        const isCorrect = guess.toLowerCase() === aircraft.aircraft.toLowerCase();
        if (isCorrect) {
            setCorrectAircraft('true');
            setAvailAircraft(false);
            triggerConfetti();
        } else {
            setCorrectAircraft('false');
        }
        setAircraftGuessArray((prev) => {
            const updated = [...prev, guess];
            // After adding the current guess, is it now too many?
            if (!isCorrect && updated.length > 5) {
                setCorrectAircraft('limit-reached');
                setAvailAircraft(false);
            }
            return updated;
        });
        setAircraftGuessed(true);
    }

    function splitWord(word, correct) {
      const words = word.split(' ');
      return (
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          {words.map((wordSegment, wordIndex) => (
            <div key={wordIndex} className="flex gap-1">
              {wordSegment.split('').map((char, index) => {
                const shouldReveal =
                  correct === 'true' ||
                  correct === 'limit-reached' ||
                  (wordIndex === 0 && index === 0) ||
                  char === '-';

               const displayChar = shouldReveal ? char : '';

                const classes = [
                  'w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 text-white flex items-center justify-center font-bold rounded',
                  correct === 'true' ? 'bg-green-500' : '',
                  correct === 'limit-reached' ? 'bg-red-500' : '',
                ].join(' ');

                return (
                  <div key={index} className={classes}>
                    {displayChar}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    }    

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <div className="flex gap-4 mb-4">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  className={`px-4 py-2 rounded font-semibold border hover:cursor-pointer ${
                    difficulty === level ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setDifficulty(level)}
                >
                 {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full max-w-md sm:max-w-6xl p-4 sm:p-6 mb-6">
                <div className="flex justify-center flex-wrap text-gray-700 text-2xl sm:text-4xl text-center">{splitWord(aircraft.airline.toUpperCase(), correctAirline)}</div>
                <div className="flex justify-center flex-wrap mt-2 justify-center text-gray-700 text-2xl sm:text-4xl text-center">{splitWord(aircraft.aircraft.toUpperCase(), correctAircraft)}</div>
            </div>
            <div className="flex-center w-full max-w-md sm:max-w-xl">
                <input
                    type="text"
                    className="w-11/12 p-2 border border-gray-300 rounded mb-2 placeholder-gray-500 text-gray-700"
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if(availAirline) {
                                checkAirlineGuess(guess);
                            }
                        }
                    }}
                    placeholder="Type in your airline guess...">
                </input>
                <button 
                    className="w-11/12 p-2 bg-blue-500 text-white rounded mb-2 hover:cursor-pointer"
                    onClick={() => {
                        if(availAirline) {
                            checkAirlineGuess(guess)
                        } 
                    }}
                    disabled={!availAirline}>
                    Check Your Airline Guess
                </button>
                <p 
                    className={airlineGuessed ? (correctAirline === 'true' ? 'text-green-500 bounce' : 'text-red-500') : ''}>
                        {correctAirline === 'true' ? '🎉Correct!' : (correctAirline === 'false' ? 'Incorrect! Try again.' : (correctAirline === 'limit-reached' ? 'You have reached the limit of guesses!' : ''))}
                </p>
            </div>
            <div className="flex-center w-full max-w-md sm:max-w-xl mt-6 grid grid-cols-1 gap-4">
                <input
                    type="text"
                    className="w-11/12 p-2 border border-gray-300 rounded mb-2 placeholder-gray-500 text-gray-700"
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if(availAircraft) {
                                checkAircraftGuess(guess);
                            }     
                        }
                    }}
                    placeholder="Type in your aircraft guess...">
                </input>
                <button 
                    className="w-11/12 p-2 bg-blue-500 text-white rounded mb-2 hover:cursor-pointer"
                    onClick={() => {
                        if(availAircraft) {
                            checkAircraftGuess(guess);
                        }
                    }}>  
                    Check Your Aircraft Guess
                </button>
                <p 
                    className={aircraftGuessed ? (correctAircraft === 'true' ? 'text-green-500 bounce' : 'text-red-500') : 'text-opacity-0'}>
                    {correctAircraft === 'true'? '🎉Correct!' : (correctAircraft === 'false' ? 'Incorrect! Try again.' : (correctAircraft === 'limit-reached' ? 'You have reached the limit of guesses!' : ''))}
                </p>
            </div>
            <div className="w-full max-w-md sm:max-w-xl mt-6 grid grid-cols-1 gap-4 guess-div">
                <div>
                    <h2 className="font-semibold mb-1 text-gray-800">Airline Guesses:</h2>
                    {airlineGuessArray.map((g, i) => (
                        <p key={i} className="text-gray-800 text-sm">{i + 1}. {g}</p>
                    ))}
                </div>
                <div>
                    <h2 className="font-semibold mb-1 text-gray-800">Aircraft Guesses:</h2>
                    {aircraftGuessArray.map((g, i) => (
                        <p key={i} className="text-gray-800 text-sm">{i + 1}. {g}</p>
                    ))}
                </div>
            </div>
            {showConfetti && (
               <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="confetti-piece"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
                                animationDelay: `${Math.random()}s`,
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}