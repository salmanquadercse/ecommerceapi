<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
Route::get('/ping', function () {
    return response()->json(['status' => 'API Working']);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Role-based routes
    Route::middleware('role:admin')->get('/admin/dashboard', fn() => response()->json(['msg' => 'Admin Dashboard']));
    Route::middleware('role:vendor')->get('/vendor/dashboard', fn() => response()->json(['msg' => 'Vendor Dashboard']));
    Route::middleware('role:user')->get('/user/dashboard', fn() => response()->json(['msg' => 'User Dashboard']));
});