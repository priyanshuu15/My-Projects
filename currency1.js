const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangerate();
 })

for(let select of dropdowns){
    for(currcode in countryList){
 let newOption = document.createElement("option");
 newOption.innerText = currcode;
 newOption.value = currcode;
 if(select.name == "from" && currcode == "USD"){
    newOption.selected = "selected"
 }
 else if(select.name == "to" && currcode == "INR"){
    newOption.selected = "selected"
 }
 select.append(newOption);
 
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)  //evt.target ka mtlb haii ki jb bhi change krein to humne khaa chnge kiya wo updateFlag ko pass kr dena
    })
}

const updateFlag = (element) => { 
    let currcode = element.value;
    let countryCode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

 }
 
 btn.addEventListener("click", (evt) => { 
    evt.preventDefault(); //iska mtlb h ki button click krne p jo bhi automatic chizein hoti thi wo naa ho, sb hum krwaayenge
  updateExchangerate();
 })

 const updateExchangerate = async () =>{
    let amount = document.querySelector(".amount input")
    let amtValue = amount.value;
    if(amtValue == "" || amtValue<1){
        amtValue = 1;
        amount.value = "1"
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL)
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalamount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalamount} ${toCurr.value} `
 }