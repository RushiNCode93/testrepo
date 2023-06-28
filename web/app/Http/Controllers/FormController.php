<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Shopify\Auth\OAuth;
use Shopify\Clients\Rest;    
use Shopify\ShopifyClient;
use Shopify\Rest\AdminApi;
use Shopify\Rest\Serialize\JsonSerializer;
use Shopify\Rest\Admin2023_04\ScriptTag;
use Shopify\Utils;
use Illuminate\Support\Facades\Http;

use Shopify\Shopify;


class FormController extends Controller
{       
    /*private $shopDomain;

    public function __construct()
    {
        $store = DB::table('sessions')->first();
        if (!$store) {           
            // Handle the error if store information is not found
            // You can log the error or throw an exception
            // For simplicity, we'll set a default shop domain
            $this->shopDomain = 'example.myshopify.com';
        } else {
            $this->shopDomain = $store->shop;
        }
    }*/

    public function saveFormData(Request $request)
    {    
        $whatsappShareCartEnable          = $request->input('selected2');
        $buttonLabelText                  = $request->input('blt');
        $cartMessageOnWhatsappShareLink   = $request->input('cmwsl');
        $whatsappButtonPositionOnCartPage = $request->input('selected3');
        $BitlyGenericAccessToken          = $request->input('bgat');

        $existingRecord = DB::table('wpcart')->first();

        if ($existingRecord) {
            // Update the existing record
            DB::table('wpcart')
                ->where('id', $existingRecord->id)
                ->update([
                    'wp_cart_enable_disable' => $whatsappShareCartEnable,
                    'wp_button_label_text'   => $buttonLabelText,
                    'wp_cart_mesage_on_link' => $cartMessageOnWhatsappShareLink,
                    'wp_button_position'     => $whatsappButtonPositionOnCartPage,
                    'bitly_access_token'     => $BitlyGenericAccessToken,
                ]);
        } else {
            // Insert a new record
            DB::table('wpcart')->insert([
                    'wp_cart_enable_disable' => $whatsappShareCartEnable,
                    'wp_button_label_text'   => $buttonLabelText,
                    'wp_cart_mesage_on_link' => $cartMessageOnWhatsappShareLink,
                    'wp_button_position'     => $whatsappButtonPositionOnCartPage,
                    'bitly_access_token'     => $BitlyGenericAccessToken,
            ]);
        }
        //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
        return response()->json([
            'success' => true,            
            'message' => 'Form data saved successfully!',
        ]);
    }

    public function savedFormData(Request $request)
    {               
        $wp_cart_data = DB::table('wpcart')->get();        

        //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
        return $wp_cart_data;                    
    } 

    public function StCreate(Request $request)
    {      
        //https://shopify.dev/docs/api/storefront  -> for dynamic $shopDomain and $accessToken


        //$shopDomain = $request->get('shop');
        //$accessToken = $request->session()->get('access_token');
        //$accessToken = getAccessTokenFromDB(); // Replace this with your own code to get the access token
        $store = DB::table('sessions')->first();
        if (!$store) {           
            return response()->json(['error' => 'Store information not found'], 404);
        }       
        $shopDomain  = $store->shop;
        $apiKey      = '47ff03ffb186ff9c5a9aeb5f1b1ea853';
        $accessToken = $store->access_token;

        /*$shopDomain  = "ncodeshop.myshopify.com";
        $accessToken = "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";*/
        
        // Set the script tag properties
        $scriptTag = [
            'event' => 'onload',
            'src'   => 'https://www.aiimsraipur.edu.in/upload/wpcartbutton.js'
        ];
        
        // Create the script tag using the Shopify API        
        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken,
            'Content-Type'           => 'application/json'
        ])->post("https://{$shopDomain}/admin/api/2023-04/script_tags.json", [
            'script_tag'            => $scriptTag,
            'display_scope'         => 'cart'

        ]);
        
        //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
        return $response->json();    
    }

    public function fetchCartUrl(Request $request)
    {
        //https://shopify.dev/docs/api/storefront  -> for dynamic $shopDomain and $accessToken

        $store = DB::table('sessions')->first();
        if (!$store) {           
            return response()->json(['error' => 'Store information not found'], 404);
        }       
        $shopDomain  = $store->shop;
        $apiKey      = '47ff03ffb186ff9c5a9aeb5f1b1ea853';
        $accessToken = $store->access_token;
        $cartUrl     = "https://$shopDomain/cart";

        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken,
        ])->get($cartUrl);

        //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
        return response()->json(['cartUrl' => $cartUrl]);
    }
    
    public function fetchCart()
    {
        $store = DB::table('sessions')->first();
        if (!$store) {           
            return response()->json(['error' => 'Store information not found'], 404);
        }       
        $shopDomain  = $store->shop;
        $apiKey      = '47ff03ffb186ff9c5a9aeb5f1b1ea853';
        $accessToken = $store->access_token;

        /*$shopDomain  = 'ncodeshop.myshopify.com';
        $accessToken = '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';*/
        $apiUrl      = "https://{$shopDomain}/api/2023-04/graphql.json"; //Store Front GQ API
        //$apiUrl      = "https://{$shopDomain}/admin/api/2023-04/graphql.json"; //Admin GQ API

        $query = '
            query {
              cart(
                id: "gid://shopify/Cart/088cacc5645ea2c375cfecf90972a709"
              ) {
                id
                createdAt
                updatedAt
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                      attributes {
                        key
                        value
                      }
                    }
                  }
                }
                attributes {
                  key
                  value
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
                  }
                }
                buyerIdentity {
                  email
                  phone
                  customer {
                    id
                  }
                  countryCode
                  deliveryAddressPreferences {
                    ... on MailingAddress {
                      address1
                      address2
                      city
                      provinceCode
                      countryCodeV2
                      zip
                    }
                  }
                }
              }
            }

        ';

        $response = Http::withHeaders([
            //'Content-Type' => 'application/graphql',
            //'X-Shopify-Access-Token' => $accessToken,
            'X-Shopify-Storefront-Access-Token' => 'braiga',
        ])->post($apiUrl, [
            'query' => $query,
        ]);

        if ($response->successful()) {
            $cartData = $response->json();
            header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
            return response()->json($cartData);
        } else {
            $errorMessage = $response->json()['errors'][0] ?? 'Unknown error occurred.';
            //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
            return response()->json(['error' => $errorMessage], $response->status());
        }
    }

    public function getTunnelUrl(Request $request)
    {        

        //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
        $tunnelUrl = $request->root(); // get cloudflare tunnel url dynamically
        //return $tunnelUrl;  

        $store = DB::table('sessions')->first();
        if (!$store) {           
            return response()->json(['error' => 'Store information not found'], 404);
        }       
        $shopDomain  = $store->shop;
        $accessToken = $store->access_token;
        
        // Make an API request to retrieve the shop details
        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken,
        ])->get("https://$shopDomain/admin/api/2023-04/shop.json");

        // Check if the request was successful
        if ($response->successful()) {
            $shop = $response->json()['shop'];

            // Retrieve the API key
            $apiKey = $shop['name'];

            // Use the API key as needed in your application
            echo "Tunnel Url: $tunnelUrl";
            echo "<br>";
            echo "API Key: $apiKey";
        } else {
            // Handle the error case
            echo "Error retrieving shop details: " . $response->status();
        }
    }

    public function handleCustomerDataRequest(Request $request)
    {
        // Get the raw request body
        //$payload = file_get_contents('php://input');
        $payload = $request->getContent();
        
        // Decode the JSON payload
        $data = json_decode($payload, true);
        
        // Perform processing based on the webhook data
        // Example: Log the payload
        \Log::info('Webhook Payload:', $data);
        
        // Return a response if required
        //header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://{$this->shopDomain}.myshopify.com");
        return response()->json(['data' => $data,'success' => true]);
    
    }
}
