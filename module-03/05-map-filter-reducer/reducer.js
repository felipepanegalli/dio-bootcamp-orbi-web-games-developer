function reducer(arr) {
    return arr.reduce((prev, current) => prev + current, 10)
}

console.log(reducer([1, 2, 8, 15, 9]));


const list = [
    { product: 'coca-cola', price: 10 },
    { product: 'rice', price: 23 },
    { product: 'beans', price: 6 },
]

const balance = 100;

const calc = (balance, list) => {
    return list.reduce((prev, curr) => prev - curr.price, balance)
}

console.log(calc(balance, list));