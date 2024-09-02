const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;

// Definição do Schema para Músicas
const Music = mongoose.model('Music', { 
    title: String, 
    artist: String,
    album: String,
    genre: String,
    release_year: Number,
    cover_url: String,
    song_url: String,
});

// Leitura (GET) - Retorna todas as músicas
app.get("/", async (req, res) => {
    const music = await Music.find();
    return res.send(music);
});

// Deletar (DELETE) - Remove uma música por ID
app.delete("/:id", async (req, res) => {
    const music = await Music.findByIdAndDelete(req.params.id);
    return res.send(music);
});

// Editar (PUT) - Atualiza uma música por ID
app.put("/:id", async (req, res) => {
    const music = await Music.findByIdAndUpdate(
        req.params.id, 
        {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            genre: req.body.genre,
            release_year: req.body.release_year,
            cover_url: req.body.cover_url,
            song_url: req.body.song_url,
        },
        { new: true }
    );

    return res.send(music);
});

// Criar (POST) - Adiciona uma nova música
app.post("/", async (req, res) => {
    const music = new Music({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
        release_year: req.body.release_year,
        cover_url: req.body.cover_url,
        song_url: req.body.song_url,
    });

    await music.save();
    return res.send(music);
});

// Conectar ao MongoDB e Iniciar o Servidor
app.listen(port, () => {
    mongoose.connect('mongodb+srv://matheusdesacl2312:<xfDxzeLsNWDkDFiU>@pypi.65nun.mongodb.net/?retryWrites=true&w=majority&appName=pypi');
    console.log('App running');
});
