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
    /*public function saveFormData(Request $request)
    {    
        $whatsappShareCartEnable          = $request->input('selected');
        $buttonLabelText                  = $request->input('blt');
        $cartMessageOnWhatsappShareLink   = $request->input('cmwsl');
        $whatsappButtonPositionOnCartPage = $request->input('selected1');

        DB::table('wpcart')->insert([
            'wp_cart_enable_disable' => $whatsappShareCartEnable,
            'wp_button_label_text'   => $buttonLabelText,
            'wp_cart_mesage_on_link' => $cartMessageOnWhatsappShareLink,
            'wp_button_position'     => $whatsappButtonPositionOnCartPage,
        ]);
        return response()->json([
            'success' => true,            
            'message' => 'Form data saved successfully!',
        ]);
    }*/

    public function saveFormData(Request $request)
    {    
        $whatsappShareCartEnable          = $request->input('selected');
        $buttonLabelText                  = $request->input('blt');
        $cartMessageOnWhatsappShareLink   = $request->input('cmwsl');
        $whatsappButtonPositionOnCartPage = $request->input('selected1');

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
        $wp_cart_data = DB::table('wpcart')->get();
        return $wp_cart_data;                    
    } 

    public function StCreate(Request $request)
    {      
    /* ***************************************************************************  */
        // Get the shop domain and access token from the request

        //$shopDomain = $request->get('shop');
        $shopDomain = "ncodeshop.myshopify.com";
        //$accessToken = $request->session()->get('access_token');
        //$accessToken = getAccessTokenFromDB(); // Replace this with your own code to get the access token

        $accessToken = "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";
        
        // Set the script tag properties
        $scriptTag = [
            'event' => 'onload',
            //'src' => 'http://10.16.16.5:8080/rushikeshjs/test.js'
            'src' => 'https://www.aiimsraipur.edu.in/test.js'
        ];
        
        // Create the script tag using the Shopify API        
        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken,
            'Content-Type' => 'application/json'
        ])->post("https://{$shopDomain}/admin/api/2023-04/script_tags.json", [
            'script_tag' => $scriptTag,
            'display_scope' => 'cart'
        ]);

        // Return the response from the Shopify API
        return $response->json();
    /* ***************************************************************************  */
    }
}
