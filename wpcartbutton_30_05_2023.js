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

fetch('https://bat-luther-nice-mississippi.trycloudflare.com/api/get-saved-form-data')
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

      customButton.addEventListener('click', function() {
        //call WhatsApp API here...
        //alert('Custom button clicked!');
        // Call WhatsApp API here
        var whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(cmwsl);
        window.open(whatsappUrl, '_blank');
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

/*jQuery(document).ready(function() {
  $('body').prepend('<div class="header" id="myHeader"><h2>Thank you for reading WeeklyHow\'s Tutorial!</h2></div>');
  $('head').prepend('<style>.header { padding: 10px 16px; background: #555; color: #f1f1f1; } .content { padding: 16px; } .sticky { position: fixed; top: 0; width: 100%} .sticky + .content { padding-top: 102px; }</style>');

  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;

  window.onscroll = function() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

});*/