class Product {
  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootEl = document.createElement(tag);

    if (cssClasses) {
      rootEl.classList.add(...cssClasses);
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootEl.setAttribute(attr.name, attr.value);
      }
    }

    document.getElementById(this.hookId).append(rootEl);

    return rootEl;
  }
}

class ShoppingCart extends Component {
    items = [];

    constructor(renderHookId) {
      super(renderHookId, false);
      this.orderProducts = () => {
        console.log('Ordering...');
        console.log(this.items);
      }
      this.render();
    }

    set cartItems(value) {
      this.items = value;
      this.totalOutput.innerHTML = `Total: \$${this.totalAmount.toFixed(2)}`;
    }

    get totalAmount() {
      const sum = this.items.reduce(
        (prevValue, curItem) => prevValue + curItem.price,
        0
      );

      return sum;
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement('section', ['cart']);
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', this.orderProducts);
        this.totalOutput = cartEl.querySelector('h2');
    }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', ['product-item']);
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.#fetchProducts();
  }

  #fetchProducts() {
    this.#products = [
      new Product(
        "A Pillow",
        "https://skinnylaminx.com/wp-content/uploads/2019/09/Pillows-Covers-cat..jpg",
        19.99,
        "A soft pillow!"
      ),
      new Product(
        "A Carpet",
        "https://cache.hedgeapple.com/thumb/2021/06/ch/dqufiqsnxtxog6ukumoptbfocrid24/SGML938F-from-Melrose-Shag-900-by-Safavieh.jpg",
        89.99,
        "A carpet which you might like or not."
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, 'product-list');
    }
  }

  render() {
    this.createRootElement(
      'ul',
      ['product-list'],
      [new ElementAttribute('id', 'product-list')]);
    
    if(this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop extends Component {
    constructor() {
      super();
    }

    render() {
        this.cart = new ShoppingCart('app');
        new ProductList('app');
    }
}

class App {
  static cart;
  
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();


