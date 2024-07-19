import Swal from "sweetalert2";
import { products } from "./products";
import { netTotal, receiveGroup, receiveGroupTemplate, tax, total } from "./selectors";

export const createReceiveForm = (id,name,price) => {
    // console.log(id);
    const receiveGp = receiveGroupTemplate.content.cloneNode(true);
    const fruitName = receiveGp.querySelector(".fruit-name");
    const fruitPrice = receiveGp.querySelector(".fruit-price");
    const receiveCard = receiveGp.querySelector(".receive-card");

    receiveCard.id = id;
    receiveCard.setAttribute("row-id",id);
    fruitName.id = id;
   
    fruitName.innerText = name;
    fruitPrice.innerText = price;

    return receiveGp;
}

export const removeReceiveCard = (cardIdNo) => {
    const currentReceiveCard = document.querySelector(`[row-id='${cardIdNo}']`)
    console.log(currentReceiveCard.id);
    Swal.fire({
        title: "Are you sure to remove?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!"
      }).then((result) => {
        if (result.isConfirmed) {
          if(Number(cardIdNo) == currentReceiveCard.id){
           currentReceiveCard.remove();
          }
        }
      });
} 

export const updateQuantity = (rowId,newQuantity) => {
    const currentReceiveCard = document.querySelector(`[row-id="${rowId}"]`);
    // console.log(currentReceiveCard);
    const fruitQuantity = currentReceiveCard.querySelector(".fruit-quantity");
    if(newQuantity > 0 || fruitQuantity.innerText > 1 ){
        fruitQuantity.innerText = parseInt(fruitQuantity.innerText) + newQuantity;
    }    
}

export const updatePrice = (rowId) => {
    const currentReceiveCard = document.querySelector(`[row-id="${rowId}"]`);
    const fruitQuantity = currentReceiveCard.querySelector(".fruit-quantity");
    const fruitPrice = currentReceiveCard.querySelector(".fruit-price");
        
    products.find(({id,price}) => {
        if(id == currentReceiveCard.id){
            fruitPrice.innerText = price * parseInt(fruitQuantity.innerText);
        }          
    })
}

export const updateTotal = () => {
    let t = 0;
    document.querySelectorAll(".fruit-price").forEach(
        (el) => {
          t += parseFloat(el.innerText);
    })
    return t;
}

export const calculateTax = (amount,percentage = 5) => (amount * percentage)/100;

export const receiveGroupHandler = (event) => {
    const currentReceiveCard = event.target.closest(".receive-card");
    if(event.target.classList.contains("increase-quantity")){
        updateQuantity(currentReceiveCard.getAttribute("row-id"),1);
        updatePrice(currentReceiveCard.getAttribute("row-id"));    
    }else if (event.target.classList.contains("decrease-quantity")){
        updateQuantity(currentReceiveCard.getAttribute("row-id"),-1);
        updatePrice(currentReceiveCard.getAttribute("row-id"));     
    }    
}

export const receiveGroupObserver = () => {
    const observerOptions = {
        childList: true,
        subtree: true,
      };

      const updateFruitTotal = () => {
        const fruitTotal=updateTotal();
        const fruitTax = calculateTax(fruitTotal);
        total.innerText = fruitTotal;
        tax.innerText = fruitTax;
        netTotal.innerText = fruitTotal + fruitTax;
      }      
      const observer = new MutationObserver(updateFruitTotal);
      observer.observe(receiveGroup, observerOptions);
}