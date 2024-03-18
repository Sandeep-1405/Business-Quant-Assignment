const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"business_quant"
})

db.connect(err=>{
    if(err){
        console.log(`Error while connecting to Database ${err}`)
    }else{
        console.log("Successfully Connected to Database")
    }
})

app.get('/',(req,res)=>{
    const getquery = "Select * from quant_assignment"
    db.query(getquery,(error,data)=>{
        if (error){
            console.log(`Error: ${error}`)
            return res.send("Error")
        }else{
            console.log("Data Fetched")
            return res.send("Data Fetched")
        }
    })
})

app.post('/create',(req,res)=>{
    const {ticker,date,revenue,gp,fcf,capex} = req.body;

    const postquary = `INSERT INTO quant_assignment (ticker, date, revenue, gp, fcf, capex) VALUES ('${ticker}', '${date}', '${revenue}', '${gp}', '${fcf}','${capex}')`

    db.query(postquary,(error,data)=>{
        if(error){
            console.log(`Error: ${error}`)
            return res.send("Error")
        }else{
            console.log("Data Inserted Successfully")
            return res.send(`Data Inserted Successfully Data: ${data}`)
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const sql = "DELETE FROM quant_assignment where id = ?";

    db.query(sql,[id],(err,data) =>{
        if (err) return res.json("Error");
        return res.json("Deleted");
    })
})

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000/')
})