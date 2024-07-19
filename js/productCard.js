import Swal from "sweetalert2";
import { products } from "./products";
import { calculateTax, createReceiveForm, removeReceiveCard, updateQuantity, updateTotal } from "./receiveForm";
import { netTotal, productCardGroup, productCardGroupTemplate,productCardSlideGroup,productCardSlideTemplate,receiveGroup, tax, total } from "./selectors"

export const productRender = () => {
    products.forEach(({id,image,name,price}) => {
        productCardGroup.append(createProductCard(id,image,name,price));
        productCardSlideGroup.append(createProductCardSlide(id,image,name,price))
    })
}

export const createProductCardSlide = (id,image,name,price) => {
    const slide = productCardSlideTemplate.content.cloneNode(true);
    const productImage = slide.querySelector(".product-image");
    const productName = slide.querySelector(".product-name");
    const productPrice = slide.querySelector(".product-price");
    const productCard = slide.querySelector(".productCardSlide");
    const card = slide.querySelector(".card");

    // productCard.id = id;
    card.id = id;
    productImage.src = image;
    productName.innerText = name;
    productPrice.innerText = price;
    
    return slide;
}

export const createProductCard = (id,image,name,price) => {
    const card = productCardGroupTemplate.content.cloneNode(true);
    const productImage = card.querySelector(".product-image");
    const productName = card.querySelector(".product-name");
    const productPrice = card.querySelector(".product-price");
    const productCard = card.querySelector(".card");

    productCard.id = id;
    productImage.src = image;
    productName.innerText = name;
    productPrice.innerText = price;
    
    return card;
}

export const productCardGroupHandler =(event) => {
    const cardId = event.target.closest(".card").id;
    const cardName = event.target.closest(".card").querySelector(".product-name").innerText;
    const cardPrice = event.target.closest(".card").querySelector(".product-price").innerText;
    if(event.target.classList.contains("add-btn")){
        const isExisted = document.querySelector(`[row-id='${cardId}']`)
        // console.log(isExisted);
        if(isExisted == null){
            receiveGroup.append(createReceiveForm(cardId,cardName,cardPrice));
        }else{
            Swal.fire({
                title: "It already existed",
                text: "If you want to add quantity , you can click add button.",
            }) 
        }
    }
    else if(event.target.classList.contains("remove-btn")){
        removeReceiveCard(cardId);
    }  
}

export const productCardSlideGroupHandler =(event) => {
    const cardId = event.target.closest(".card").id;
    const cardName = event.target.closest(".card").querySelector(".product-name").innerText;
    const cardPrice = event.target.closest(".card").querySelector(".product-price").innerText;
    if(event.target.classList.contains("add-btn")){
        const isExisted = document.querySelector(`[row-id='${cardId}']`)
        // console.log(isExisted);
        if(isExisted == null){
            receiveGroup.append(createReceiveForm(cardId,cardName,cardPrice));
        }else{
            Swal.fire({
                title: "It already existed",
                text: "If you want to add quantity , you can click add button.",
            }) 
        }
    }
    else if(event.target.classList.contains("remove-btn")){
        removeReceiveCard(cardId);
    }  
}

export const productCardObserver = () => {
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
      observer.observe(productCardGroup, observerOptions);
}