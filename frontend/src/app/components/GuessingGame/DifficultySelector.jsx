export default function DifficultySelector({ difficulty, setDifficulty }) {
    const levels = ['easy', 'medium', 'hard'];
    return (
        <div className="flex gap-4 mb-4">
            {['easy', 'medium', 'hard'].map((level) => (
                <button
                    key={level}
                    className={`px-4 py-2 rounded font-semibold border hover:cursor-pointer ${difficulty === level ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                        }`}
                    onClick={() => setDifficulty(level)}
                >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
            ))}
        </div>
    );
}