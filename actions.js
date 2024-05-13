'use server'
import eventsData from '/src/app/events.json';
const fs = require("fs")



export async function saveEventData(formdata) {
    console.log(Array.from(formdata.entries()))
    eventsData.push(Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => { console.log(key); return !key.includes("$ACTION_ID")})))
    var jsonData = JSON.stringify(eventsData)
    fs.writeFile("src/app/events.json", jsonData, function(err) {if(err) {console.log(err)}})

    console.log("Data saved!")
}