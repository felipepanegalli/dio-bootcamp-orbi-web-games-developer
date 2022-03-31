const apple = { value: 2 }
const orange = { value: 10 }

function mapWithThis(arr, thisArg) {
    return arr.map(function (item) {
        return item * this.value;
    }, thisArg)
}

console.log(mapWithThis([1, 2], apple));
console.log(mapWithThis([1, 2], orange));

function mapWithoutThis(arr) {
    return arr.map(function (item) {
        return item * 2;
    })
}

console.log(mapWithoutThis([1, 2, 8, 15, 9]));