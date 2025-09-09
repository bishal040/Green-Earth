const url1 = "https://openapi.programming-hero.com/api/plants"
const url2 = "https://openapi.programming-hero.com/api/categories"
//const url3A = "https://openapi.programming-hero.com/api/category/${id}"
const url3B = "https://openapi.programming-hero.com/api/category/1"
const url4A = "https://openapi.programming-hero.com/api/plant/${id}"
const url4B = "https://openapi.programming-hero.com/api/plant/1"
    const allPlants = () => {
      fetch(url1)
      .then((res)=>res.json())
      .then((json) => {
        const allPlantsContainer = document.getElementById("all-plants-container");
        const arr= json.plants;
        allPlantsContainer.innerHTML = "";
        let count = 1;
        for(let plant of arr){
          if (!document.querySelector(`button[data-category="${plant.category}"]`)) {
          const plantBtn = document.createElement("div");
          plantBtn.innerHTML = `
          <button onClick="loadData(${count++})" class="category-btn block w-full px-6 py-2 text-zinc-700 rounded-xl text-left cursor-pointer" data-category="${plant.category}">${plant.category}</button>
          `;
          allPlantsContainer.appendChild(plantBtn);
        }
      }
      loadCards(arr);
        }
      )   
    };
  allPlants();
    const loadData = (id) => {
      const url =`https://openapi.programming-hero.com/api/category/${id}`;
      const allCards = document.getElementById("plant-cards");
      allCards.innerHTML = "";
      fetch(url)
      .then((res)=>res.json())
      .then((json) => {
        const arr= json.plants;
        loadCards(arr);
      });
    }
    //LoadCards Function
    const loadCards =(plants) => {
      const allCards = document.getElementById("plant-cards");
      allCards.innerHTML = "";
      for(let plant of plants){
        const cardBtn = document.createElement("div");
        cardBtn.innerHTML = `
        <div class="card bg-white p-5 h-[500px] w-full  ">
      <img src="${plant.image}" alt="" class="h-54 xl:h-48 w-full object-cover rounded-lg">
      <p class="mt-2 mb-2 font-bold">${plant.name}</p>
      <p class="mt-2 mb-2">${plant.description}</p>
      <div class="flex justify-between items-center ">
        <button class="bg-green-50 p-2 rounded-2xl text-green-700 cursor-pointer">${plant.category}</button>
        <p><b>Tk <span> ${plant.price}</span></b></p>
      </div>
      <button onClick="addCart(${plant.id})" class="add-to-cart bg-green-700 p-2 rounded-2xl text-white cursor-pointer mt-2 mb-2 mt-auto">Add to Cart</button>
    </div>
        `;
        allCards.appendChild(cardBtn);
      }
    }
    //Add Cart Function
    const addCart = (id) => {
      const cart = document.getElementById("cart-log");
      fetch(url1)
      .then((res) => res.json())
      .then((json) => {
        const arr = json.plants;
        for(let plant of arr){
          if(plant.id==id){
            let alreadyExist =document.querySelector(`div[data-name="${plant.name}"]`);
            if(!alreadyExist){
              const createCart = document.createElement("div");
              createCart.innerHTML = `
              <div id="cart-log" class="mr-2 ml-2 px-5 py-5 mb-2 rounded-xl flex  justify-between items-center bg-green-50" data-name="${plant.name}">
              <div>
              <p class="font-bold mb-2">${plant.name}</p><span class="cart-price">${plant.price} * </span><span class="cart-qnt">1</span></div>
              <div><button onClick="cancleOrder('${plant.name}')" class="cursor-pointer cancleBtn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" 
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button></div>
              </div>
              `;
              let total = document.getElementById("total-amount");
              let current = parseInt(total.innerText) || 0;
              total.innerText = current + parseInt(plant.price);
              cart.appendChild(createCart);
            }
            else{
              let cartQnt = alreadyExist.querySelector(".cart-qnt");
              let qnt = parseInt(cartQnt.innerText)+1;
              cartQnt.innerText = qnt;
              let total = document.getElementById("total-amount");
              let current = parseInt(total.innerText) || 0;
              total.innerText = current + parseInt(plant.price);
            }
          }
        }
      });
    }
    //cancleOrder Function
    const cancleOrder = (plantName) => {
      let cart = document.querySelector(`div[data-name="${plantName}"]`);
      let cartPrice = cart.querySelector(".cart-price");
      let cartQnt= cart.querySelector(".cart-qnt");
      let total = document.getElementById("total-amount");
      let current = parseInt(total.innerText);
      total.innerText = current -(parseInt(cartPrice.innerText)*parseInt(cartQnt.innerText));
      cart.remove();
    }
