"use strict";
const main = document.querySelector('main');
const submit = document.getElementById("submit");
const modal = document.querySelector(".c-modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.getElementById("close-modal");
const FoodsContainer = document.querySelector("section");
const takhfifCode = document.getElementById("takhfifCode");
const takhfif = document.getElementById("takhfif");
const checkTakhfifBtn = document.getElementById("checkTakhfif");
const ourFoods = document.querySelector(".our-foods");
const calc = document.querySelector("aside");
const total = document.querySelector("#total");
const tax = document.querySelector("#tax");
const finalPrice = document.querySelector("#finalPrice");
const takhfifCodes = ["boronze", "silver", "gold"];
const foods = [
  {
    id:1,
    name: "همبرگر معمولی",
    price: 8000,
    img: "bill-generator-js/img/hamburger.png",
    count: 0,
    total: 0,
  },
  {
    id:2,
    name: "همبرگر مخصوص",
    price: 10000,
    img: "bill-generator-js/img/hamburger.png",
    count: 0,
    total: 0,
  },
  {
    id:3,
    name: "همبرگر معمولی با قارچ و پنیر",
    price: 10000,
    img: "bill-generator-js/img/hamburger.png",
    count: 0,
    total: 0,
  },
  {
    id:4,
    name: "همبرگر مخصوص با قارچ و پنیر",
    price: 20000,
    img: "bill-generator-js/img/hamburger.png",
    count: 0,
    total: 0,
  },
  {
    id:5,
    name: "سیب زمینی سرخ کرده ویژه",
    price: 25000,
    img: "bill-generator-js/img/french_fries.png",
    count: 0,
    total: 0,
  },
  {
    id:6,
    name: "سیب زمینی سرخ کرده",
    price: 10000,
    img: "bill-generator-js/img/french_fries.png",
    count: 0,
    total: 0,
  },
  {
    id:7,
    name: "نوشابه رژیمی",
    price: 6000,
    img: "bill-generator-js/img/soda.png",
    count: 0,
    total: 0,
  },
  {
    id:8,
    name: "نوشابه",
    price: 5000,
    img: "bill-generator-js/img/soda.png",
    count: 0,
    total: 0,
  },
  {
    id:9,
    name: "سالاد فصل",
    price: 8000,
    img: "bill-generator-js/img/salad.png",
    count: 0,
    total: 0,
  },
  {
    id:10,
    name: "سالاد سزار",
    price: 8000,
    img: "bill-generator-js/img/ceasar.png",
    count: 0,
    total: 0,
  },
  {
    id:11,
    name: "سالاد فصل",
    price: 8000,
    img: "bill-generator-js/img/salad.png",
    count: 0,
    total: 0,
  },
  {
    id:12,
    name: "سالاد سزار",
    price: 8000,
    img: "bill-generator-js/img/ceasar.png",
    count: 0,
    total: 0,
  },
];
let factor = {
  total: 0,
  tax() {
    return this.total * 0.05;
  },
  takhfif: 0,
  finalPrice() {
    if (this.takhfif > 0) {
      return (this.tax() + this.total) -(this.total + this.tax()) * (this.takhfif / 100)
    } else {
      return (this.tax() + this.total)
    }
  } 
}


FoodsContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "ION-ICON" && e.target.tagName !== "BUTTON") return;
  if (e.target.dataset.add === "true") {
    const id = e.target.closest('.food').parentElement.id;
    addFood(id)
  } else {
    const id = e.target.closest('.food').parentElement.id;
    removeFood(id)
  }
});
function addFood(id) {
  foods.forEach(food => {
    if (food.id == id) {
      ++food.count;
      food.total += food.price
      factor.total += food.price
      return foods;
    }
    
  })
  renderFactor(factor)
  renderFoods(foods)
}

function removeFood(id){
  foods.forEach(food => {
    if (food.id == id && food.count !== 0) {
      --food.count;
      food.total -= food.price
      factor.total -= food.price
      return foods;
    }
  })
  renderFoods(foods)
  renderFactor(factor)
}

function renderFoods(nFoods) {
  ourFoods.innerHTML = "";
  nFoods.forEach((food) => {
    const firstDiv = document.createElement("div")
    firstDiv.id = food.id;
    firstDiv.className = "col-11 col-md-10 col-lg-9 col-xl-6"
    ourFoods.append(firstDiv);
    const secondDiv = document.createElement("div");
    secondDiv.className = "food bg-white  shadow d-flex position-relative";
    firstDiv.append(secondDiv);
    const cardDiv = document.createElement("div");
    cardDiv.className = 'd-flex';
    const foodImg = document.createElement('img');
    foodImg.src = food.img;
    foodImg.width = 140;
    cardDiv.append(foodImg);
    const foodDetail = document.createElement("div");
    foodDetail.className = "d-flex flex-column gap-1";
    const foodName = document.createElement('h6');
    foodName.className = 'mt-3'
    foodName.innerHTML = food.name;
    foodDetail.append(foodName);
    const foodPrice = document.createElement("p");
    foodPrice.className = "mb-2"
    foodPrice.innerHTML = `<span>${food.price} تومان</span>`
    foodDetail.append(foodPrice);
    const foodBtns = document.createElement("div");
    foodBtns.className = "d-flex";
    const addBtn = document.createElement('button');
    addBtn.className = "count-btn bg-danger rounded-end-2 border-0"
    addBtn.dataset.add = true;
    addBtn.innerHTML = '<ion-icon data-add="true" name="add-outline"></ion-icon>'
    foodBtns.append(addBtn);
    const counter = document.createElement('p');
    counter.className = "count";
    counter.innerHTML = food.count;
    foodBtns.append(counter);
    const minBtn = document.createElement('button');
    minBtn.className = "count-btn bg-danger rounded-start-2 border-0"
    minBtn.dataset.remove = true;
    minBtn.innerHTML = '<ion-icon data-remove="true" name="remove-outline"></ion-icon>'
    foodBtns.append(minBtn);
    secondDiv.append(cardDiv);
    foodDetail.append(foodBtns);
    const calctotal = document.createElement("p");
    calctotal.className = "sum align-self-end ms-3"
    calctotal.innerHTML = `<span class='ft' id="sum">${food.total}</span> <span class='ftt'>تومان</span>`
    secondDiv.append(calctotal)
    cardDiv.append(foodDetail);
  });
}

// factor
function renderFactor(obj) {
  total.innerHTML = obj.total;
  tax.innerHTML = obj.tax();
  takhfif.innerHTML = obj.takhfif;
  finalPrice.innerHTML = obj.finalPrice();
}
renderFoods(foods);
renderFactor(factor);
// takhfifCode/////////////

checkTakhfifBtn.addEventListener("click", (e) => {
  if (factor.takhfif != 0) {
    alert("شما قبلا کد تخفیف استفاده کرده اید");
  } else {
    takhfifCodes.forEach((value) => {
      if (value === takhfifCode.value) {
        switch (value) {
          case "boronze":
            factor.takhfif = 10;
            break;
          case "silver":
            factor.takhfif = 20;
            break;
          case "gold":
            factor.takhfif = 30;
            break;
        }
      }
      renderFactor(factor);
    });
    if (takhfifCode.value && factor.takhfif == 0) {
      alert("کد تخفیف اشتباه است");
    }
    if (takhfifCode.value === "") {
      alert('لطفا کد را وارد کنید')
    }
  }

  takhfifCode.value = "";
});

// /modal/////
submit.addEventListener("click", () => {
  if (+finalPrice.innerHTML > 0) {
    main.style.filter = 'blur(4px)'
    factor.total = 0;
    factor.takhfif = 0;
  foods.forEach(food => {
    food.count = 0;
    food.total = 0;
  })
  renderFoods(foods);
  renderFactor(factor);
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  }
});
closeModal.addEventListener("click", () => {
  main.style.filter=''
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
});
overlay.addEventListener("click", () => {
  main.style.filter=''
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
});

