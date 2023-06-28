import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { WhatsappShareCart } from "../components/WhatsappShareCart";
import { ScriptTagCreator } from "../components/ScriptTagCreator";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="WhatsApp Share Cart" primaryAction={null} />
      <Layout>
        
        <Layout.Section>          
          <WhatsappShareCart />
          <ScriptTagCreator />
          {/*<ProductsCard />*/}
          {/*<OrderTable />*/}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
