// const formatPrice = (num) => {
//     if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
//     if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
//     if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
//     return num.toString();
// };

// export default formatPrice;

const formatPrice = (num) => {
    // If num is null, empty, or undefined, return an empty string
    if (num === null || num === "" || num === undefined) return "";

    // Convert string to number if needed
    const number = typeof num === "string" ? Number(num) : num;

    // If conversion results in NaN, return an empty string
    if (isNaN(number)) return "";

    // Format the number
    if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (number >= 1_000_000) return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (number >= 1_000) return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";

    return number.toString();
};

export default formatPrice;
