/*<li class="whatsapp">
  <a class="sharing-link" target="_blank" rel="noopener" href="//api.whatsapp.com/send?text={{ share_title | url_param_escape }}&amp;url={{ shop.url | append: share_permalink }}">
    <span aria-hidden="true">{% render 'svg-whatsapp' %}</span>
    <span class="visually-hidden">{{ 'general.social.share_on_whatsapp' | t }}</span>
  </a>
</li>*/

/*fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-saved-form-data')
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

  fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-cart-url')
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
  return fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-cart-url')
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

/*fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-cart-url')
  .then(response => response.json())
  .then(cartData => {
    // Fetch the form data
    return fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-saved-form-data')
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
            
            var cartUrl = cartData.cartUrl;

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
  });*/



// Make a request to the Shopify Storefront API
/*fetch('https://ncodeshop.myshopify.com/cart.js')
  .then(response => response.json())
  .then(data => {
    const cartData = data.cart_url; // Extract the cart URL from the response data
    // Use the cart URL as needed (e.g., share it with a product)
    console.log('Cart data:', cartData);
  })
  .catch(error => {
    console.error('Error fetching cart URL:', error);
  });*/

fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-cart-url')
  .then(response => response.json())
  .then(cartData => {
    // Fetch the form data
    return fetch('https://seafood-periods-ddr-col.trycloudflare.com/api/get-saved-form-data')
      .then(response => response.json())
      .then(formData => {
        // Access the form values from the response
        const selected = formData[0].wp_cart_enable_disable;
        const blt = formData[0].wp_button_label_text;
        const cmwsl = formData[0].wp_cart_mesage_on_link;
        const selected1 = formData[0].wp_button_position;

        // Use the form values as needed
       /* console.log('Selected:', selected);
        console.log('Button Label Text:', blt);
        console.log('Cart Message on Whatsapp Share Link:', cmwsl);
        console.log('Button Position on Cart Page:', selected1);*/

        var checkoutButton = document.querySelector('[name="checkout"]');

        if (selected === 'yes') {
          /*var customButton = document.createElement('button');
          customButton.innerText = blt;
          customButton.style.backgroundColor = '#006E52';*/

          /*// Add CSS styles to the button
          customButton.addEventListener('mouseenter', function() {
            customButton.style.color = 'white'; // Change text color to white
          });*/

         

          /*customButton.addEventListener('click', function() {
            // Access the cart data from the previous fetch call
            console.log('Cart Data 1:', cartData);
            var cartItems = cartData || [];
            //alert(cartItems);
            console.log('Cart Items:', cartItems);

            var cartUrl = cartData.cartUrl;

            var message = cmwsl + ' \nCart URL: ' + cartUrl;
            var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
            window.open(whatsappUrl, '_blank');
          });

          checkoutButton.parentNode.insertBefore(customButton, checkoutButton);*/
        

        // Share the cart URL with the product
        fetch('https://ncodeshop.myshopify.com/cart.js')
          .then(response => response.json())
          .then(data => {

            

            // Create the WhatsApp button
            var customButton = document.createElement('button');
            customButton.innerText =  blt;
            customButton.style.backgroundColor = '#006E52';

            // Add CSS styles to the button
            customButton.addEventListener('mouseenter', function() {
              customButton.style.color = 'white'; // Change text color to white
            });
            //customButton.style.color = '#fff';
            //customButton.style.marginLeft = '10px';

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

            /*const cartUrl = data.items[0].url; // Extract the cart URL from the response data
            const productUrl = cartUrl; // Replace with your product URL        

            const sharedCartData = cartUrl + '?add=' + encodeURIComponent(productUrl);
            console.log('Shared Cart URL:', sharedCartData);*/

            /*const cartToken = data.token; // Extract the cart token from the response data
            const productHandle = data.items[0].handle; // Replace with your product handle
            const variantId = data.items[0].variant_id; // Replace with your variant ID
            const encodedProductHandle = encodeURIComponent(productHandle);
            const encodedVariantId = encodeURIComponent(variantId);
            const sharedCartData = `https://ncodeshop.myshopify.com/cart/${cartToken}:${encodedProductHandle},${encodedVariantId}`;
            console.log('Shared Cart URL:', sharedCartData);*/

            /*const cartUrl = data.items[0].url; 
            const cartToken = data.token; // Extract the cart token from the response data
            const productUrl = cartUrl; // Replace with the desired product URL
            const sharedCartData = data.items.map(item => {
              const variantId = item.variant_id;
              return `https://ncodeshop.myshopify.com/cart/${cartToken}:${variantId}`;
            });
            console.log('Shared Cart URLs:', sharedCartData);*/

            


            customButton.addEventListener('click', function() {

              /*const cartToken = data.token;
              const productHandle = data.items[0].handle; // Replace with your actual product handle
              const variantId = data.items[0].variant_id; // Replace with your actual variant ID

              // Step 2: Construct the shared cart URL
              const encodedProductHandle = encodeURIComponent(productHandle);
              const encodedVariantId     = encodeURIComponent(variantId);
              const sharedCartUrl        = `https://ncodeshop.myshopify.com/cart/${encodedVariantId}:1?storefront=true`;
              
              // Step 3: Share the URL with the user (e.g., display as a link or button)
              console.log('Shared Cart URL:', sharedCartUrl);


              // Access the cart data from the previous fetch call
              console.log('Cart Data 1:', cartData);              
              
              var cartItems = cartData || [];
              console.log('Cart Items:', cartItems);

              var cartUrl = cartData.cartUrl;

              var message = cmwsl + ' \nCart URL: ' + sharedCartUrl;              
              var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);              
              window.open(whatsappUrl, '_blank');*/

              const cartToken = data.token;
              const items = data.items; // Array of cart items

              // Step 2: Construct the shared cart URL
              let sharedCartUrl = `https://ncodeshop.myshopify.com/cart/`;

              // Iterate over the cart items and append variant IDs with quantities to the URL
              for (let i = 0; i < items.length; i++) {
                const variantId = items[i].variant_id;
                const quantity = items[i].quantity;
                const encodedVariantId = encodeURIComponent(variantId);

                // Append the variant ID and quantity to the URL
                sharedCartUrl += `${encodedVariantId}:${quantity},`;
              }

              // Remove the trailing comma from the URL
              sharedCartUrl = sharedCartUrl.slice(0, -1);

              // Append the remaining part of the URL
              sharedCartUrl += `?storefront=true`;

              // Step 3: Share the URL with the user (e.g., display as a link or button)
              console.log('Shared Cart URL:', sharedCartUrl);

              // Access the cart data from the previous fetch call
              console.log('Cart Data:', cartData);

              var cartItems = cartData || [];
              console.log('Cart Items:', cartItems);

              var cartUrl = cartData.cartUrl;

              var message = cmwsl + ' \nCart URL: ' + sharedCartUrl;
              var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
              window.open(whatsappUrl, '_blank');
            });

            // Append the WhatsApp button to the parent container of the checkout button
            //checkoutButton.parentNode.appendChild(whatsappButton);
            checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
          })
          .catch(error => {
            console.error('Error fetching cart URL:', error);
          });
        }
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
