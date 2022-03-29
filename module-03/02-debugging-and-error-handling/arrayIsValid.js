const isValidArray = (arr, num) => {
    try {
        if (!arr && !num) throw new ReferenceError('Parâmetros não enviados.');

        if (typeof arr !== 'object') throw new TypeError('O arr precisa ser do tipo object.');

        if (typeof num !== 'number') throw new TypeError('o num precisa ser do tipo number.');

        if (arr.length !== num) throw new RangeError('O tamanho do array não corresponde ao número.');

        return arr;
    } catch (error) {
        if (error instanceof ReferenceError) {
            console.log("Este é um erro de referência.");
            console.log(error.message);
        } else if (error instanceof TypeError) {
            console.log("Este é um erro de tipagem.");
            console.log(error.message);
        } else if (error instanceof RangeError) {
            console.log("Este é um erro de inconsistência de valores.");
            console.log(error.message);
        } else {
            console.log("Erro inesperado. Erro: " + e);
        }
    }
}

isValidArray([], 1);