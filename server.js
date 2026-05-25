const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Tampilan utama root backend agar tidak memunculkan 'Cannot GET /'
app.get('/', (req, res) => {
  res.send('Server BromoAdventure API aktif dan siap menerima data booking!');
});

// Endpoint API untuk menerima kiriman data form booking dari frontend
app.post('/api/booking', (req, res) => {
  const { nama_pelanggan, no_whatsapp, tgl_keberangkatan, id_paket, catatan_jemput } = req.body;

  // Validasi Backend: Memastikan field wajib tidak dikirim kosong
  if (!nama_pelanggan || !no_whatsapp || !tgl_keberangkatan || !id_paket) {
    return res.status(400).json({ success: false, message: 'Data formulir tidak lengkap!' });
  }

  const query = `INSERT INTO bookings (nama_pelanggan, no_whatsapp, tgl_keberangkatan, id_paket, catatan_jemput) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nama_pelanggan, no_whatsapp, tgl_keberangkatan, id_paket, catatan_jemput], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Gagal menyimpan ke database', error: err });
    }
    res.status(200).json({ success: true, message: 'Booking berhasil disimpan!' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Back-End berjalan dengan sukses di http://localhost:${PORT}`);
});