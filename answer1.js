const sqlite3 = require('sqlite3');
const readline = require('readline');
const fs = require('fs');

const db = new sqlite3.Database('postal.db');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS postal');
    db.run('CREATE TABLE postal (code TEXT, pref text, city TEXT, town TEXT)');
});

const rl = readline.createInterface({
    input: fs.createReadStream('adress.csv')
});

const stmt = db.prepare('INSERT INTO postal VALUES (?, ?, ?, ?)');

db.run('BEGIN TRANSACTION');

rl.on('line', (line) => {
    const tmp = line.split(',');
    stmt.run(tmp[2].slice(1, -1), tmp[6].slice(1, -1), tmp[7].slice(1, -1), tmp[8].slice(1, -1));
});

rl.on('close', () => {
    stmt.finalize();
    db.run('COMMIT');
    db.close();
});