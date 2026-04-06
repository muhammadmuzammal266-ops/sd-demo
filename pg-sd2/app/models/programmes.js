const db = require('../services/db');
const { Programme } = require('./programme');

async function getAllProgrammes() {
    var sql = "SELECT * FROM Programmes";
    const results = await db.query(sql);

    let rows = [];
    for (let row of results) {
        let p = new Programme(row.id);
        await p.getProgrammeName();
        rows.push(p);
    }

    return rows;
}

module.exports = { getAllProgrammes };