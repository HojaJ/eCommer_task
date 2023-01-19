<?php


namespace App\Virtual\Models;
/**
 * @OA\Schema(
 *     title="Product",
 *     description="Product model",
 *     @OA\Xml(
 *         name="Product"
 *     )
 * )
 */

class Product
{
    /**
     * @OA\Property(
     *     title="ID",
     *     description="ID",
     *     format="int64",
     *     example=1
     * )
     *
     * @var integer
     */
    private $id;

    /**
     * @OA\Property(
     *     title="title",
     *     description="Title",
     *     example="The Name Of Product"
     * )
     *
     * @var string
     */
    private $title;

    /**
     * @OA\Property(
     *     title="slug",
     *     description="Slug",
     *     example="the-name-of-product"
     * )
     *
     * @var string
     */
    private $slug;

    /**
     * @OA\Property(
     *     title="image",
     *     description="Image Url",
     *     example="/image.png"
     * )
     *
     * @var string
     */
    private $image;

    /**
     * @OA\Property(
     *     title="price",
     *     description="Product price",
     *     example="12.20"
     * )
     *
     * @var integer
     */
    private $price;

    /**
     * @OA\Property(
     *     title="Created at",
     *     description="Created at",
     *     example="2020-01-27 17:50:45",
     *     format="datetime",
     *     type="string"
     * )
     *
     * @var \DateTime
     */
    private $created_at;

    /**
     * @OA\Property(
     *     title="Updated at",
     *     description="Updated at",
     *     example="2020-01-27 17:50:45",
     *     format="datetime",
     *     type="string"
     * )
     *
     * @var \DateTime
     */
    private $updated_at;
}
