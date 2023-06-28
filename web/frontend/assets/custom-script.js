const button = document.createElement("button");
button.innerHTML = "Share on WhatsApp";
button.onclick = function() {
  // Code to share cart on WhatsApp goes here
};

const cartNode = document.querySelector(".cart");
cartNode.appendChild(button);
