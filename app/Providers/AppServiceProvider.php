<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Este codigo asegura que en un entorno de produccion las direcciones sean forzadas a https y sean seguras.
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
