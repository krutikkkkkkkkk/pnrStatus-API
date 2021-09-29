import express from 'express'
const app = express()
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { resolve } from 'path'
const PORT = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.sendFile(resolve('./index.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(resolve('./index.html'));
})

///PNR Status
app.get('/pnr/:PNR', (req, res)=> {
    let PNR = req.params.PNR
    const url = `https://www.confirmtkt.com/pnr-status/${PNR}?`
   try{
     fetch(url)
    .then(response => response.text())
    .then(data => {
        const $ = cheerio.load(data)
    
        // Extract the Script
        const scriptData = $.html()
        console.log(scriptData)
        
        // Extract the variable
        const output = scriptData.match(/(var data = )(.*)(;)/)[0];
        
        // Parse the value
        const value = JSON.parse(output.slice(11,output.length - 1))
        res.send(value)
    })
    .catch(err=> {
        let result = {
            "result": false,
            "error": err.message
        }
        res.send(result)
    })
}
   catch(err){
       result = {
           "result": false,
           "error": err.message
       }
       res.send(result)

   }
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})