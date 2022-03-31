function filterPairs(arr) {
    return arr.filter(item => item % 2 === 0)
}

console.log(filterPairs([1, 2, 8, 15, 9]));