"use strict";
// Elements
let totalMoneyElement = document.querySelector("#totalMoney");
let percentageElement = document.querySelector("#percentageLeft");
let buyButtons = document.querySelectorAll("#buy");
let sellButtons = document.querySelectorAll("#sell");
const appContainer = document.querySelector(".app-container");

// Default data
let brasilMoney = 289420865;
let totalPercentage = 100;

let elements = [];

// Events
appContainer.addEventListener("click", (e) => {
  let element = e.target.parentElement;

  if (e.target.classList.contains("btn-buy")) {
    buyItem(element);
  } else if (e.target.classList.contains("btn-sell")) {
    sellItem(element);
  }
});

// Buy item
function buyItem(element) {
  // change default data to new data

  if (brasilMoney - Number(element.dataset.price) >= 0) {
    brasilMoney -= Number(element.dataset.price);
    totalPercentage = (brasilMoney * 100) / 289420865;

    // Item name
    let itemName = element.parentElement.querySelector("#name").textContent;

    // get span to increment by one
    let amountOfItems = element.querySelector("#amount");
    amountOfItems.textContent = `${Number(amountOfItems.textContent) + 1}`;

    // get button to enable it when item is more than 0
    let button = element.querySelector("#sell");
    if (Number(amountOfItems.textContent) > 0) {
      button.disabled = false;
    }

    updateTotalAndPercentage();

    // Create (if its new) or update recipt item(if it already exists)
    createReciptItem(
      itemName,
      Number(amountOfItems.textContent),
      formatMoney(
        Number(element.dataset.price) * Number(amountOfItems.textContent)
      )
    );

    updateReceipt();
  } else {
    cantAffordAlert();
  }
}

function cantAffordAlert() {
totalMoneyElement.innerHTML = `<p class="totalMoney">Restante: ${formatMoney(elonFortune)} BRL</p>`;
percentageElement.innerHTML = `<p class="percentageLeft">Você só gastou ${(100 - totalPercentage).toFixed(6)} % do total!</p>`;
}

function createReciptItem(name, amount, total) {
  let receiptItem = new ReceiptItem();
  receiptItem.name = name;
  receiptItem.amount = amount;
  receiptItem.total = total;

  if (!checkReceiptItemExists(receiptItem)) {
    receiptItemsArr.push(receiptItem);
  } else {
    updateReceiptItem(receiptItem);
  }
}

// Sell Item
function sellItem(element) {
  // change default data to new data

  brasilMoney += Number(element.dataset.price);
  totalPercentage = (brasilMoney * 100) / 289420865;

  // Item name
  let itemName = element.parentElement.querySelector("p").textContent;

  // get span to decrement by one
  let amountOfItems = element.querySelector("span");
  amountOfItems.textContent = `${Number(amountOfItems.textContent) - 1}`;

  // get button to disable when item is less than 0
  let button = element.querySelector("#sell");

  if (Number(amountOfItems.textContent) === 0) {
    button.disabled = true;
  }
  updateTotalAndPercentage();

  createReciptItem(
    itemName,
    Number(amountOfItems.textContent),
    formatMoney(
      Number(element.dataset.price) * Number(amountOfItems.textContent)
    )
  );

  updateReceipt();
}

function updateTotalAndPercentage() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Restante: ${formatMoney(
    brasilMoney
  )} </p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">Você gastou ${(
    100 - totalPercentage
  ).toFixed(6)} % do total!</p>`;
}

// Format Money Function
function formatMoney(number) {
    return `R$ ${number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
}


// Class to create unique receipt items
class ReceiptItem {
  constructor() {
    this.name;
    this.amount;
    this.total;
  }
}

let receiptItemsArr = [];

// Function that check if that receipt items its already added on the array
function checkReceiptItemExists(receiptItem) {
  let i = 0;
  let exists = false;

  while (!exists && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];
    if (itemX.name === receiptItem.name) {
      exists = true;
    }
    i++;
  }

  return exists;
}

function updateReceiptItem(receiptItem) {
  let i = 0;
  let itemInArr = null;

  while (itemInArr === null && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];

    if (itemX.name === receiptItem.name) {
      itemInArr = itemX;
    }
    i++;
  }

  if (itemInArr) {
    itemInArr.name = receiptItem.name;
    itemInArr.amount = receiptItem.amount;
    itemInArr.total = receiptItem.total;
  }
}

// Function to create recipt (iterara por el array y mostrara los objetos en una lista)
function updateReceipt() {
  let title = `<h1>Recibo</h1>`;
  let receipt = "";
  let total = formatMoney(289420865 - brasilMoney);

  for (let i = 0; i < receiptItemsArr.length; i++) {
    let itemX = receiptItemsArr[i];

    if (itemX.amount !== 0) {
      receipt += `<p>${itemX.name} x <strong> ${itemX.amount}</strong>.............. ${itemX.total}</p>`;
    }
  }

  document.querySelector("#receipt-container").innerHTML =
    title + receipt + `<p class="totalRecipt">Total gasto: ${total}</p>`;
}

// Function to print
function printSection(el) {
  let printsection = document.getElementById(el).innerHTML;
  document.body.innerHTML = printsection;

  window.print();
}

// Element class - preload data - generate html elements

class Element {
  static nro = 1;
  constructor(name, price, image) {
    this.id = Element.nro++;
    this.name = name;
    this.price = price;
    this.amount = 0;
    this.image = image;
  }
}

function createAndSaveElement(elementName, price, image) {
  if (elementName !== "" && price > 0 && image !== "") {
    let newElement = new Element(elementName, price, image);
    elements.push(newElement);
  }
}

preLoad();

function preLoad() {
createAndSaveElement(
    "Bitcoin (2024)",
    512799,
    "https://i.imgur.com/Kas85R1.jpeg"
  );
  createAndSaveElement(
    "PlayStation®5",
    3700,
    "https://i.imgur.com/enUzgwd.jpeg"
);
  createAndSaveElement(
    "Cachaça 51",
    50,
  "https://i.imgur.com/j3ZDKfz.jpeg"
  );
 createAndSaveElement(
    "Iphone 16 Pro Max",
    10210,
    "https://i.imgur.com/KoqnTOS.jpeg"
  );
   createAndSaveElement(
    "MacBook Pro 14 - M3 de 8 núcleos, 1Tera",
    26825,
    "https://i.imgur.com/dPwK77u.jpeg"
  );
   createAndSaveElement(
    "Montar Setup Gamer",
    20000,
    "https://i.imgur.com/Nw5ToSJ.jpeg"
  );
  createAndSaveElement(
    "Spotify por 80 Anos🎶",
    19104,
    "https://i.imgur.com/sgDA4Jc.jpg"
  );
  createAndSaveElement(
    "Netflix por 80 Years",
    24864,
    "https://i.imgur.com/zGaCSFJ.jpg"
  );
  createAndSaveElement(
    "Todos jogos da Steam👾(2024 - Sem descontos)",
    4874052,
    "https://i.imgur.com/6GP748G.jpg"
  );
  createAndSaveElement(
    "Viajem ao Espaço 🌌",
    1200000,
    "https://i.imgur.com/wKYd55q.jpeg"
  );

createAndSaveElement(
    "Comprar um Praia ☀️",
    9000000,
    "https://i.imgur.com/IMLe1hN.jpeg"
  );
 
  createAndSaveElement(
    "Show Privado com um Famoso",
    1000000,
    "https://i.imgur.com/XNQXids.jpeg"
  );
  createAndSaveElement(
    "Dar R$ 10.000 para 500 pessoas",
    5000000,
    "https://i.imgur.com/ZFEgpv4.jpeg"
  );
  createAndSaveElement(
  "Fiat Uno com Escada", 18000, 
  "https://i.imgur.com/oUd5NjP.jpeg"
  );
  createAndSaveElement(
  "Motor de Marea Retificado 🔧",5400,  
  "https://i.imgur.com/9W4Mixa.jpeg"
  );
   createAndSaveElement(
    "Porsche 911 - Perigo dos 🏍️",
    1100000,
    "https://i.imgur.com/Eb94s0P.jpeg"
  );
  createAndSaveElement(
    "Ferrari 296 GTB",
    3480000,
    "https://i.imgur.com/rBoTraZ.jpeg"
  );
 createAndSaveElement(
    "Pagani Zonda 760 LH",
    50000000,
    "https://i.imgur.com/iFmR5Sa.jpeg"
  );
 
  createAndSaveElement(
    "Diamante Ring (Tiffany - 1 Quilate)",
    35000,
    "https://i.imgur.com/E8sg2YQ.jpg"
  );

  createAndSaveElement(
    "Rolex Oyster 36mm",
    43000,
    "https://i.imgur.com/MUGVZ8i.jpg"
  );

  createAndSaveElement(
    "Rolex Day Date 40mm Gold",
    85000,
    "https://i.imgur.com/Cynw2Zw.png"
  );

  createAndSaveElement(
    "Abrir Franquia dos Correios 📮",
    300000,
    "https://i.imgur.com/fHs2l0J.jpeg"
  );
    createAndSaveElement(
    "Criar 1.000 subEmpregos",
    1500000,
    "https://i.imgur.com/tZ3Qt5U.jpeg"
  );
  createAndSaveElement(
    "Subornar um Politico 🤝",
    1000000,
  "https://i.imgur.com/CdCdBK0.jpeg"
  );
  createAndSaveElement(
    "Estufa de Cannabis 🍀",
    800000,
    "https://i.imgur.com/oDjgM81.jpeg"
    );
  createAndSaveElement(
    "Pintura Ababoru - (estimado)",
    200000000,
    "https://i.imgur.com/7rZapyw.jpeg"
  );

  createAndSaveElement(
    "Viajar os melhores paises do 🌍",
    1000000,
    "https://i.imgur.com/wvHfsV0.jpeg"
  );
  createAndSaveElement(
    "Romanée-Conti 🍷",
    930000,
    "https://i.imgur.com/Jhvo8q1.jpeg"
  );
  createAndSaveElement(
    "Harley Davison Sportster S ",
    125000,
  "https://i.imgur.com/4t2ljqB.jpeg"
  );
  createAndSaveElement(
    "YAMAHA XJ6 600 ",
    43000,
  "https://i.imgur.com/LBokEfb.jpeg"
  );
    createAndSaveElement(
    "Produzir um Filme 🎬",
    5000000,
    "https://i.imgur.com/k2E9u9F.jpeg"
  );
  createAndSaveElement(
    "Apartamento de Luxo (4 andares)",
    7100000,
    "https://i.imgur.com/NEVvOQs.jpeg"
  );

  createAndSaveElement(
    "Patrocinar seu time do ❤️ (1 Ano)",
    20000000,
  "https://i.imgur.com/nJrJp6R.jpeg"
  );
  createAndSaveElement(
    "Fazenda 🐄 200 alqueires",
    27100000,
  "https://i.imgur.com/lJ8nAmi.jpeg"
  );
 createAndSaveElement(
    "Hilux 4x4",
    330000,
    "https://i.imgur.com/2GGINTV.jpeg"
  );
  createAndSaveElement(
    "Mansão com Academia",
    5500000,
  "https://i.imgur.com/3UEA2TG.jpeg"
  );
  createAndSaveElement(
    "Jantar no Salt Bae🍽️", 
    500000, 
    "https://i.imgur.com/UncMbqH.jpeg"
  );
    createAndSaveElement(
    "Mansão Isolada na Floresta 🏕️",
    9100000,
    "https://i.imgur.com/woKAXsd.jpeg"
  );
  createAndSaveElement(
    "Mega Yatch ⚓ ",
    30500000,
    "https://i.imgur.com/DGX1I5F.jpg"
  );
}
  createAndSaveElement(
    "Mansão na Capital",
    4300000,
    "https://i.imgur.com/Z2si1KA.jpeg"
    );

  createAndSaveElement(
    "Jato da Embraer - Legacy 500",
    20000000,
    "https://i.imgur.com/5Ia4FNB.jpeg"
  );
  createAndSaveElement(
    "Blindado Guarani 6x6",
    3600000,
    "https://i.imgur.com/xPooIax.jpeg"
  );
elements.forEach((element) => {
  let newElement = document.createElement("div");

  newElement.classList.add("element");

  newElement.innerHTML = `<img src="${element.image}" alt="${element.name}" />
  <p id="name">${element.name}</p>
  <span id="price"> ${formatMoney(element.price)}</span>
  <div class="buyAndSellContainer" data-price="${element.price}">
    <button class="btn-sell" id="sell" disabled>Vender</button>
    <span id="amount">${element.amount}</span>
    <button class="btn-buy" id="buy" >Comprar</button>
  </div>`;

  appContainer.appendChild(newElement);
});
