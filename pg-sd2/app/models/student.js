const db = require('./../services/db');

class Student {
    id;
    name;
    programme;
    modules = [];
    note;

    constructor(id) {
        this.id = id;
    }

    async getStudentDetails() {
        var sql = "SELECT * FROM Students WHERE id = ?";
        const results = await db.query(sql, [this.id]);
        this.name = results[0].name;
        this.note = results[0].note;
    }

    async getStudentProgramme() {
        var sql = `
        SELECT p.* FROM Student_Programme sp
        JOIN Programmes p ON sp.programme = p.id
        WHERE sp.id = ?`;
        const result = await db.query(sql, [this.id]);
        this.programme = result[0];
    }

    async getStudentModules() {
        var sql = `
        SELECT m.* FROM Programme_Modules pm
        JOIN Modules m ON pm.module = m.code
        WHERE pm.programme = ?`;
        const result = await db.query(sql, [this.programme.id]);
        this.modules = result;
    }

    async addStudentNote(note) {
        var sql = "UPDATE Students SET note = ? WHERE id = ?";
        await db.query(sql, [note, this.id]);
        this.note = note;
    }

    async deleteStudentProgramme() {
        var sql = "DELETE FROM Student_Programme WHERE id = ?";
        await db.query(sql, [this.id]);
    }

    async addStudentProgramme(programme) {
        var sql = "INSERT INTO Student_Programme (id, programme) VALUES (?, ?)";
        await db.query(sql, [this.id, programme]);
    }

    async updateStudentProgramme(programme) {
        const existing = await this.getStudentProgramme();
        if (this.programme) {
            await this.deleteStudentProgramme();
        }
        await this.addStudentProgramme(programme);
    }
}

module.exports = { Student };