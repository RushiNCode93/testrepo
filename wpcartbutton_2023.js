//const tunnelUrl = process.env.TUNNEL_URL;
//const apiUrl = `${tunnelUrl}/api/get-saved-form-data`;

//const tunnelUrl = 'https://ncodeshop.myshopify.com'; // Replace with the appropriate URL
//fetch(`${tunnelUrl}/api/get-saved-form-data`)

//fetch('https://wars-bible-once-votes.trycloudflare.com/api/get-saved-form-data')

fetch('https://super-slope-mere-lisa.trycloudflare.com/api/get-saved-form-data')
  .then(response => response.json())
  .then(formData => {
    console.log('Hello Worlds......')
    // Access the form values from the response
    const selected  = formData[0].wp_cart_enable_disable;
    const blt       = formData[0].wp_button_label_text;
    const cmwsl     = formData[0].wp_cart_mesage_on_link;
    const selected1 = formData[0].wp_button_position;

    // Use the form values as needed
    console.log('Selected:', selected);
    console.log('Button Label Text:', blt);
    console.log('Cart Message on Whatsapp Share Link:', cmwsl);
    console.log('Button Position on Cart Page:', selected1);
    
    var checkoutButton = document.querySelector('[name="checkout"]');

    if (selected === 'yes') {
      var customButton = document.createElement('button');
      customButton.innerText = blt;

      customButton.addEventListener('click', function() {
        //call WhatsApp API here...
        alert('Custom button clicked!');
      });

      checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
    }

  })
  .catch(error => {
    console.error('Error fetching form data:', error);
  });

// Find the "Proceed to checkout" button on the cart page
/*var checkoutButton = document.querySelector('[name="checkout"]');

if (whatsappEnable === 'yes') {
  var customButton = document.createElement('button');
  customButton.innerText = 'Share me On WhatsApp';

  customButton.addEventListener('click', function() {
    alert('Custom button clicked!');
  });

  checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
}*/

/*var customButton = document.createElement('button');
customButton.innerText = 'Share me On WhatsApp';
customButton.setAttribute('data-whatsapp-enable', '{{ $whatsappShareCartEnable }}');

// Add a click event listener to the custom button
customButton.addEventListener('click', function() {
  var whatsappEnable = this.getAttribute('data-whatsapp-enable');
  // Use the `whatsappEnable` value as needed
  if (whatsappEnable === 'yes') {
    alert('WhatsApp share is enabled!');
  } else {
    alert('WhatsApp share is disabled!');
  }
});

// Find the "Proceed to checkout" button on the cart page
var checkoutButton = document.querySelector('[name="checkout"]');

// Insert the custom button before the "Proceed to checkout" button
checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
*/