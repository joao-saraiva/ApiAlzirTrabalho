const express = require('express');
const app = express();

const articles = [];
let id = 1;

app.use(express.json());

function articleExist(req,res,next) {
    const article = articles.find( article => article.id == req.params.id )

    if(!article){
        return res.status(404).send("Article not found");
    }

    req.article = article;
    next();
}

app.get("/", (req, res) =>{
    res.status(200).send("Back-end Challange 2021 - Space Flight News");
})

app.get("/articles", (req, res) =>{
    res.status(201).json(articles);
})

app.get("/articles/:id", articleExist, (req, res) =>{ 
    const { article } = req;

    return res.status(201).json(article);
})

app.post("/articles", (req, res) =>{
    const article = req.body;

    article.id = id;
    id += 1;

    articles.push(article);
    res.status(201).send("Created With Success");
})

app.put("/articles/:id", articleExist, (req, res) =>{
    const { article } = req;
    const newAritcleData = req.body;
    const keys = Object.keys(newAritcleData);

    keys.map(key => {
        article[key] =  newAritcleData[key];
    });

    res.status(201).send("Updated With Success");
})

app.delete("/articles/:id",articleExist, (req, res) =>{
    const { article } = req;
    const index = articles.indexOf(article);

    articles.splice(index[0], 1);
    res.status(201).send("Deleted with Success");
})


app.listen(3000, () => {
    console.log("Lisen on port 3000");
});