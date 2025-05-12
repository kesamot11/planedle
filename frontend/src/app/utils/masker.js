export function maskWord(word) {
    if(word.length <= 1) {
        return word;
    }
    return word[0] + word.slice(1).replace(/./g, (char) => (char === ' ' || char === '-' ? char : '*'));
}

