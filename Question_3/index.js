function findFirstStringInBracket(str) {
    if (str.length > 0) {
        let indexFirstBracketFound = str.indexOf("(");
        let indexClosingBracketFound = str.indexOf(")");
        if (indexFirstBracketFound >= 0  && indexClosingBracketFound >= 0) {
            return str.substring(indexFirstBracketFound+1, indexClosingBracketFound)
        } else {
            return '';
        }
    } else {
        return '';
    }
}