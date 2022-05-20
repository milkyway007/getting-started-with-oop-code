class Product {
  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class AttributeElement {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

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
      super(renderHookId);
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
        const updatedItems =[...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement('section', ['cart']);
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
    }
}

class ProductItem extends Component {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
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

    return prodEl;
  }
}

class ProductList extends Component {
  products = [
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

  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }

    return prodList;
  }
}

class Shop extends Component {
    render() {
        const renderHook = document.getElementById("app");

        this.cart = new ShoppingCart('app');

        const productList = new ProductList();
        const prodListEl = productList.render();

        renderHook.append(prodListEl);
    }
}

class App {
  static cart;
  
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();


