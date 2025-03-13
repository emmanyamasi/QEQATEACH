interface cartItem {//desribes the structure of cart
    title: string;
    price: number;
    quantity: number;

}
//create an empty cart
const cart: cartItem[] = [];

//add to cart function
export function addToCart(title: string, price: number) {
    try {
        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, quantity: 1 });
        }
        console.log(cart)

    } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Something went wrong while adding the item to the cart. Please try again.");

    }
}

export function updateCartDisplay(){
    const cartList = document.getElementById("cart-items");
    if(!cartList)return;
    cartList.innerHTML = cart.map(item =>`
         <li>
            ${item.title} - $${item.price.toFixed(2)} (x${item.quantity})
        </li>
        `).join("");
}


export function removefromCart(title:string){
    const index = cart.findIndex(item => item.title ===title);
    if(index !== -1){
        cart.splice(index,1);
        updateCartDisplay();
    }

}