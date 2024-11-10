document.addEventListener('DOMContentLoaded', () => {
    const requestType = document.getElementById('request_type');
    const additionalFields = document.getElementById('additionalFields');

    requestType.addEventListener('change', () => {
        const selected = requestType.value;
        additionalFields.innerHTML = '';

        if (selected === 'Rusak/Perubahan Data') {
            additionalFields.innerHTML = `
                <div class="form-group">
                    <label for="original_ktp_el">Scan KTP-el Asli</label>
                    <input type="file" id="original_ktp_el" name="original_ktp_el" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label for="kk">Scan Kartu Keluarga (KK)</label>
                    <input type="file" id="kk" name="kk" accept="image/*" required>
                </div>
            `;
        } else if (selected === 'Hilang') {
            additionalFields.innerHTML = `
                <div class="form-group">
                    <label for="ktp_el">Scan KTP-el</label>
                    <input type="file" id="ktp_el" name="ktp_el" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label for="kk">Scan Kartu Keluarga (KK)</label>
                    <input type="file" id="kk" name="kk" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label for="surat_kehilangan">Scan Surat Keterangan Kehilangan dari Kepolisian</label>
                    <input type="file" id="surat_kehilangan" name="surat_kehilangan" accept="image/*" required>
                </div>
            `;
        }
    });

});
