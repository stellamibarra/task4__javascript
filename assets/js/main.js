
let url = ' https://mindhub-xj03.onrender.com/api/amazing'
//let url = "../data/data.js"

const container = document.getElementById('contenedor')
const checkContainer = document.getElementById('checkContainer')
const input = document.querySelector('input')


addEventListener('load', main())

async function main() {
  getData().then(data => {
    let array = data.events
    templateCard(array)
    createCheckBox(data.events)
  })
}

async function getData() {
  let response = await fetch(url)
  let data = await response.json()
  return data
}

input.addEventListener('input',superFilter)

checkContainer.addEventListener('change',superFilter)


function superFilter(){
    getData().then(function
    (data){
        filtrar(data)
    }
    )
}

function filtrar(data){
    let txtFilter = textFilter(data.events,input.value)
    let filter = checkFilter(txtFilter)
    templateCard(filter)
}


function createCheckBox(array){
    let arrayByCategory = array.map(data => data.category)
    let category = new Set(arrayByCategory)
    let arrayChecks = Array.from(category)
    let checkboxes = ''
    arrayChecks.forEach(element => {
        checkboxes += `<div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="${element}" value="${element}">
        <label class="form-check-label" for="${element}">${element}</label>
      </div>`
    })
    checkContainer.innerHTML = checkboxes
}



function textFilter(array,text){
    let arrayFilter = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFilter
}

function checkFilter(array){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    let arrayFilter = array.filter(element => arrayChecksCheckedValues.includes(element.category))
    if(arrayChecksChecked.length > 0){
        return arrayFilter
    }
    return array
}

function templateCard(data) {
  console.log(
    "template"
  );
  console.log(
    data
  );
    let card = ''
    data.forEach(element => {
      card +=
        `
      <div class="row p-4 justify-content-center ">
      <div class="card text-center" style="width: 18rem">
    <img
      src="${element.image}"
      class="card-img-top mt-2"
      alt="..."
    />
      <div class="card-body">
        <h4 class="">${element.name}</h4>
        <h5 class="">${element.category}</h5>

        <p class="card-text">${element.description}</p>
        <div class="price d-flex justify-content-between">
          <p class="card-text">${element.price}</p>
          <a href="./details.html?id=${element._id}" class="btn btn-primary">Details</a>
        </div>
      </div>
  </div>
  </div>
  `
    });

    container.innerHTML = card
  }

