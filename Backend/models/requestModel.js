const db = require('../config/db.config');

const RequestModel = {
    // Fungsi untuk membuat permohonan KTP baru
    create: async (requestData) => {
        const {
            applicant_id,
            request_type,
            created_at,
            status
        } = requestData;

        try {
            const sql = `
                INSERT INTO requests (applicant_id, request_type, created_at, status)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.execute(sql, [
                applicant_id,
                request_type,
                created_at || new Date(),
                status || 'Pending'
            ]);

            return {
                request_id: result.insertId,
                applicant_id,
                request_type,
                created_at,
                status
            };
        } catch (err) {
            throw err;
        }
    },

    // Fungsi untuk mengambil semua permohonan
    getAll: async () => {
        try {
            const sql = 'SELECT * FROM requests';
            const [rows] = await db.execute(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Fungsi untuk mengambil permohonan berdasarkan ID
    getById: async (request_id) => {
        try {
            const sql = 'SELECT * FROM requests WHERE request_id = ?';
            const [rows] = await db.execute(sql, [request_id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Fungsi untuk memperbarui status permohonan
    updateStatus: async (request_id, newStatus) => {
        try {
            const sql = 'UPDATE requests SET status = ? WHERE request_id = ?';
            const [result] = await db.execute(sql, [newStatus, request_id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = RequestModel;
