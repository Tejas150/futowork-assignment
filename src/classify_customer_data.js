const fs = require('fs')


const csv = fs.readFileSync('../customer_data.csv')

let csvArray = []

const convertCsvToArray = (data, delimiter = ',') => {
    const header = data.slice(0, data.indexOf('\n')).toString().split(delimiter);
    const rows = data.slice(data.indexOf('\n') + 1).toString().split('\n');
    return rows.map(row => {
        const values = row.split(delimiter);
        return header.reduce((object, curr, i) => (object[curr] = values[i], object), {})
    });
};

csvArray = convertCsvToArray(csv);


let unique = []
let duplicate = []
let duplicateMobileNumbers = new Map();

csvArray.forEach((obj) => {
    if(duplicateMobileNumbers.has(obj.mobile)) {
        duplicate.push(obj)
    }
    else {
        duplicateMobileNumbers.set(obj.mobile, 1);
        unique.push(obj)
    }
})

const result = {
    processed : unique,
    unprocessed : duplicate
}

module.exports = {
    result
}