const db = require('./../services/db');

class Student {
    constructor(id) {
        this.id = id;
    }

    async load() {
        let stSql = `
        SELECT s.name as student, ps.name as programme, ps.id as pcode
        FROM Students s
        JOIN Student_Programme sp on sp.id = s.id
        JOIN Programmes ps on ps.id = sp.programme
        WHERE s.id = ?`;

        let stResult = await db.query(stSql, [this.id]);

        this.name = stResult[0].student;
        this.programme = stResult[0].programme;
        let pCode = stResult[0].pcode;

        let modSql = `
        SELECT m.name FROM Programme_Modules pm
        JOIN Modules m on m.code = pm.module
        WHERE programme = ?`;

        let modResult = await db.query(modSql, [pCode]);

        this.modules = modResult;
    }
}

module.exports = { Student };