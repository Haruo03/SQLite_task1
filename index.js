const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('test.db');

const filePath = 'adress.csv';
const dbPath = 'test.db'

let data = [];

fs.createReadStream(filePath)
  .pipe(csv({
    mapHeaders: ({ header, index }) => index.toString() //文字型に指定
  }))  // インデックスをヘッダーとして使用
  .on('data', (row) => {
    const num = row['2'];
    const pref = row['6'];
    const add1 = row['7'];
    const add2 = row['8'];
    data.push({ num, pref, add1, add2 }); //csvファイルから読み込んだデータをdataに挿入
  })
  .on('end', () => {
    console.log(data); // 取得したカラムのデータを表示
  })

  .on('error', (err) => {
    console.error('Error reading CSV file', err);
  });  //エラーが発生した時に表示