const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Change the chosen product
    choosenProduct = products[index];

    // Update the current product details
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    // Assign new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

// Change the product image when a color is selected
currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

// Highlight the selected size and store it
currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.classList.remove("active");
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.classList.add("active");
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

// Cart functionality
let cart = [];

const cartItemsContainer = document.querySelector(".cartItems");
const cartTotalPrice = document.querySelector(".cartTotalPrice");
const cartElement = document.querySelector(".cart");
const productButton = document.querySelector(".productButton");

productButton.addEventListener("click", () => {
  const selectedSizeElement = document.querySelector(".size.active");
  const selectedSize = selectedSizeElement ? selectedSizeElement.textContent : "Not selected";

  // Add the chosen product to the cart
  cart.push({
    title: choosenProduct.title,
    price: choosenProduct.price,
    img: choosenProduct.colors[0].img,
    size: selectedSize,
  });

  updateCart();
  cartElement.style.display = "flex"; // Show the cart
});

function updateCart() {
  // Clear the current cart items
  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cartItem");

    cartItemElement.innerHTML = `
      <div>
        <img src="${item.img}" alt="${item.title}" style="width: 50px; height: 50px;">
      </div>
      <div>
        <p>${item.title}</p>
        <p>Size: ${item.size}</p>
        <p>$${item.price}</p>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItemElement);
    totalPrice += item.price;
  });

  cartTotalPrice.textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item from the cart
  updateCart(); // Update the cart display
}
