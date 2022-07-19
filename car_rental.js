const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')
const fs = require('fs');
const app = express()
const portNum = 8080

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const raw_data = fs.readFileSync('cred.json');
const credentials = JSON.parse(raw_data);
const client = new Client(credentials)
client.connect()


//Cars CRUD
app.get('/cars/get',(req,res)=>{
    client.query('SELECT * from cars',(err,db_res)=>{
        res.send(db_res.rows)
    })
})
app.get('/cars/get/:id',(req,res)=>{
    let id  = req.params.id
    client.query(`SELECT * from cars WHERE cars_id = ${id}`,(err,db_res)=>{
        res.send(db_res.rows)
    })
})

app.post('/cars/add',(req,res)=>{
    let data = req.body
    if (data.name && data.rent_price_daily && data.stock){
        client.query(
        `INSERT INTO cars (name,rent_price_daily,stock) values
        ('${data.name}', ${data.rent_price_daily},'${data.stock}')`,
        (err,db_res)=>{
            if(err){
                console.log(err)
                res.send('There was an error in data insert')
            };
            res.send('Data Created Successfully')
        })
    }
    else{
        res.send('Please input data correctly')    
    }
})

app.put('/cars/update/:id',(req,res)=>{
    let id  = req.params.id
    let data = req.body
    if (data.name && data.Age && data.Gender){
        client.query(
        `UPDATE cars (name,rent_price_daily,stock) values
        ('${data.name}', ${data.rent_price_daily},'${data.stock}')`,
        (err,db_res)=>{
            if(err){
                console.log(err)
                res.send('There was an error in data insert')
            };
            res.send('Data Created Successfully')
        })
    }
    else{
        res.send('Please input data correctly')    
    }
})

app.listen(8080,()=>{
    console.log(`The app listening on ${portNum}`)
})