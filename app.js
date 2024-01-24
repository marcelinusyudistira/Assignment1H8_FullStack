const express = require('express');
const fs = require('fs'); 

const app = express();
const config = require("./config.json");

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true}))

// Menampilkan data json dari semua buku
app.get('/books', async (req, res) => {
    try {
        const data = await fs.readFileSync('./data/buku.json','utf-8');
        const semuaBuku = JSON.parse(data);
        res.json(semuaBuku);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Menampilkan data json dari buku dengan id yang ditentukan
app.get('/books/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync('./data/buku.json', 'utf-8');
        const semuaBuku = JSON.parse(data);
        const idBuku = parseInt(req.params.id);
        const buku = semuaBuku.find(buku => buku.id === idBuku);
        // cek data buku
        if (buku) {
            res.json(buku);
        } else {
            res.status(404).json({ error: 'Buku tidak ditemukan!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Menampilkan data semua buku dalam bentuk tabel dengan template EJS
app.get('/ejs/books', async (req, res) => {
    try {
        const data = await fs.readFileSync('./data/buku.json', 'utf-8');
        const semuaBuku = JSON.parse(data);
        res.render('books', { semuaBuku });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(config.server.port, () => {
    console.log(`Server berjalan pada : http://localhost:${config.server.port}`);
});
