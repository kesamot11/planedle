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
