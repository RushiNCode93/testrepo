import React from 'react';
import { Toast, Form, FormLayout, TextField, Select, Frame } from '@shopify/polaris';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@shopify/polaris';
import { useAppQuery } from "../hooks";


export function WhatsappShareCart() {

  const [active, setActive] = useState(false);
  const toggleActive        = useCallback(() => setActive((active) => !active), []);
  const toastMarkup         = active ? (
      <Toast content="Data saved successfully..!" onDismiss={toggleActive} />
  ) : null;
  
  const [selected2, setSelected2] = useState('yes');
  const handleSelectChange2 = useCallback(
    (value) => {
      setSelected2(value)
      console.log(value, "value") 
    },
    [],
  );

  const options = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
  ];




  const [formData, setFormData]   = useState(null);

  const [blt, setBlt]             = useState("");
  const handleChange1             = useCallback((value) => setBlt(value), []);  

  const [cmwsl, setCmwsl]         = useState("");
  const handleChange2             = useCallback((value) => setCmwsl(value), []);

  const [selected1, setSelected1] = useState('bydefault');
  const handleSelectChange1       = useCallback((value) => setSelected1(value), []);

  useEffect(()=> {
  setBlt(formData?.[0]?.wp_button_label_text  ?  formData?.[0]?.wp_button_label_text  : "Share me on Whatsapp" )
  },[formData])

  useEffect(()=> {
  setCmwsl(formData?.[0]?.wp_cart_mesage_on_link ? formData?.[0]?.wp_cart_mesage_on_link : 'Hi, Check my cart Items and let me know about products.' )
  },[formData])


  useEffect(()=> {
  setSelected2(formData?.[0]?.wp_cart_enable_disable ? formData?.[0]?.wp_cart_enable_disable : 'yes' )
  },[formData])






  const handleSubmit = useCallback(async () => {
    const data = {       
        selected: selected2,
        blt: blt,
        cmwsl: cmwsl,
        selected1: selected1
    }; 

    try {     
      const response = await fetch('/api/save-form-data', {
        method: 'POST',
        headers: {
          'Content-Type'    : 'application/json',
          'X-Requested-With': 'XMLHttpRequest', 
        },
        body: JSON.stringify(data)
      });
      const formData = await response.json();
      console.log('Response:', formData);
    }catch (error) {
        console.error(error);      
    }; 

  }, [selected2, blt, cmwsl, selected1]);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response  = await fetch('/api/get-saved-form-data'); 
        const data = await response.json();
        console.log(data);        
        setFormData(data);      
      } catch (error) {
        console.error('Error fetching form data:', error);  
      }
    };

    fetchFormData();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/get-cart-url');
        const data = await response.json();
        console.log('Cart data:', data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);
  
 /* const shopDomain = 'ncodeshop.myshopify.com';
  const accessToken = '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'; 
  const url = `https://${shopDomain}/cart.js`;

  fetch(url, {
    mode: "no-cors",
    headers: {
      'X-Shopify-Access-Token': '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',
      'Content-Type'    : 'application/json',
      'X-Requested-With': 'XMLHttpRequest', 
      'Access-Control-Allow-Origin': shopDomain,
    },
  })
  .then(response => response.json())
  .then(data => {
    // Handle the cart data
    console.log('Cart data:', data);
  })
  .catch(error => {
    console.error('Error fetching cart data:', error);
  });*/

  return (    
    <Frame>
      <div style={{ border: '2px solid #1A7B60', padding: '20px' }}>
        <Form onSubmit={handleSubmit}>         
          <FormLayout>                

            <Select
                label="hatsApp Share Cart Enable"
                options={options}
                onChange={handleSelectChange2}
                value={selected2}
              />


         {/*   <Select
              label="WhatsApp Share Cart Enable"
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No',  value: 'no'  },
              ]}
              onChange={handleSelectChange}
              //value={selected}
              value={formData ? formData[0].wp_cart_enable_disable : selected}
              name="selected"
            />*/}
            <TextField
              label="Button Label Text"
              onChange={handleChange1}
              autoComplete="off"
              value={blt}
              name="blt"
            />
            <TextField
              label="Cart Message on Whatsapp Share Link"
              onChange={handleChange2}
              multiline={4}
              autoComplete="off"
              //value={cmwsl}
              value={cmwsl}
              name="cmwsl"
            />
          <Select
              label="WhatsApp Button Position on Cart Page"
              options={[
                { label: 'By Default',    value: 'bydefault'   },
                { label: 'Top Left',      value: 'topleft'     },
                { label: 'Top Center',    value: 'topcenter'   },
                { label: 'Top Right',     value: 'topright'    },
                { label: 'Middle Left',   value: 'middleleft'  },
                { label: 'Middle Right',  value: 'middleright' },
                { label: 'Bottom Left',   value: 'bottomleft'  },
                { label: 'Bottom Center', value: 'bottomcenter'},
                { label: 'Bottom Right',  value: 'bottomright' },
              ]}
              onChange={handleSelectChange1}
              //value={selected1}
              value={formData ? formData[0].wp_button_position : selected1}
              name="selected1"
            />
            <Button primary submit onClick={toggleActive} >Save Config</Button>
            {toastMarkup}
          </FormLayout>
        </Form>
      </div>
    </Frame>
  )
}