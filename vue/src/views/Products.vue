<template>
    <PageComponent>
        <template v-slot:header>
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900">Products</h1>
                    <TButton color="green" :to="{ name: 'ProductCreate' }">
                        Add new product
                    </TButton>
                </div>
            </div>
        </template>
        <div v-if="products.loading" class="flex justify-center">Loading...</div>
        <div v-else-if="products.data.length">
            <div class="overflow-x-auto">
                <div class="w-full">
                    <div class="bg-white shadow-md rounded my-6">
                        <table class="min-w-max w-full table-auto">
                            <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">ID</th>
                                <th class="py-3 px-6 text-left">Title</th>
                                <th class="py-3 px-6 text-center">Image</th>
                                <th class="py-3 px-6 text-center">Price</th>
                                <th class="py-3 px-6 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody class="text-gray-600 text-sm font-light">
                            <tr
                                class="border-b border-gray-200 hover:bg-gray-100"
                                v-for="product in products.data"
                                :key="product.id"
                            >
                                <td class="py-3 px-6 text-left text-lg font-medium">{{product.id}}</td>

                                <td class="py-3 px-6 text-left text-lg">{{product.title}}</td>

                                <td class="py-3 px-6 text-center">
                                    <div class="flex items-center justify-center">
                                        <img class="w-48  transform hover:scale-150" :src="product.image_url"/>
                                    </div>
                                </td>

                                <td class="py-3 px-6 text-center">
                                    <span class="text-lg">{{ product.price }}</span>
                                </td>
                                <td class="py-3 px-6 text-center">

                                    <div class="flex item-center justify-center">
<!--                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">-->
<!--                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />-->
<!--                                            </svg>-->
<!--                                        </div>-->
                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click="goToPage(product.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>

                                        <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click="deleteProduct(product.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>

                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-gray-600 text-center py-16">
            Your don't have products yet
        </div>
    </PageComponent>
</template>

<script setup>
    import TButton from "@/components/TButton.vue";
    import PageComponent from "@/components/PageComponent.vue";
    import { computed } from "vue";
    import store from "../store";
    import router from "../router";

    const products = computed(() => store.state.products);

    store.dispatch('getProducts')

    function deleteProduct(id) {
        if (
            confirm(
                `Are you sure you want to delete this product? Operation can't be undone!!`
            )
        ) {
            store.dispatch("deleteProduct", id).then(() => {
                store.dispatch("getProducts");
            });
        }
    }
    function goToPage(id){
        router.push({
            name: "ProductView",
            params: { id: id },
        })
    }
</script>

<style scoped>

</style>
