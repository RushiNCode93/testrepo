import React from 'react';
import axios from 'axios';
import { Toast, Form, FormLayout, TextField, Select, Frame } from '@shopify/polaris';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@shopify/polaris';
import { useAppQuery } from "../hooks";
import {CalloutCard} from '@shopify/polaris';

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
    {label: 'No',  value: 'no'},
  ];

  const [selected3, setSelected3] = useState('bydefault');
  const handleSelectChange3 = useCallback(
    (value) => {
      setSelected3(value)
      console.log(value, "value") 
    },
    [],
  );
  const pageoptions = [
    { label: 'By Default',    value: 'bydefault'   },
    { label: 'Top Left',      value: 'topleft'     },
    { label: 'Top Center',    value: 'topcenter'   },
    { label: 'Top Right',     value: 'topright'    },
    { label: 'Middle Left',   value: 'middleleft'  },
    { label: 'Middle Right',  value: 'middleright' },
    { label: 'Bottom Left',   value: 'bottomleft'  },
    { label: 'Bottom Center', value: 'bottomcenter'},
    { label: 'Bottom Right',  value: 'bottomright' },
  ];

  const [formData, setFormData]   = useState(null);

  const [blt, setBlt]             = useState("");
  const handleChange1             = useCallback((value) => setBlt(value), []);  

  const [bgat, setBgat]           = useState("");
  const bitlyToken                = useCallback((value) => setBgat(value), []);  

  const [cmwsl, setCmwsl]         = useState("");
  const handleChange2             = useCallback((value) => setCmwsl(value), []);

  useEffect(()=> {
    setBlt(formData?.[0]?.wp_button_label_text  ?  formData?.[0]?.wp_button_label_text  : "Share me on Whatsapp" )
  },[formData])

  useEffect(()=> {
    setBgat(formData?.[0]?.bitly_access_token  ?  formData?.[0]?.bitly_access_token  : "Enter Bitly Token Here" )
  },[formData])

  useEffect(()=> {
    setCmwsl(formData?.[0]?.wp_cart_mesage_on_link ? formData?.[0]?.wp_cart_mesage_on_link : 'Hi, Check my cart Items and let me know about products.' )
  },[formData])

  useEffect(()=> {
    setSelected2(formData?.[0]?.wp_cart_enable_disable ? formData?.[0]?.wp_cart_enable_disable : 'yes' )
  },[formData])

  useEffect(()=> {
    setSelected3(formData?.[0]?.wp_button_position ? formData?.[0]?.wp_button_position : 'bydefault' )
  },[formData])

  const handleSubmit = useCallback(async () => {
    const data = {
        selected2: selected2,
        blt: blt,
        cmwsl: cmwsl,
        selected3: selected3,
        bgat: bgat
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

    try {     
      const response = await fetch('/api/get-web-hook', {
        method: 'POST',
        headers: {
          'Content-Type'    : 'application/json',
          'X-Requested-With': 'XMLHttpRequest', 
        },
        body: JSON.stringify(data)
      });
      const formData2 = await response.json();
      console.log('Response:', formData2);
    }catch (error) {
        console.error(error);      
    }; 

  }, [selected2, blt, cmwsl, selected3, bgat]);

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
    const fetchCartUrl = async () => {
      try {
        const response = await fetch('/api/get-cart-url');
        const data = await response.json();
        console.log('Cart url:', data);        
      } catch (error) {
        console.error('Error fetching cart url:', error);
      }
    };

    fetchCartUrl();
  }, []);
  
  useEffect(() => {
    const fetchTunnelUrl = async () => {
      try {
        const response = await fetch('/api/get-tunnel-url');
        const data     = await response.json();
        //const data     = await response.text();
        console.log('Tunnel Url:', data);     
      } catch (error) {
        console.error('Error fetching tunnel url:', error);
      }
    };

    fetchTunnelUrl();
  }, []);  
 

  /*useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/get-cart-data');
        const data     = await response.json();
        //const data     = await response.text();
        console.log('Cart data:', data);     
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);*/

  return (    
    <Frame>
      <div style={{ border: '2px solid #1A7B60', padding: '20px' }}>
        <Form onSubmit={handleSubmit}>         
          <FormLayout>                
            <Select
                label="WhatsApp Share Cart Enable"
                options={options}
                onChange={handleSelectChange2}
                value={selected2}
              />              
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
              value={cmwsl}
              name="cmwsl"
            />
            <Select
              label="WhatsApp Button Position on Cart Page"
              options={pageoptions}
              onChange={handleSelectChange3}              
              value={selected3}              
            />
            <TextField
              label="Bitly Generic Access Token"
              onChange={bitlyToken}
              autoComplete="off"
              value={bgat}
              name="bgat"
            />
            <Button primary submit onClick={toggleActive} >Save Config</Button>
            {toastMarkup}

            <CalloutCard
              title="Support"
              illustration="https://cdn.shopify.com/s/files/applications/47ff03ffb186ff9c5a9aeb5f1b1ea853_512x512.png?1673325455"
              primaryAction={{
                content: 'NCode Technologies Inc.',
                url: 'https://www.ncodetechnologies.com',
              }}
            >
              <p>For support, please reach out to <a href="mailto:info@ncodetechnologies.com" target="_blank">info@ncodetechnologies.com</a> or via website <a href="https://www.ncodetechnologies.com/" target="_blank">https://www.ncodetechnologies.com</a></p>
            </CalloutCard>

          </FormLayout>
        </Form>
      </div>
    </Frame>
  )
}