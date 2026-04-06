const db = require('./../services/db');

class Module {
    constructor(code) {
        this.code = code;
    }

    async load() {
        let sql = "SELECT * FROM Modules WHERE code = ?";
        let result = await db.query(sql, [this.code]);

        this.name = result[0].name;

        let stSql = `
        SELECT Students.name AS student
        FROM Students
        JOIN Student_Programme ON Students.id = Student_Programme.id
        JOIN Programme_Modules ON Student_Programme.programme = Programme_Modules.programme
        WHERE Programme_Modules.module = ?`;

        this.students = await db.query(stSql, [this.code]);
    }
}

module.exports = { Module };