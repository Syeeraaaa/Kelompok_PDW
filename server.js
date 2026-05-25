const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // Agar server bisa membaca data berformat JSON

// API Endpoint untuk menerima data dari form Booking Online
app.post('/api/booking', (req, res) => {
  const { nama_pelanggan, no_whatsapp, tgl_keberangkatan, id_paket, catatan_jemput } = req.body;

  const query = `INSERT INTO bookings (nama_pelanggan, no_whatsapp, tgl_keberangkatan, id_paket, catatan_jemput) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nama_pelanggan, no_whatsapp, tgl_keberangkatan, id_paket, catatan_jemput], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Gagal menyimpan data booking', error: err });
    }
    res.status(200).json({ success: true, message: 'Booking berhasil disimpan!' });
  });
});

// Menjalankan server di port 3000
app.listen(3000, () => {
  console.log('Server Back-End berjalan di http://localhost:3000');
});