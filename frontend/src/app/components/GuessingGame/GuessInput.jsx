export default function GuessInput({ guess, setGuess, onSubmit, disabled, placeholder, feedback, buttonText }) {
    return (
        <div className="flex-center w-full max-w-md sm:max-w-xl">
            <input
                type="text"
                className="w-11/12 p-2 border border-gray-300 rounded mb-2 placeholder-gray-500 text-gray-700"
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !disabled) {
                        onSubmit();
                    }
                }}
                placeholder={placeholder}
                disabled={disabled}
                value={guess}
                >
            </input>
            <button
                className="w-11/12 p-2 bg-blue-500 text-white rounded mb-2 hover:cursor-pointer hover:bg-blue-400"
                onClick={onSubmit}
                disabled={disabled}>
                {buttonText}
            </button>
            <p
                className={feedback.className}>
                {feedback.text}
            </p>
        </div>
    );
}
