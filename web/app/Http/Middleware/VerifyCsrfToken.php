<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'api/graphql',
        'api/webhooks',
        'api/save-form-data',
        'api/get-saved-form-data',
        'api/adminapi',
        'api/create-script-tag',
        'api/update-form-data',
        'api/get-cart-details',
        'api/get-cart-data',
        'api/get-tunnel-url',
        'api/get-web-hook',
    ];
}
