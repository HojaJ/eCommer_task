<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    /**
     * @OA\Get (
     *     path="/home",
     *     operationId="getHomedata",
     *     tags={"Home"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/ProductResource")
     *     ),
     *     @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
     */
    public function index() {
        $products = Product::latest()->paginate(12);
        return ProductResource::collection($products);
    }
}
