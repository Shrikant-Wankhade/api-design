
//Blocking code   //blocking the cpu with heavy intesnive task synchronously
// 
//How not to write blocking code
//  1. Write async code

const me = 'shrikant'
console.log(me);


// do not do file system sync

const fs = require('fs/promises');
const { validateHeaderValue } = require('http');
const path = require('path')

let t1 = Date.now();
const read = async ()=>{
    
    const result = fs.readFile(path.join(__dirname,'package.json'));
    console.log(result)
    console.log((Date.now()-t1)/1000);
    console.log("last")
    console.log()
    return result;
}


let f = read();
console.log(f)
f.then(g=>console.log(g))


    





