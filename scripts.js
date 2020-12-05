const burger = document.querySelector('.burger');
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartTotal = document.querySelector('.cart-total');
const cartItems = document.querySelector('.cart-items');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');



let cart = [];
let buttonsDOM = [];

class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {
                    title,
                    price,
                } = item.fields;
                const {
                    id
                } = item.sys;
                const image = item.fields.image.fields.file.url;
                return {
                    title,
                    price,
                    id,
                    image
                };
            });
            return products; // Распаковка JSON в удобный объект
        } catch (error) {
            console.log(error);
        }
    }
}
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="item1" class="product-img">
                    <button class="product-cart-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        v corziny
                    </button>
                </div>

                <h3> ${product.title} </h3>
                <h4> ${product.price} </h4>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }
    getCartButtons() {
        const buttons = [...document.querySelectorAll('.product-cart-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = 'In Cart';
                button.disabled = true;
            }
            button.addEventListener('click', (e) => {
                e.target.innerText = 'In cart';
                e.target.disabled = true;
                // Опеределить продукт
                let cartItem = {
                    ...Storage.getProduct(id),
                    amount: 1,
                };
                console.log(cartItem);
                // Добавить в корзину
                cart = [...cart, cartItem];
                console.log(cart);
                // Сохранить в локале
                Storage.saveCart(cart);
                // Достать данные продукта
                this.setCartValues(cart);
                // Отобразить продукт
                // Показать корзину
            });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
        console.log(cartTotal, cartItems);
    }
}
class Storage {
    static saveProduct(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    burger.addEventListener('click', () => {
        burger.classList.toggle('change');
    });

    const ui = new UI();
    const products = new Products();

    // Получаем продукты
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProduct(products);
    }).then(() => {
        ui.getCartButtons()
    });


});