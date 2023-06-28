//const tunnelUrl = process.env.TUNNEL_URL;
//const apiUrl = `${tunnelUrl}/api/get-saved-form-data`;

//const tunnelUrl = 'https://ncodeshop.myshopify.com'; // Replace with the appropriate URL
//fetch(`${tunnelUrl}/api/get-saved-form-data`)

//fetch('https://wars-bible-once-votes.trycloudflare.com/api/get-saved-form-data')

/*<li class="whatsapp">
  <a class="sharing-link" target="_blank" rel="noopener" href="//api.whatsapp.com/send?text={{ share_title | url_param_escape }}&amp;url={{ shop.url | append: share_permalink }}">
    <span aria-hidden="true">{% render 'svg-whatsapp' %}</span>
    <span class="visually-hidden">{{ 'general.social.share_on_whatsapp' | t }}</span>
  </a>
</li>*/

fetch('https://championships-batteries-acquire-bedroom.trycloudflare.com/api/get-saved-form-data')
  .then(response => response.json())
  .then(formData => {
    //console.log('Hello Worlds......');
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
      customButton.style.backgroundColor = '#006E52'; 
      
      // Add CSS styles to the button      
      customButton.addEventListener('mouseenter', function() {
        customButton.style.color = 'white'; // Change text color to white
      });

      // Add CSS styles to the button
      customButton.style.position = '';
      customButton.style.zIndex = '';
      // Set the button position based on the selected1 value
      switch (selected1) {
        case 'bydefault':
          // Set the default button position
          customButton.style.top = '0';
          customButton.style.right = '0';
          break;
        case 'topleft':
          customButton.style.top = '0';
          customButton.style.left = '0';
          break;
        case 'topcenter':
          customButton.style.top = '0';
          customButton.style.left = '50%';
          customButton.style.transform = 'translateX(-50%)';
          break;
        case 'topright':
          customButton.style.top = '0';
          customButton.style.right = '0';
          break;
        case 'middleleft':
          customButton.style.top = '50%';
          customButton.style.left = '0';
          customButton.style.transform = 'translateY(-50%)';
          break;
        case 'middleright':
          customButton.style.top = '50%';
          customButton.style.right = '0';
          customButton.style.transform = 'translateY(-50%)';
          break;
        case 'bottomleft':
          customButton.style.bottom = '0';
          customButton.style.left = '0';
          break;
        case 'bottomcenter':
          customButton.style.bottom = '0';
          customButton.style.left = '50%';
          customButton.style.transform = 'translateX(-50%)';
          break;
        case 'bottomright':
          customButton.style.bottom = '0';
          customButton.style.right = '0';
          break;
        default:
          // Set the default button position if the selected1 value is not recognized
          customButton.style.top = '0';
          customButton.style.right = '0';
          break;
      }

      customButton.addEventListener('click', function() {
        
        //alert('Custom button clicked!');
        // Call WhatsApp API

        var cartItems = getCartItems(); // Assuming you have a function to get the cart items
        
        var message = 'Check out my cart:\n';
        cartItems.forEach(function(item) {
          message += item.title + ' - ' + item.price + '\n';
          alert(message); 
        });

        var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(cmwsl);
        window.open(whatsappUrl, '_blank');
      });

      checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
    }

  })
  .catch(error => {
    console.error('Error fetching form data:', error);
  });

  function getCartItems() {
  // Implement a function to retrieve the cart items
  // You can use Shopify's AJAX API or any other method to fetch the cart items
  // Return an array of objects representing the cart items
  // Example:

  fetch('https://championships-batteries-acquire-bedroom.trycloudflare.com/api/get-cart-details')
  .then(response => response.json())
  .then(formData => {
      console.log('Cart data:', formData); // Log the cart data

  })
  .catch(error => {
    console.error('Error fetching cart data:', error);
  });
  /*return [
    { title: 'Product 1', price: '$10.00' }
  ];*/
}

/*

fetch('https://bat-luther-nice-mississippi.trycloudflare.com/api/get-saved-form-data')
  .then(response => response.json())
  .then(formData => {
    const selected  = formData[0].wp_cart_enable_disable;
    const blt       = formData[0].wp_button_label_text;
    const cmwsl     = formData[0].wp_cart_mesage_on_link;
    const selected1 = formData[0].wp_button_position;

    console.log('Selected:', selected);
    console.log('Button Label Text:', blt);
    console.log('Cart Message on Whatsapp Share Link:', cmwsl);
    console.log('Button Position on Cart Page:', selected1);
    
    var checkoutButton = document.querySelector('[name="checkout"]');

    if (selected === 'yes') {
      var customButton = document.createElement('button');
      customButton.innerText = blt;

      customButton.addEventListener('click', function() {
        // Share cart via WhatsApp
        var cartItems = getCartItems(); // Assuming you have a function to get the cart items
        
        var message = 'Check out my cart:\n';
        cartItems.forEach(function(item) {
          message += item.title + ' - ' + item.price + '\n';
        });
        
        var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');
      });

      checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
    }

  })
  .catch(error => {
    console.error('Error fetching form data:', error);
  });

function getCartItems() {
  // Implement a function to retrieve the cart items
  // You can use Shopify's AJAX API or any other method to fetch the cart items
  // Return an array of objects representing the cart items
  // Example:
  return [
    { title: 'Product 1', price: '$10.00' },
    { title: 'Product 2', price: '$20.00' },
    { title: 'Product 3', price: '$30.00' }
  ];
}

*/