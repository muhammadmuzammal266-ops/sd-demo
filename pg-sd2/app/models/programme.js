const db = require('./../services/db');

class Programme {
    constructor(id) {
        this.id = id;
    }

    async getProgrammeName() {
        var sql = "SELECT * FROM Programmes WHERE id = ?";
        const result = await db.query(sql, [this.id]);

        this.pName = result[0].name;
    }
}

module.exports = { Programme };