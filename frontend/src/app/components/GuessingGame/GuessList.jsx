export default function GuessList({ type, array }) {
    return (
        <div>
            <h2 className="font-semibold mb-1 text-gray-800">{type} Guesses:</h2>
            {array.map((g, i) => (
                <p key={i} className="text-gray-800 text-sm">{i + 1}. {g}</p>
            ))}
        </div>
    );
}