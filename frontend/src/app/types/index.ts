export interface UserDTO {
  id: number;
  username: string;
  email: string;
  correctGuesses: number;
}

export interface AircraftData {
  airline: string;
  aircraft: string;
  difficulty: string;
}

export type GuessStatus = 'true' | 'false' | 'limit-reached' | null;

export interface GuessState {
  guesses: string[];
  status: GuessStatus;
  check: (guess: string) => void;
  available: boolean;
  guessed: boolean;
}

export interface Feedback {
  className: string;
  text: string;
}

export type GameMode = 'daily' | 'practice';

export interface DailyResult {
  date: string;
  airlineGuesses: number;
  aircraftGuesses: number;
  airlineWon: boolean;
  aircraftWon: boolean;
}
