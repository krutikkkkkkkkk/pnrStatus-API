const express = require('express')
const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const confirmtkt = "https://www.confirmtkt.com/pnr-status/8439577672?"

fetch(confirmtkt)
.then(response => response.text())
.then(data => {
     let start = data.search("data = ")
     let end = data.search("if(data === null)")
     let findIndex = lastIndexOf("if(data === null)")
     console.log(findIndex)
     console.log(start)
     console.log(end)

     let object = data.slice(start,end)
     console.log(object)
})
.catch(err=> {
    console.log(err)
})