<template>
    <PageComponent>

        <template v-slot:header>
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold text-gray-900">
                        {{ route.params.id ? model.title : "Create a Product" }}
                    </h1>

                    <div class="flex">
                        <TButton v-if="model.slug" link :href="`/view/product/${model.slug}`" target="_blank" class="mr-2">
                            View Public link
                        </TButton>
                        <TButton v-if="route.params.id" color="red" @click="deleteProduct()">
                            Delete
                        </TButton>
                    </div>
                </div>
            </div>
        </template>

        <div v-if="productLoading" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent="saveProduct" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-[80%] w-[80%] text-gray-300"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                              <path
                                  fill-rule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                            <button
                                type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <!--/ Image -->

                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700"
                        >Title</label
                        >
                        <input
                            type="text"
                            name="title"
                            id="title"
                            v-model="model.title"
                            autocomplete="product_title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ Title -->

                    <!-- Price -->
                    <div>
                        <label for="price" class="block text-sm font-medium text-gray-700"
                        >Price</label
                        >
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            id="price"
                            v-model="model.price"
                            autocomplete="product_price"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!-- Price -->

                </div>
                <!--/ Survey Fields -->



                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <TButton>
                        Save
                    </TButton>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import { computed, reactive,ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../store";
import PageComponent from "@/components/PageComponent.vue";
import TButton from "@/components/TButton.vue";

const router = useRouter();
const route = useRoute();
const productLoading = computed(() => store.state.currentProduct.loading);


const model = ref({
    title: "",
    slug: "",
    price: "",
    image: null,
    image_url: null,
});

watch(
    () => store.state.currentProduct.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: !!newVal.status,
        };
    }
);

if (route.params.id) {
    store.dispatch("getProduct", route.params.id);
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        // The field to send on backend and apply validations
        model.value.image = reader.result;

        // The field to display here
        model.value.image_url = reader.result;
        ev.target.value = "";
    };
    reader.readAsDataURL(file);
}


/**
 * Create or update product
 */
function saveProduct() {
    // console.log(data);
    store.dispatch("saveProduct", { ...model.value }).then(({ data }) => {
        // console.log(data);
        router.push({
            name: "Products",
            params: { id: data.data.id },
        });
    });
}

function deleteProduct() {
    if (
        confirm(
            `Are you sure you want to delete this product? Operation can't be undone!!`
        )
    ) {
        store.dispatch("deleteProduct", model.value.id).then(() => {
            router.push({
                name: "Products",
            });
        });
    }
}
</script>

<style></style>
