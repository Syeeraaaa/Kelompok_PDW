const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Sesuaikan dengan user MySQL Anda
  password: '',      // Sesuaikan dengan password MySQL Anda
  database: 'bromoadventure_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ' + err.stack);
    return;
  }
  console.log('Berhasil terhubung ke database BromoAdventure.');
});

module.exports = connection;