const producrList = {
    products: [
        {
            title: 'A Pillow',
            imageUrl: 'https://skinnylaminx.com/wp-content/uploads/2019/09/Pillows-Covers-cat..jpg',
            price: 19.99,
            description: 'A soft pillow!',
        },
        {
            title: 'A Carpet',
            imageUrl: 'https://cache.hedgeapple.com/thumb/2021/06/ch/dqufiqsnxtxog6ukumoptbfocrid24/SGML938F-from-Melrose-Shag-900-by-Safavieh.jpg',
            price: 89.99,
            description: 'A carpet which you might like or not.',
        },
    ],

    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    }
}

producrList.render();