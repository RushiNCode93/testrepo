// Wait for the page to load
window.addEventListener('load', function() {
  // Check if the current page is the cart page
  if (window.location.pathname === '/cart') {
    // Create the custom button element
    var customButton = document.createElement('button');
    customButton.innerText = 'Custom Button';

    // Add a click event listener to the custom button
    customButton.addEventListener('click', function() {
      // Replace this with your own code to handle the button click event
      alert('Custom button clicked!');
    });

    // Find the "Proceed to checkout" button on the cart page
    var checkoutButton = document.querySelector('[name="checkout"]');

    // Insert the custom button before the "Proceed to checkout" button
    checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
  }
});
