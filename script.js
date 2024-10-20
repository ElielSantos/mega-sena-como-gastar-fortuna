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
    389376,
"https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463621860_122118682700514252_4809059884208609768_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=CsHtPIbIa8sQ7kNvgGaGq2y&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AwdNMjLjzA_8PMoKhmrht3c&oh=00_AYBVXMuYq3Qc4WeiDai51t6k3vIIQn9RLCaxuBKqMszP4g&oe=6719027C"
  );
  createAndSaveElement(
    "PlayStation®5",
    3700,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463904527_122118665360514252_3820387190240196681_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=To6l5I7nUZcQ7kNvgGHlI6D&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AiU6QfQ_3W88XXtCKxdBN9W&oh=00_AYCQBf1Gv-ydoCb_Q5axB5TteQzSEWnV4sNFT_3Y9uo4UA&oe=6718F762"
  );
  createAndSaveElement(
    "Cachaça 51",
    50,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463621641_122118665594514252_6902887430978545735_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=uGP44oBdrtoQ7kNvgHGNL4G&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AqmmF3KGB5q9v6sQiWSTst2&oh=00_AYBSNhkSJkdnIiMoZYK1LuRN7xQaY6z3jvYDQJ3EEH4j1g&oe=6718F3C1"
  );
 createAndSaveElement(
    "Iphone 16 Pro Max",
    10210,
"https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/464137302_122118807812514252_8523137884781517011_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=yEosvf5-850Q7kNvgF0Sdwh&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A_5o86hCkCJYm8Fj3jeD859&oh=00_AYCELes74idii3ya4SX-v6dVL-_3XyJNqLY5sFpk0Yp7dg&oe=6719EEA8"
  );
   createAndSaveElement(
    "MacBook Pro 14 - M3 de 8 núcleos, 1Tera",
    26825,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463958060_122118807380514252_977618307788790491_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=k77bNCoBso8Q7kNvgEV46vG&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Az2a67inPCT2W6P04xDtztv&oh=00_AYBKbAZh8k2y6bB0KV6TQskiO6wK5Jhr_M-gvYVW9Bggig&oe=6719C739"
  );
   createAndSaveElement(
    "Montar Setup Gamer",
    20000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463833603_122118828200514252_1279317586826770267_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=cKk_M8tmplEQ7kNvgGCgajg&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AVu8jS03YHGcc2acm4fTvHB&oh=00_AYDmBlkGmGEAwhTHmCv4ULj1kVnWwzHrajBdYaKOXPHvkQ&oe=671A052A"
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
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463733128_122118682598514252_5598382635815822588_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=vLvA37EnGecQ7kNvgGOdKga&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Ay6sJz0KCpqGAk46GGqxyj_&oh=00_AYDg5y1L6-Hor5rE4bf52vYVLJ3mvWNj08ktxR5lyowmMg&oe=671905DC"
  );

createAndSaveElement(
    "Comprar um Praia ☀️",
    9000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463944244_122118676178514252_7927966557956874265_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=a-Fl-ktO7XYQ7kNvgEkyxOF&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A7VWPmdyOoQPuSwHwdIHXGP&oh=00_AYBmfMs_e6ZVcOTNitU4rXWl6LQWNCIdbWH0rF9tjaOkWg&oe=67190520"
  );
 
  createAndSaveElement(
    "Show Privado com um Famoso 🎸",
    1000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463826266_122118672752514252_3050156507424428423_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=MWE27yZXu34Q7kNvgE2Kr38&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AHHZOFHsAiPiCbq_Fx2mZAZ&oh=00_AYDP1X_1KqSzqLBcW9XuFmc1evZJV8gkpDrbIsShuvMBNw&oe=67192729"
  );
  createAndSaveElement(
    "Dar R$ 10.000 para 500 pessoas",
    5000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463236193_122118672968514252_767964530920787919_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=2YtIHVYIoBQQ7kNvgGcwf4W&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=ALckBthfsPCk9Xl8aZrkGvs&oh=00_AYCcUNYP_qibseVtAzcltJdYtETfwQxQ7Zzmnrracd9iSw&oe=6718F75C"
  );
  createAndSaveElement("Fiat Uno com Escada", 18000, "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463898358_122118808502514252_5823714378933455423_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=yLZHyJ5aYC0Q7kNvgFfN1yB&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A58II0xFibnEcm36vJ4gHJn&oh=00_AYApOj39ErXo7LKPjqmIfQDUXYDjABzE--5Zsb1Wl7M1GA&oe=6719E081");
  createAndSaveElement(   "Motor de Marea Retificado 🔧",    5400,    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463826597_122118665294514252_3869235540362274341_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=yDXGJpb2SG0Q7kNvgFZXFtb&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AACBoRec4irou9ERUJFnO_T&oh=00_AYBxRUiY-bxh0xRlrAZVyz1AnUJZ4-6M-Biha3zhXQY3Tw&oe=67191512"  );
  
   createAndSaveElement(
    "Porsche 911 - Perigo dos 🏍️",
    1100000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463904765_122118665402514252_1995591909173315075_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=M4deWHVU6U8Q7kNvgGpYiKd&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A0Nj2VzEiCMlYppcLnr4pqf&oh=00_AYApnvUN5JhqijeEwEK0dkAbt0qfqhj8DJLFU7jQGX42xQ&oe=671912FF"
  );
  createAndSaveElement(
    "Ferrari 296 GTB",
    3480000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463793899_122118816500514252_8115238100552245963_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=IMlKAGjCH_8Q7kNvgFuFR7h&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AOp01DuLxxU14N6Mjrwpwhg&oh=00_AYD4jWjKHBP1-nTqLCOKgafnYyHVMt_Sn13d7TQV3w4O_Q&oe=6719CCFB"
  );
 createAndSaveElement(
    "Pagani Zonda 760 LH",
    50000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/464068198_122118816608514252_2819380113187021038_n.jpg?stp=dst-jpg_s417x417&_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=hypObvkIVoUQ7kNvgFCi7bX&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AaoIVjGado4KkvgnYbqG8iq&oh=00_AYCfa2Wmu75nBEzF2bV9s2GfU3LXAxP7B-9xwT8MddFsGA&oe=6719ED95"
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
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463833202_122118682670514252_5903293769488443702_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=luOI4LQQXy8Q7kNvgHMk7Bu&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AB6yVsH-ok-0AiOLjVeXwyA&oh=00_AYBErMjDjnx742SYK1LGd-ylRAQVMhJ0F2WFXWGRBJ0L7Q&oe=67192687"
  );
    createAndSaveElement(
    "Criar 1.000 subEmpregos",
    1500000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463844258_122118675692514252_2067752953249072098_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=R6XNbPmU2J0Q7kNvgFpNvxd&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Az5UOmA4y1MN1WDu_8twco_&oh=00_AYBYteHYknZE8LulwPPFmOvOuTKwgRFp-i949WV87SGDcQ&oe=67192806"
  );
  createAndSaveElement(
    "Subornar um Politico 🤝",
    1000000,
  "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463893035_122118827066514252_8201468259391682276_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=YPe9YO3mjREQ7kNvgED9vnQ&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A_Q3rk6WD0KgxHIYLUr1OR0&oh=00_AYDga_I6eD7dUbxrjvORnOs-BffNi0rAwynL3UmVJObl_A&oe=6719FCEC"
  );
  createAndSaveElement(
    "Estufa de Cannabis 🍀",
    800000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463921868_122118827798514252_560685745232023150_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=djrokmCA_8IQ7kNvgGeAA2a&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AmA4XUJuffYT_eH4LxbNh84&oh=00_AYCZixEpJ8XiE3GA0_dRyZ5W-eSg2b_6oBLMmTVZeQu7Hg&oe=6719E710"
    );
  createAndSaveElement(
    "Pintura Ababoru - (estimado)",
    200000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463882954_122118816350514252_339872701880363182_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=4AIfBVi5f1oQ7kNvgGE2j0I&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AE4bD_QA3ZA06hIFKJf3KLg&oh=00_AYDtj6fFpY9SkGiJRULtTcdZhE1jQydFEF3bOa2HCkEEmA&oe=6719CBB8"
  );

  createAndSaveElement(
    "Viajar os melhores paises do 🌍",
    1000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/464086774_122118817850514252_792935261014050906_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=UDd55smGcqoQ7kNvgF5l5wZ&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AOS1x1IEY0COEeO44Xsmdbo&oh=00_AYD-0e3cbjwUAGXsQtEelOSyZUbQVrhcSXqivU4_gpQpcw&oe=6719E1AE"
  );
  createAndSaveElement(
    "Romanée-Conti 🍷",
    930000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463880921_122118816356514252_7297052253197073350_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=h_P2s-Iss4EQ7kNvgHCSSLq&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AM2q1bY7rbxiBTAS9DyiCLK&oh=00_AYDQDkuTwmYo-MnmvVXkW7KIFRjq0XJzgmGaukDf03hdUA&oe=6719CDDA"
  );
  createAndSaveElement(
    "Harley Davison Sportster S ",
    125000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/464019772_122118816314514252_8337997378897522878_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=k08aPOsXQbYQ7kNvgFCChsV&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AWPUoajs9-sl6z0b-Bpkvsj&oh=00_AYAR0YmMz3yzNL01INeTepfsIp0l9Iyhq7u7Dm_Ljz8V0g&oe=6719F358"
  );
  createAndSaveElement(
    "YAMAHA XJ6 600 ",
    43000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463876107_122118816464514252_3431527624312347973_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=w1AhURNSLtcQ7kNvgFZ5OGZ&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A46tVUMod_bk-GpVkvjn8en&oh=00_AYDSMEkLeqJLx_kZmgjI8aoc2IXfS0h1OT5h8KzlFpWfyw&oe=6719FFFD"
  );
    createAndSaveElement(
    "Produzir um Filme 🎬",
    5000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463845345_122118817958514252_1499841731636446997_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=nkP4v-LCUvoQ7kNvgFB0fv7&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AlQYtE-JEx2KsCdmgPoPfwD&oh=00_AYBpHhVDuqlKtm9-n-meGEc9FWyWAWduJ88lKLIt5FRpYg&oe=6719E078"
  );
  createAndSaveElement(
    "Apartamento de Luxo (4 andares)",
    7100000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463897577_122118816392514252_3071142136758825924_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=-Rp0TR_n6SUQ7kNvgFPeDpA&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AWPUoajs9-sl6z0b-Bpkvsj&oh=00_AYDx2KnxEjea-YCBwZB5zxDu7knb1L9y4hRW1qkCvue-Gg&oe=671A0036"
  );

  createAndSaveElement(
    "Patrocinar seu time do ❤️ (1 Ano)",
    20000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463548961_122118819878514252_7068100323888603120_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=YwoiU8gHjg0Q7kNvgHbKYDJ&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A4ZLCvyqaqgeGOTWiHeh42r&oh=00_AYB92HSYlpAwi4d7MtCSzlEUKS1veN81qw_oMO8aoPvc6w&oe=6719DAD3"
  );
  createAndSaveElement(
    "Fazenda 🐄 200 alqueires",
    27100000,
"https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463726204_122118682562514252_9114953878277046609_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=vUWLqDiskQwQ7kNvgHO9SKr&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Ay6sJz0KCpqGAk46GGqxyj_&oh=00_AYDCToxlJ9HqEiYEUrzhZRQOpKfI9MhoTrJOkUHLwgsb9g&oe=671931C0"
  );
 createAndSaveElement(
    "Hilux 4x4",
    330000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463955989_122118682538514252_5059849100451810278_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=AOp7V8ujSrAQ7kNvgHV8xiz&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A7rfyMNQv8p-HKD9vTkyGEB&oh=00_AYCR_47VnEeacfYIUuzreDQKTUbCoQLGRRLn-p2FyItDAA&oe=671933F6"
  );
  createAndSaveElement(
    "Mansão com Academia",
    5500000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463915158_122118827192514252_3418889048254417664_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=SVyvawMjxcwQ7kNvgHbqf4f&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Aqc6iOd0Vh5dk8X2yqbV_l2&oh=00_AYCE1phAeOPO4oqZm9I3sNQNvtdmw7UzkKeFm0f2LifazQ&oe=671A019F"
  );
  createAndSaveElement(
    "Jantar no Salt Bae🍽️", 
    500000, 
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/464079384_122118827096514252_2617011167903173271_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=fdzul20M8TAQ7kNvgGQ65jT&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Aap9oEQFhKaAErA133t2ous&oh=00_AYCbcqjTRCHx9yjry1XdgeR1VAwLNMXSTbuqU_7X1o0hlQ&oe=671A06FC"
  );
    createAndSaveElement(
    "Mansão Isolada na Floresta 🏕️",
    9100000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463899819_122118827144514252_7095879110027687423_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=Na4D7hjSYeUQ7kNvgHMr0hu&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=AarIOT9LXrDpAdPl-HWgY_-&oh=00_AYAkFelxLq8_odX0yBW8QBuZ9SQk3YGNi8t81LcHG8CW0A&oe=6719E1EB"
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
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463716595_122118827246514252_2993957733058011446_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=WTxGlrdMAtMQ7kNvgFEnTrU&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Al-Pss2edCllGldwbOVX2H9&oh=00_AYDZUu4E0YgUjzb8f40TEOSWXe6QFhplRVCPp0IFZCn1rg&oe=671A0487"
    );

  createAndSaveElement(
    "Jato da Embraer - Legacy 500",
    20000000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463904618_122118665324514252_5806045605820586986_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=gAxIkOqz34kQ7kNvgGZ3TYt&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=Axgzh49xqOxIzdZjIQYThf1&oh=00_AYBOdW57mKIUk2qxf2E4gT67eqZG8m9lM8M_wgxE5zRtsw&oe=6719F2C6"
  );
  createAndSaveElement(
    "Blindado Guarani 6x6",
    3600000,
    "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/463979944_122118665480514252_1826826561801458662_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=GVlc5IDbGHIQ7kNvgHSTbCv&_nc_zt=23&_nc_ht=scontent.fpgz1-1.fna&_nc_gid=A0Nj2VzEiCMlYppcLnr4pqf&oh=00_AYCuYoS8PUpJJm5XceZtRJNcDPoAHnqiLTmC7q-csHNpug&oe=6719221D"
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