import express from "express";
import bcrypt from "bcrypt";
import async from "async";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";
import pg from "pg";

const app = express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const vitePort="http://localhost:5173";
const saltRounds=10;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();


app.get("/", (req,res)=>{
    res.sendFile(vitePort);
});
app.post("register", async(req,res)=>{
    const email = req.body.username;
    const password = req.body.password;

    try{
        const checkResult = await db.query("SELECT * FROM noteApp WHERE email = $1", [email]);
        if (checkResult.rows.lengt > 0){
            res.send("Email exists");
        }else{
            bcrypt.hash(password, saltRounds, async (err, hash)=>{
                if(err){
                    console.error("Error hashing password");
                }else{
                    console.log("Hashed password.");
                    await db.query("INSERT INTO noteApp (email, password) VALUES ($1, $2)", [email,hash]);
                    res.render("index.html"); // ya da sonrasinda ne gostereceksem iste
                }
            })
        }

    }
    catch(err){
        console.log(err);
    }
});

app.listen(3000,()=>{
    console.log("server is running on port"+ port);
});