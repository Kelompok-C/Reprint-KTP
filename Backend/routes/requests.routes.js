const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const requestController = require('../controllers/requestController');
const { validateRequest } = require('../middlewares/validation');

// Route untuk membuat permohonan KTP
router.post('/create', validateRequest, requestController.createRequest);

// Get all requests
router.get('/requests', (req, res) => {
    db.query("SELECT * FROM requests", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a single request by ID
router.get('/requests/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM requests WHERE request_id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Create a new request
router.post('/requests', (req, res) => {
    const { applicant_id, request_type, registration_number } = req.body;
    const query = "INSERT INTO requests (applicant_id, request_type, registration_number) VALUES (?, ?, ?)";
    db.query(query, [applicant_id, request_type, registration_number], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Request created successfully", requestId: result.insertId });
    });
});

// Update request status
router.put('/requests/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = "UPDATE requests SET status = ? WHERE request_id = ?";
    db.query(query, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Request status updated successfully" });
    });
});



module.exports = router;
