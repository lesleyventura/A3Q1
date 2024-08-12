const express = require('express');
const path = require('path');

const app = express();;
const port = process.env.PORT || 5222;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

function findSummation(n) {
  if (typeof n !== 'number' || n <= 0 || !Number.isInteger(n)) {
    return false;
  }
  return (n * (n+1)) / 2;
}

function uppercaseFirstandLast(str) {
  if (typeof str !== 'string') {
    return false;
  }

  return str.split(' ').map(word => {
    if (word.length === 0) return word;
    const first = word[0].toUpperCase();
    const last = word[word.length - 1].toUpperCase();
    return first + word.slice(1, -1) + last;
  }).join(' ');
}

function findAverageandMedian(numbers) {
  if (!Array.isArray(numbers) || numbers.some(num => typeof num !== 'number')) {
    return false;
  }

  const sum = numbers.reduce((a, b) => a + b, 0);
  const average = sum / numbers.length;
  numbers.sort((a, b) => a - b);
  const mid = Math.floor(numbers.length / 2);
  const median = numbers.length % 2 === 0 ? (numbers[mid - 1] + numbers[mid]) / 2 : numbers[mid];
  return {average, median};
}

function find4Digits(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const numbers = str.split(' ').filter(num => num.match(/^\d+$/));
  for (let num of numbers) {
    if (num.length === 4) {
      return num;
    }
  }
  return false;
}

module.exports = {findSummation, uppercaseFirstandLast, findAverageandMedian, find4Digits}

app.post('/findSummation', (req, res) => {
  const number = parseInt(req.body.number, 10);
  const result = findSummation(number);
  res.json({result});
});

app.post('/uppercaseFirstandLast', (req, res) => {
  const str = req.body.str;
  const result = uppercaseFirstandLast(str);
  res.json({result});
});

app.post('/findAverageandMedian', (req, res) => {
  const numbers = req.body.numbers.split(',').map(Number);
  const result = findAverageandMedian(numbers);
  res.json({result});
});

app.post('/find4Digits', (req, res) => {
  const str = req.body.numberString;
  const result = find4Digits(str);
  res.json({result});
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${5222}`);
});
