// Add unit when number is too large
export function digitFormater(cardData: number | string): {num: string, unit: string} {
    if (typeof cardData === 'string') cardData = parseInt(cardData);
    let unit: string = "";
    if (cardData >= 1000000000000) {
        cardData /= 1000000000000;
        unit = "M";
    } else if (cardData >= 1000000000) {
        cardData /= 1000000000;
        unit = "B";
    } else if (cardData >= 1000000) {
        cardData /= 1000000;
        unit = "T";
    }

    return {num: cardData.toFixed(0).toString(), unit: unit};
}
