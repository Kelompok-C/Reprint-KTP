const requestModel = require('../models/requestModel');

// Controller untuk membuat permohonan KTP
exports.createRequest = async (req, res, next) => {
    try {
        const requestData = req.body;
        
        // Simpan data ke database menggunakan model
        const result = await requestModel.create(requestData);

        res.status(201).json({ message: 'Permohonan berhasil dibuat', data: result });
    } catch (err) {
        next(err);  // Kirim ke error handler
    }
};
