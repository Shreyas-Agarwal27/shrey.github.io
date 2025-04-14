function analyzeText() {
    const text = document.getElementById("textInput").value;
    const output = document.getElementById("output");

    if (text.length === 0) {
        output.innerText = "Please enter some text.";
        return;
    }

    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = (text.match(/\b[a-zA-Z0-9'-]+\b/g) || []).length;
    const spaceCount = (text.match(/ /g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialSymbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const pronouns = [
        "I", "you", "he", "she", "it", "we", "they", "my", "your", "his", "her", "its", "our", "their",
        "this", "that", "these", "those", "who", "whom", "which", "what", "whose", "all", "any", "each", "every",
        "no one", "none", "some", "anybody", "anyone", "anything", "each other", "one another", "myself", "yourself",
        "himself", "herself", "itself", "ourselves", "themselves", "him"
    ];
    const pronounCount = countTokens(text, pronouns);

    const prepositions = [
        "aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "anti", "around",
        "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", 
        "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", 
        "from", "in", "inside", "into", "like", "near", "of", "off", "on", "onto", "opposite", "outside", "over",
        "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "toward", "towards", "under", 
        "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"
    ];
    const prepositionCount = countTokens(text, prepositions);

    const articles = ["a", "an"];
    const articleCount = countTokens(text, articles);

    output.innerText = `
    Count of Letters: ${letterCount}
    Count of Words: ${wordCount}
    Count of Spaces: ${spaceCount}
    Count of Newlines: ${newlineCount}
    Count of Special Symbols: ${specialSymbolCount}
    
    Pronoun Count:
    ${formatCounts(pronounCount)}
    
    Preposition Count:
    ${formatCounts(prepositionCount)}
    
    Indefinite Article Count:
    ${formatCounts(articleCount)}
    `;
}

function countTokens(text, tokenList) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return words.reduce((countMap, word) => {
        if (tokenList.includes(word)) {
            countMap[word] = (countMap[word] || 0) + 1;
        }
        return countMap;
    }, {});
}

function formatCounts(countMap) {
    return Object.entries(countMap).map(([key, value]) => `${key}: ${value}`).join("\n");
}
