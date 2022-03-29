const data = [30, 30, 40, 5, 223, 2049, 3034, 5];

const uniqueData = (arr) => {
    const set = new Set(data);
    return [...set];
}

console.log(uniqueData(data));