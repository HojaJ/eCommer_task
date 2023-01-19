<template>
    <PageComponent>
        <section class="min-h-screen body-font text-gray-600">
                <div class="container mx-auto px-5 py-10">
                    <div class="-m-4 flex flex-wrap items-center">
                        <div
                            v-for="product in products.data"
                            :key="product.id"
                            class="container m-2 p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                        >
                            <img
                                class="rounded-xl"
                                :src="product.image_url"
                                :alt="product.title"
                            />
                            <div class="flex justify-between items-center">
                                <div>
                                    <h1 class="mt-5 text-2xl font-semibold">{{ product.title }}</h1>
                                    <p class="mt-2">${{  product.price }}</p>
                                </div>
                                <div>
                                    <button
                                        class="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 "
                                        @click="productToCart(product)"
                                    >Add to Cart</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
    </PageComponent>
</template>

<script setup>
import PageComponent from "@/components/PageComponent.vue";
import store from "../store";
import router from "../router";
import { computed } from "vue";

const products = computed(() => store.state.products);
store.dispatch('getHome');

function productToCart(product) {
    store.dispatch('productToCart', product);
}


</script>

<style scoped>

</style>
