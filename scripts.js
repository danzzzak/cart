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

}
class Storage {

}

document.addEventListener('DOMContentLoaded', () => {
    burger.addEventListener('click', () => {
        burger.classList.toggle('change');
    });

    const ui = new UI();
    const products = new Products();

    // Получаем продукты
    products.getProducts().then(data => console.log(data));

});