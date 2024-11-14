const { body, validationResult } = require('express-validator');

// Middleware untuk validasi input permohonan
exports.validateRequest = [
    // Validasi untuk nama lengkap
    body('full_name')
        .isLength({ min: 3 }).withMessage('Nama lengkap harus lebih dari 2 karakter')
        .isAlpha('id-ID', { ignore: ' ' }).withMessage('Nama lengkap hanya boleh berisi huruf dan spasi'),

    // Validasi untuk NIK (16 digit)
    body('nik')
        .isLength({ min: 16, max: 16 }).withMessage('NIK harus terdiri dari 16 digit')
        .isNumeric().withMessage('NIK harus berupa angka'),

    // Validasi untuk tanggal lahir
    body('birth_date')
        .isDate().withMessage('Tanggal lahir harus berupa tanggal yang valid')
        .custom((value) => {
            const today = new Date();
            const birthDate = new Date(value);
            if (birthDate >= today) {
                throw new Error('Tanggal lahir tidak bisa lebih dari hari ini');
            }
            return true;
        }),

    // Validasi untuk nomor telepon (harus terdiri dari angka dan 10-15 digit)
    body('phone_number')
        .isLength({ min: 10, max: 15 }).withMessage('Nomor telepon harus antara 10 hingga 15 digit')
        .isNumeric().withMessage('Nomor telepon harus berupa angka'),

    // Validasi untuk email
    body('email')
        .isEmail().withMessage('Email tidak valid'),

    // Validasi untuk jenis permohonan
    body('request_type')
        .isIn(['Cetak Ulang Karena Rusak/Perubahan Data', 'Cetak Ulang Karena Hilang']).withMessage('Jenis permohonan tidak valid'),

    // Middleware untuk memeriksa error validasi
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Jika validasi berhasil, lanjutkan ke route handler
    }
];
