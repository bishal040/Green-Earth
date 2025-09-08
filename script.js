const url1 = "https://openapi.programming-hero.com/api/plants"
const url2 = "https://openapi.programming-hero.com/api/categories"
const url3A = "https://openapi.programming-hero.com/api/category/${id}"
const url3B = "https://openapi.programming-hero.com/api/category/1"
const url4A = "https://openapi.programming-hero.com/api/plant/${id}"
const url4B = "https://openapi.programming-hero.com/api/plant/1"
console.log("I am calling");
const allPlants = () => {
  fetch(url1)
  .then((res)=>res.json())
  .then((json) => {
    //console.log(json.plants[0])
    const allPlantsContainer = document.getElementById("all-plants-container");
    const arr= json.plants;
    allPlantsContainer.innerHTML = "";
    for(let plant of arr){
      if (!document.querySelector(`button[data-category="${plant.category}"]`)) {
      console.log(plant.name);
      const plantBtn = document.createElement("div");
      plantBtn.innerHTML = `
      <button class="category-btn block w-full px-6 py-2 text-zinc-700 rounded-xl text-left" data-category="${plant.category}">${plant.category}</button>
      `;
      allPlantsContainer.appendChild(plantBtn);
    }
  }
    }
  )   
};
allPlants();