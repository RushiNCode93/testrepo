/*<li class="whatsapp">
  <a class="sharing-link" target="_blank" rel="noopener" href="//api.whatsapp.com/send?text={{ share_title | url_param_escape }}&amp;url={{ shop.url | append: share_permalink }}">
    <span aria-hidden="true">{% render 'svg-whatsapp' %}</span>
    <span class="visually-hidden">{{ 'general.social.share_on_whatsapp' | t }}</span>
  </a>
</li>*/

/*fetch('https://confirmation-ron-missed-amino.trycloudflare.com/api/get-saved-form-data')
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
         getCartItems()
          .then(cartItems => {
            alert(JSON.stringify(cartItems)); // Display the cart items as a JSON string

            //var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(cmwsl);
            var cartItemsString = JSON.stringify(cartItems);
            var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(cmwsl + ' ' + cartItemsString);
            window.open(whatsappUrl, '_blank');
          })
          .catch(error => {
            console.error('Error fetching cart data:', error);
          });

      });

      checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
    }

  })
  .catch(error => {
    console.error('Error fetching form data:', error);
  });*/

/*
  //working code 01-06-2023

  fetch('https://confirmation-ron-missed-amino.trycloudflare.com/api/get-cart-url')
  .then(response => response.json())
  .then(formData => {
    const myurl  = formData || [];
    console.log(myurl);
  })
  .catch(error => {
    console.error('Error fetching form data:', error);
  });
*/

/*function getCartItems() {  
  return fetch('https://confirmation-ron-missed-amino.trycloudflare.com/api/get-cart-url')
    .then(response => response.json())
    .then(cartData => {
      console.log('Cart data:', cartData); // Check the cart data received

      const cartItems = cartData || []; // Extract the cart items from the cart data or default to an empty array
      console.log('Cart items:', cartItems); // Check the extracted cart items

      return cartItems;
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
      return []; // Return an empty array in case of an error
    });
}
*/

fetch('https://confirmation-ron-missed-amino.trycloudflare.com/api/get-cart-url')
  .then(response => response.json())
  .then(cartData => {
    // Fetch the form data
    return fetch('https://confirmation-ron-missed-amino.trycloudflare.com/api/get-saved-form-data')
      .then(response => response.json())
      .then(formData => {
        // Access the form values from the response
        const selected = formData[0].wp_cart_enable_disable;
        const blt = formData[0].wp_button_label_text;
        const cmwsl = formData[0].wp_cart_mesage_on_link;
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
              customButton.style.position = 'absolute';
              customButton.style.top = '0';
              customButton.style.left = '2%';
              break;
            case 'topcenter':
              customButton.style.position = 'absolute';
              customButton.style.top = '0';
              customButton.style.left = '50%';
              customButton.style.transform = 'translateX(-50%)';
              break;
            case 'topright':
              customButton.style.position = 'absolute';
              customButton.style.top = '0';
              customButton.style.right = '2%';
              break;
            case 'middleleft':
              customButton.style.position = 'absolute';
              customButton.style.top = '57%';
              customButton.style.left = '2%';
              customButton.style.transform = 'translateY(-50%)';
              break;
            case 'middleright':
              customButton.style.position = 'absolute';
              customButton.style.top = '57%';
              customButton.style.right = '2%';
              customButton.style.transform = 'translateY(-50%)';
              break;
            case 'bottomleft':
              customButton.style.position = 'absolute';
              customButton.style.bottom = '0';
              customButton.style.left = '2%';
              break;
            case 'bottomcenter':
              customButton.style.position = 'absolute';
              customButton.style.bottom = '0';
              customButton.style.left = '50%';
              customButton.style.transform = 'translateX(-50%)';
              break;
            case 'bottomright':
              customButton.style.position = 'absolute';
              customButton.style.bottom = '0';
              customButton.style.right = '2%';
              break;
            default:
              // Set the default button position if the selected1 value is not recognized
              customButton.style.top = '0';
              customButton.style.right = '0';
              break;
          }

          customButton.addEventListener('click', function() {
            // Access the cart data from the previous fetch call
            console.log('Cart Data 1:', cartData);
            var cartItems = cartData || [];
            //alert(cartItems);
            console.log('Cart Items:', cartItems);

            /*var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(cmwsl + ' ' + JSON.stringify(cartItems));
            window.open(whatsappUrl, '_blank');*/
            
            var cartUrl = cartData.cartUrl;
            //var message = cmwsl + '[Cart URL](' + cartUrl + ')';
            //var message = cmwsl + '%0A' + '[Cart URL](' + cartUrl + ')';
            //var message = cmwsl + '%0A' + cartUrl;
            //var message = cmwsl + '<a href="' + cartUrl + '">Cart URL</a>';
            //var message = cmwsl + '[Cart URL](' + cartUrl + ')';
            //var message = cmwsl + ' \n' + 'Cart URL: ' + cartUrl;
            
            /*
            //var message = cmwsl + ' (Cart URL: ' + cartUrl + ')';
            var message = cmwsl + ' \nCart URL: ' + cartUrl;
            var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
            window.open(whatsappUrl, '_blank');*/

            var message = cmwsl + ' \nCart URL: ' + cartUrl;
            var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
            window.open(whatsappUrl, '_blank');

          });

          checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
        }
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
