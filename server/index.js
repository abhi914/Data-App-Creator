
const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")

const connection = require('./connection/connect')


const app = express()
const port = 3000;
// Cors is a 3rd party library used to avoid CORS blocking
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Used to fetch the data from the table

app.get('/get-data', (req, res) => {
    connection.query("SELECT * FROM App_Menu", (error, results, fields) => {
        res.send(results);
    });    
});

//Used to delete row in the table

app.delete('/delete-item', (req, res) => {
    connection.query("DELETE FROM App_Menu WHERE id ="+ req.body.id, (error, results, fields) => {        
        res.send(results);
    });
});

//Used to edit row in the table

app.put('/edit-item', (req, res) => {   
    connection.query(`UPDATE App_Menu SET name = "${req.body.data.item.name}", description ="
        ${ req.body.data.item.description }", url = "${req.body.data.item.url}", icon_url= "${req.body.data.item.icon_url}", parent_id = 
        ${req.body.data.item.parent_id}, status = ${req.body.data.item.status} WHERE id = ${req.body.data.item.id}`,
        (error, results, fields) => {    
            res.send(results);   
    });
});

//Used to add new row to the Table

app.post('/add-item', (req, res) => {       
    connection.query(`INSERT INTO App_Menu (name, description, url, icon_url, parent_id, status) VALUES('${req.body.data.item.name}',
    '${ req.body.data.item.description }', '${req.body.data.item.url}', '${req.body.data.item.icon_url}',
    ${parseInt(req.body.data.item.parent_id)}, ${req.body.data.item.status})`, 
    (error, results, fields) => {                   
        res.send(results);   
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));