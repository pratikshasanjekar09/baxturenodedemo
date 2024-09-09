const { error } = require('console');
const { addAbortListener } = require('events');
const express = require('express');
const app = express();
const port = 8080;
const http = require("http");

app.get('/',(req,res)=>{
    console.log("app is listmning on port 8080");
})

app.listen(port,()=>{
    console.log("app listen on port 8080")
});


let server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
})

server.listen(8000,()=>{
    console.log(">>>>>>>>>>>server is listining om  port")
})


async function addSync(a,b){
    return new Promise((resolve,reject)=>{
        if(a && b){
            resolve(a+ b);
        }else{
            reject(new Error('Both arguments must be numbers'))
        }
    }).catch((error) => {
        throw new Error("Something went wrong");
    });
}

async function sum(){
 try{
   rs = await addSync(5,10)
   console.log("result",rs)
 }catch(e){
    throw e
 }
}

sum();