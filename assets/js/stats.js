"use strict";
let url = "https://mindhub-xj03.onrender.com/api/amazing";
//let url = "../data/data.js"

addEventListener("DOMContentLoaded", (event) => {
    main();
});

async function getData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function main() {
    getData().then((data) => {
        // current & events
        let current = data.currentDate;
        let events = data.events;
        //ordena de mas a menos el porcentaje de ganancia
        let orderCategory = eventStaticsCategory(events);
        let  orderAttendance = orderhighestPercentageAttendance(orderCategory);
        // console.table(orderCategory);

        //ordena de mas a menos la capacidad
        let orderCapacityItem = eventStaticsCategory(events);
        orderCapacity(orderCapacityItem);
        //console.table(orderCapacityItem);

        // upcoming events by category
        let upcoming = upcomingEventsByCategory(events, current)
         //console.table(upcoming);

        // past events by category
        let past = pastEventsByCategory(events, current)
       // console.table(past);

        //event statics
        //template upcoming render

        printTable(upcoming, 'upcoming')
        //template past render
        printTable(past, 'past')
        //template statics render
        printStatics(orderCategory, 'statics')
    })
}

// filtro solo past events by category
function pastEventsByCategory(events, current) {
    let pastEvents = events.filter(evento => evento.date < current);
    let groupByCategory = pastEvents.reduce((acc, event) => {
        let category = event.category;
        if (!acc[category]) {
            acc[category] = {
                category: category,
                revenue: 0,
                percentageOfAttendance: 0,
                date: 0
            };
        }
        acc[category].revenue += event.revenue;
        acc[category].percentageOfAttendance += event.percentageOfAttendance;
        acc[category].date += event.date;
        return acc;
    }, {});
    
    let groupCategory = Object.values(groupByCategory);   
    
    return groupCategory;
}

// upcoming events by category
function upcomingEventsByCategory(events, current) {
    let upcomingEvents = events.filter(evento => evento.date > current);
    let groupByCategory = upcomingEvents.reduce((acc, event) => {
        let category = event.category;
        if (!acc[category]) {
            acc[category] = {
                category: category,
                revenue: 0,
                percentageOfAttendance: 0,
                date: 0
            };
        }
        acc[category].revenue += event.revenue;
        acc[category].percentageOfAttendance += event.percentageOfAttendance;
        acc[category].date += event.date;
        return acc;
    }, {});
   
    let groupCategory = Object.values(groupByCategory);   
   
    return groupCategory;
    
}
//order percentage attendance
function orderhighestPercentageAttendance(events) {

    events.sort((a, b) => {
        return b.percentageOfAttendance - a.percentageOfAttendance;
    });
}

//order capacity
function orderCapacity(events) {

    events.sort((a, b) => {
        return b.capacity - a.capacity;
    });
}

// add data in events
function eventStaticsCategory(events) {
    events.forEach((element) => {
        if (element.assistance) {
            let assistance = element.assistance;
            let capacity = element.capacity;
            let price = element.price;

            let revenue = assistance * price;
            let percentage = (assistance / capacity) * 100;

            element.percentageOfAttendance = percentage;
            element.revenue = revenue;
        } else {
            let assistance = element.estimate;
            let capacity = element.capacity;
            let price = element.price;

            let revenue = assistance * price;
            let percentage = (assistance / capacity) * 100;

            element.percentageOfAttendance = percentage;
            element.revenue = revenue;
        }
    });
    return events;
}


function printTable(arr, idTag) {
    
     const table = document.getElementById(idTag)
    let html = Object.values(arr).map(events => {
        return `
        <tr>
                <td>${events.category}</td>
                <td>$${events.revenue}</td>
                <td>${events.percentageOfAttendance.toFixed(2)}%</td>
        </tr>
        `
    })
   
    table.innerHTML = html.join('')
}

function printStatics(arr, idTag){
   console.table(arr); 
    const table = document.getElementById(idTag)
   let html =
        `
       <tr>
               <td>${arr.category}</td>
               <td>$${arr.revenue}</td>
               <td>${arr.percentageOfAttendance}%</td>
       </tr>
       `

    table.innerHTML = html
   }
