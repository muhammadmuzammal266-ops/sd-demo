const db = require('./../services/db');

class Programme {
    constructor(id) {
        this.id = id;
    }

    async load() {
        let pSql = "SELECT * FROM Programmes WHERE id = ?";
        let result = await db.query(pSql, [this.id]);

        this.name = result[0].name;

        let modSql = `
        SELECT m.code, m.name FROM Programme_Modules pm
        JOIN Modules m ON m.code = pm.module
        WHERE pm.programme = ?`;

        this.modules = await db.query(modSql, [this.id]);
    }
}

module.exports = { Programme };