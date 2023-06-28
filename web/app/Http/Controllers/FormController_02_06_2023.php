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


class FormController extends Controller
{       
    public function saveFormData(Request $request)
    {    
        $whatsappShareCartEnable          = $request->input('selected2');
        $buttonLabelText                  = $request->input('blt');
        $cartMessageOnWhatsappShareLink   = $request->input('cmwsl');
        $whatsappButtonPositionOnCartPage = $request->input('selected3');

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
                ]);
        } else {
            // Insert a new record
            DB::table('wpcart')->insert([
                    'wp_cart_enable_disable' => $whatsappShareCartEnable,
                    'wp_button_label_text'   => $buttonLabelText,
                    'wp_cart_mesage_on_link' => $cartMessageOnWhatsappShareLink,
                    'wp_button_position'     => $whatsappButtonPositionOnCartPage,
            ]);
        }

        return response()->json([
            'success' => true,            
            'message' => 'Form data saved successfully!',
        ]);
    }

    public function savedFormData(Request $request)
    {        
       // $tunnelUrl = $request->root(); // get cloudflare tunnel url dynamically
        
        $wp_cart_data = DB::table('wpcart')->get();
        
        //$getdata = compact('wp_cart_data', 'tunnelUrl');
        return $wp_cart_data;                    
    } 

    public function StCreate(Request $request)
    {      
        //https://shopify.dev/docs/api/storefront  -> for dynamic $shopDomain and $accessToken


        //$shopDomain = $request->get('shop');
        //$accessToken = $request->session()->get('access_token');
        //$accessToken = getAccessTokenFromDB(); // Replace this with your own code to get the access token
                
        $shopDomain = "ncodeshop.myshopify.com";
        $accessToken = "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";
        
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
        
        return $response->json();    
    }

    public function fetchCartUrl(Request $request)
    {
        //https://shopify.dev/docs/api/storefront  -> for dynamic $shopDomain and $accessToken
        
        $shopDomain  = 'ncodeshop.myshopify.com';
        $apiKey      = '47ff03ffb186ff9c5a9aeb5f1b1ea853';
        $accessToken = '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';

        // Create a Shopify client
        /*$shopifyClient = new ShopifyClient($shopDomain, $accessToken);

        // Fetch the cart data
        $cartData = $shopifyClient->cart->fetch();

        // Return the cart data as JSON response
        return response()->json($cartData);*/

        //$url = "https://$shopDomain/admin/api/2023-04/cart.json";
        $url = "https://$shopDomain/cart.js";
        //$currentCartUrl = $request->getRequestUri();
        //$cartUrl = url()->current();
        $cartUrl = "https://$shopDomain/cart";
        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken,
        ])->get($cartUrl);

        return response()->json(['cartUrl' => $cartUrl]);
        
        /*if ($response->failed()) {
            $statusCode = $response->status();
            $errorResponse = $response->json();
            return response()->json(['error' => 'Error fetching cart url', 'statusCode' => $statusCode, 'response' => $errorResponse], 500);
            //return response()->json(['error' => 'Error fetching cart details'], 500);
        }

        $cartData = $response->json();        
        return response()->json($cartData);  */      
    }
}
