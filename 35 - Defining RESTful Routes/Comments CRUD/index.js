const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is soo funny XD'
    },
    {
        id: uuidv4(),
        username: 'Paco',
        comment: 'Oye bro te gusta The Strokes?'
    },
    {
        id: uuidv4(),
        username: 'Adrián',
        comment: 'BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE BYDE '
    },
    {
        id: uuidv4(),
        username: 'Jorge',
        comment: 'hey que tal mis speedsters!'
    },
    {
        id: uuidv4(),
        username: 'Oto',
        comment: 'pero si te gusta cuties o no?'
    }
];

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// COMMENTS INDEX
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

// COMMENTS CREATE
app.get('/comments/new', (req, res) => {
    res.render('comments/create');
});

// COMMENTS SHOW
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === id);
    
    res.render('comments/show', { comment });
});

// COMMENTS EDIT
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === id);

    res.render('comments/edit', { comment });
});

// COMMENTS STORE
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    // Mete el comentario al arreglo.
    comments.push({ id: uuidv4(), username, comment });
    // Redirige.
    res.redirect('/comments');
});

// COMMENTS PATCH
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const originalComment = comments.find(comment => comment.id === id);
    // Toma el nuevo comentario.
    const sentCommentText = req.body.comment;
    // Actualiza el comentario.
    originalComment.comment = sentCommentText;
    // Redirige.
    res.redirect('/comments');
});

// COMMENTS DELETE
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(comment => comment.id !== id);
    res.redirect('/comments');
});

app.listen(3000, () => {
    console.log('Service started!');
});