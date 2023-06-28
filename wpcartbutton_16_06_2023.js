fetch('https://mud-ruled-suse-julia.trycloudflare.com/api/get-cart-url')
  .then(response => response.json())
  .then(cartData => {
    // Fetch the form data
    return fetch('https://mud-ruled-suse-julia.trycloudflare.com/api/get-saved-form-data')
      .then(response => response.json())
      .then(formData => {
        // Access the form values from the response
        const selected  = formData[0].wp_cart_enable_disable;
        const blt       = formData[0].wp_button_label_text;
        const cmwsl     = formData[0].wp_cart_mesage_on_link;
        const selected1 = formData[0].wp_button_position;        
        const bgat      = formData[0].bitly_access_token;        

        var checkoutButton = document.querySelector('[name="checkout"]');

        if (selected === 'yes') {          
        // Share the cart URL with the product          
        fetch('https://ncodeshop.myshopify.com/cart.js')
          .then(response => response.json())
          .then(data => {          
            // Create the WhatsApp button
            var customButton = document.createElement('button');
            customButton.innerText =  blt;
            customButton.style.backgroundColor = '#006E52';
            customButton.classList.add('whatsapp-button');

            // Add CSS styles to the button
            customButton.addEventListener('mouseenter', function() {
              customButton.style.color = 'white'; // Change text color to white
            });
            
             // Add CSS styles to the button
            customButton.style.position = '';
            customButton.style.zIndex   = '';
            // Set the button position based on the selected1 value
            switch (selected1) {
              case 'bydefault':
                // Set the default button position
                customButton.style.top   = '0';
                customButton.style.right = '0';
                break;
              case 'topleft':
                customButton.style.position = 'absolute';
                customButton.style.top      = '0';
                customButton.style.left     = '2%';
                break;
              case 'topcenter':
                customButton.style.position  = 'absolute';
                customButton.style.top       = '0';
                customButton.style.left      = '50%';
                customButton.style.transform = 'translateX(-50%)';
                break;
              case 'topright':
                customButton.style.position = 'absolute';
                customButton.style.top      = '0';
                customButton.style.right    = '2%';
                break;
              case 'middleleft':
                customButton.style.position  = 'absolute';
                customButton.style.top       = '57%';
                customButton.style.left      = '2%';
                customButton.style.transform = 'translateY(-50%)';
                break;
              case 'middleright':
                customButton.style.position  = 'absolute';
                customButton.style.top       = '57%';
                customButton.style.right     = '2%';
                customButton.style.transform = 'translateY(-50%)';
                break;
              case 'bottomleft':
                customButton.style.position = 'absolute';
                customButton.style.bottom   = '0';
                customButton.style.left     = '2%';
                break;
              case 'bottomcenter':
                customButton.style.position  = 'absolute';
                customButton.style.bottom    = '0';
                customButton.style.left      = '50%';
                customButton.style.transform = 'translateX(-50%)';
                break;
              case 'bottomright':
                customButton.style.position = 'absolute';
                customButton.style.bottom   = '0';
                customButton.style.right    = '2%';
                break;
              default:
                // Set the default button position if the selected1 value is not recognized
                customButton.style.top   = '0';
                customButton.style.right = '0';
                break;
            }
            
            customButton.addEventListener('click', function() {
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

              //Original Code Whatsapp Share URL ⬇️
              //var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
              
              // Include the "redirect=false" query parameter to prevent automatic redirect to checkout              
              /*var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message) + '&redirect=false';
              window.open(whatsappUrl, '_blank');*/

              // Generate a short link using the Bitly API
              const accessToken = bgat;
              console.log('Bitly Token:', accessToken);
              const longUrl     = sharedCartUrl;
              console.log('Long URL:',longUrl);

            if (accessToken && accessToken.trim() !== '') {
              event.preventDefault();
              fetch('https://api-ssl.bitly.com/v4/shorten', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type' : 'application/json',
                  'Access-Control-Allow-Headers' : '*',
                },
                //body: JSON.stringify({ long_url: longUrl })
                body: JSON.stringify({ "long_url": longUrl, "domain": "bit.ly" })
              })
                //.then(response => response.json())
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Bitly API request failed.');
                  }
                })
                .then(bitlyResponse => {
                  if (bitlyResponse && bitlyResponse.link) {
                    var shortLink = bitlyResponse.link;
                    console.log('Short Link:', shortLink);

                    // Use the shortLink as needed (e.g., display or share)
                    var wpurl = cmwsl + ' \nCart URL: ' + shortLink;
                    var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(wpurl) + '&redirect=false';
                    window.open(whatsappUrl, '_blank');
                  } else {
                    console.error('Error generating short link:', bitlyResponse);
                    alert('Token is not valid.'); // Display an alert when the token is not valid
                  }
                })
                .catch(error => {
                  console.error('Error generating short link:', error);  
                  alert('Wrong Bitly Token or You’ve used all of your Bitlinks this month.'); // Display an alert when the Bitly API request fails
                
                });
            } else {
              // If accessToken is empty, use WhatsApp API without Bitly
              var wpurl = cmwsl + ' \nCart URL: ' + sharedCartUrl;
              var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(wpurl) + '&redirect=false';
              window.open(whatsappUrl, '_blank');
            }

            });

            // Append the WhatsApp button to the parent container of the checkout button
            //checkoutButton.parentNode.appendChild(whatsappButton);
            checkoutButton.parentNode.insertBefore(customButton, checkoutButton);
          })
          .catch(error => {
            console.error('Error fetching cart URL:', error);
          });

          // Dynamically inject the CSS styles into the document head
          var style = document.createElement('style');
          style.innerHTML = `
            @media screen and (max-width: 767px) {
              button.whatsapp-button {
                width: 100%;
                margin-bottom: 10px;
              }
            }
          `;
          document.head.appendChild(style);
        }
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
