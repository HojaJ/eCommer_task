<script setup>
import { ref } from "vue";
import store from "../store";
import { useRouter } from "vue-router";
import TButtonLoading from "@/components/TButtonLoading.vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();
const user = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
};
const loading = ref(false);
const errors = ref({});

function register(ev) {
    ev.preventDefault();
    loading.value = true;
    console.log(user)
    store
        .dispatch("register", user)
        .then(() => {
            loading.value = false;
            router.push({
                name: "Products",
            });
        })
        .catch((error) => {
            loading.value = false;
            if (error.response?.status === 422) {
                errors.value = error.response.data.errors;
            }
        });
}
</script>

<template>
    <div>
        <div>
            <img
                class="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Register for free
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ " " }}
                <router-link
                    :to="{ name: 'Login' }"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    login to your account
                </router-link>
            </p>
        </div>
        <form class="mt-8 space-y-6" @submit="register">
            <Alert
                v-if="Object.keys(errors).length"
                class="flex-col items-stretch text-sm"
            >
                <div v-for="(field, i) of Object.keys(errors)" :key="i">
                    <div v-for="(error, ind) of errors[field] || []" :key="ind">
                        * {{ error }}
                    </div>
                </div>
            </Alert>

            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="name" class="sr-only">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autocomplete="name"
                        required=""
                        v-model="user.name"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required=""
                        v-model="user.email"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>

                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required=""
                        v-model="user.password"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>

                <div>
                    <label for="password_confirmation" class="sr-only">Password Confirmation</label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        autocomplete="password_confirmation"
                        required=""
                        v-model="user.password_confirmation"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>
            <div>
                <TButtonLoading
                    :loading="loading"
                    class="w-full relative justify-center"
                >
                    Sign up
                </TButtonLoading>
            </div>
        </form>
    </div>
</template>


