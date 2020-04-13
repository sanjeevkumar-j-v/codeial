const express = require('express');
const app = express();
const port = 8000;

app.listen(function(err){
    if(err){
        console.log(`Error on running the server : ${err}`);
    }
    console.log(`Server is succesfully running on the port : ${port}`);
})