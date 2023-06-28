import React, { useEffect, useState } from 'react';
import { Button, Card, Page } from '@shopify/polaris';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { TitleBar } from "@shopify/app-bridge-react";

export function ScriptTagCreator() {
  const app = useAppBridge();
  const [scriptTagCreated, setScriptTagCreated] = useState(false);

  useEffect(() => {
    async function createScriptTag() {
      // Check if the script tag is already created
      if (scriptTagCreated) {
        console.log('Script tag already created');
        return;
      }

      const response = await fetch('/api/create-script-tag', {
        method: 'POST',
        headers: {
          'Content-Type'    : 'application/json',
          'X-Requested-With': 'XMLHttpRequest', 
        },
        body: JSON.stringify({
          shop: app.shopOrigin,
        }),
      });

      const data = await response.json();
      console.log(data);
    }

   // Check if we are on the cart page before creating the script tag
    if (window.location.pathname === '/cart') {
      createScriptTag();
    }
  }, []);

  return (
    <Page>
      {/* <TitleBar
        primaryAction={{
          content: 'Back',
          onAction: () => {
            Redirect.create(app).dispatch(Redirect.Action.APP, '/');
          },
        }}
      /> */}
              
        {/*<Button primary>Share me On WhatsApp.</Button>*/}
      
    </Page>
  );
}