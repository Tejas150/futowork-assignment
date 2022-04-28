const fs = require('fs')


const csv = fs.readFileSync('../customer_data.csv')

let csvArray = []
let unique = []
let duplicate = []
let duplicateMobileNumbers = new Map();

const convertCSVToArray = (data, delimiter = ',') => {
    const header = data.slice(0, data.indexOf('\n')).toString().split(delimiter);
    const rows = data.slice(data.indexOf('\n') + 1).toString().split('\n');
    return rows.map(row => {
        const values = row.split(delimiter);
        return header.reduce((object, curr, i) => (object[curr] = values[i], object), {})
    });
};

csvArray = convertCSVToArray(csv);


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
    Processed : unique,
    unprocessed : duplicate
}

module.exports = {
    result
}