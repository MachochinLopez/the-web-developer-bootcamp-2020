const express = require("express");
const app = express();

// app.use((req, res) => {
//     res.send("HOLAAA");
// });

app.get("/r/:subreddit/:postId", (req, res) => {
    const {subreddit, postId} = req.params;
    res.send(`This is a subreddit about ${subreddit}. Currently wathching post number ${postId}`);
});

app.get("/search", (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send("Nothing found if nothing searched!!!");
    }
    res.send(`<h1>Search results for: ${q}</h1>`);
});

app.get("/cat", (req, res) => {
    res.send("MEOW!");
});

app.post("/cat", (req, res) => {
    res.send("MEOW! BUT NOW INSIDE POST REQUEST BBY!");
});

app.get("/dog", (req, res) => {
    res.send("WOOF!");
});

app.get("/", (req, res) => {
    res.send("Welcome!!");
});

app.get("*", (req, res) => {
    res.send("I DUNNO WHAT YA LOOKIN FOR BRO!");
});

app.listen(3000, () => {
    console.log("Started!");
});