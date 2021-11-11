import express from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { resolve } from 'path';

const app = express();
const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile(resolve('./index.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(resolve('./index.html'));
})

///Api route
app.get('/api/:PNR', (req, res)=> {
    //Get PNR from Form Data

    //let PNR = req.query.PNR;
    let PNR = req.params.PNR

    const url = `https://www.confirmtkt.com/pnr-status/${PNR}?`;
   try{
     fetch(url)
    .then(response => response.text())
    .then(data => {
        const $ = cheerio.load(data);
        const scriptData = $.html();
        const output = scriptData.match(/(var data = )(.*)(;)/)[0];
        let value = JSON.parse(output.slice(11,output.length - 1));

        delete value["ShowBlaBlaAd"]
        delete value["ShowCab"]
        delete value["Ads"]
        delete value["WebsiteEvents"]
        delete value["WebsiteAds"]
        delete value["SponsoredButtons"]
        delete value["Ads"]
        res.send(value);
    })
    .catch(err=> {
        let result = {
            "result": false,
            "error": err.message
        }
        res.send(result);
    })
}
   catch(err){
       result = {
           "result": false,
           "error": err.message
       }
       res.send(result);

   }
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
