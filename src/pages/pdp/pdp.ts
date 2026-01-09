import type { Product } from "../../models/Product";
import { addItemToCart, findCart, removeOneItemFromCart } from "../../utils/cartUtils";
import { getLastClickedProduct } from "../../utils/pageUtil"

console.log("PDP FILE LOADED");

//render product function with html *done*

export const renderProduct = (product: Product) => {
    const titleEl = document.getElementById("pdp-title");
    if(!titleEl) return;
    titleEl.textContent = product.name;

    const priceEl = document.getElementById("pdpPrice");
    if(!priceEl) return;
    priceEl.textContent = `${product.price} sek`;

    const descEl = document.getElementById("pdp-desc");
    if(!descEl) return;
    descEl.textContent = product.description;

    const imgEl = document.getElementById("pdp-main-img") as HTMLImageElement | null
    if(imgEl) {
        imgEl.src = product.image
        imgEl.alt = `image of ${product.name} as a retro action figure`
    }

}

// initPdp funktion (const product - getLastCllicked, !product(redirect?), renderProduct  ) - *done* 

export const initPdp = () => {
    console.log("PDP TS LOADING");

    // hämta produkt från localStorage
    const product = getLastClickedProduct();
    console.log("product from LS:", product);
    if(!product){
    console.log("STOP: no product in localStorage");
return;
    };
    
    renderProduct(product);
    initTabs(product);
    console.log("calling initQty");
    initQty(product)

}


//initThumbs 

//tabsInit(details, story, shipping) *done*

export const initTabs = (product: Product) => {
    console.log("initTabs körs");
    const tabs = document.querySelectorAll<HTMLButtonElement>(".tab")
    const panel = document.getElementById("pdpPanel")
    if(!panel) return

    //default
    panel.textContent = `Kategorier: ${product.categories.join(", ")}`

    //click on tabs 
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("is-active"))

            tab.classList.add("is-active")

            const tabName = tab.dataset.tab;
            if(tabName === "details") {
                panel.textContent = `Kategorier: ${product.categories.join(", ")}`;
            }
            if (tabName === "story") {
                panel.textContent = product.description;
              }
        
            if (tabName === "shipping") {
                panel.textContent = "Leveranstid 2-5 arbetsdagar.";
              }

        })
    })
    
}


//initQty 

const initQty = (product: Product) => {
    
     
    const getQtyInCart = (productId: number) => {

        const cartString = localStorage.getItem("cart")
        if(!cartString) return 0
        const cartArray = JSON.parse(cartString) as Product[];
    return cartArray.filter((p) => p.id === productId).length
    }
    
    findCart();
    
    const qtyEl = document.getElementById("qty-value") as HTMLSpanElement | null;
    const minusBtn = document.getElementById("qty-minus") as HTMLButtonElement | null;
    const plusBtn = document.getElementById("qty-plus") as HTMLButtonElement | null;
    const addBtn = document.getElementById("add-to-cart") as HTMLButtonElement | null;

    
    const createQty = () => {
        if(!qtyEl) return;
        qtyEl.textContent = String(getQtyInCart(product.id))
    };
    
    createQty();

    

    if(plusBtn){
        plusBtn.addEventListener("click", async() => {
            
            await addItemToCart(String(product.id))
            createQty();
            console.log("Product added")
            
        });
    };
   
    if(minusBtn) {
        minusBtn.addEventListener("click", () => {
            
            removeOneItemFromCart(String(product.id))
            createQty();
            console.log("Product removed")
            
        });
    }
   
        if(addBtn) {
            addBtn.addEventListener("click", async() => {
                await addItemToCart(String(product.id));
                createQty();
                console.log("Product added")
            })
        }
        console.log("qty elements:", { qtyEl, minusBtn, plusBtn, addBtn });

}



//initAddToCart(product)


