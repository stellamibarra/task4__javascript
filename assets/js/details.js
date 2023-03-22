let url = 'https://mindhub-xj03.onrender.com/api/amazing'
//let url = "../data/data.js"
window.addEventListener("load", main());


async function getData() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data
  } catch (err) {
    alert(err);
  }
}


function main() {
  getData().then(data => {

    details = data.events;
    const queryString = location.search
    const params = new URLSearchParams(queryString)
    const id = params.get("id")
    const item = details.find(event => event._id == id)
    const div = document.querySelector(".container")
    div.innerHTML = `

<div class="card event__card p-2 m-5 rounded ">
  <div class="row no-gutters">
    <div class="col-sm-5">
      <img
        class="card-img shadow-sm p-3 mb-5 bg-white rounded"
        src=" ${item.image} "
        alt=""
      />
    </div>
    <div class="col-sm-7">
        <div class="card-body">
          <h5 class="card-title">${item.name} </h5>
            <p class="card-text">
              ${item.description} 
            </p>
            <p class="card-text">Category : ${item.category}</p>
            <p class="card-text">Capacity : ${item.capacity}</p>
            <p class="card-text">Assistance : ${item.assistance}</p>
            <p class="card-text">Price : ${item.price}</p>

          <input type="button" value="Volver" name="volver" onclick="history.back()" />
        </div>
      </div>
    </div>
  </div>
</div>
` })
}