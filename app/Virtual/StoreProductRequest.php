<?php


namespace App\Virtual;

/**
 * @OA\Schema(
 *      title="Store Product request",
 *      description="Store Product request body data",
 *      type="object",
 *      required={"title","price"}
 * )
 */

class StoreProductRequest
{
    /**
     * @OA\Property(
     *      title="title",
     *      description="Name of the new Product",
     *      example="A nice product"
     * )
     *
     * @var string
     */
    public $title;

    /**
     * @OA\Property(
     *      title="price",
     *      description="Price of the new Product",
     *      example="12.20"
     * )
     *
     * @var float
     */
    public $price;

    /**
     * @OA\Property(
     *      title="image",
     *      description="Image of the new Product",
     *      example="The blob string"
     * )
     *
     * @var string
     */
    public $image;
}
