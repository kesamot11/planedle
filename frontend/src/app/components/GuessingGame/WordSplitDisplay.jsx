export default function WordSplitDisplay({ word, correct }) {
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
