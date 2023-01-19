<template>
    <Popover class="relative bg-white">
        <div class="mx-auto max-w-7xl px-6">
            <div class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                    <a href="#">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>

                <div class="-my-2 -mr-2 md:hidden">
                    <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span class="sr-only">Open menu</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                </div>

                <PopoverGroup as="nav" class="hidden space-x-10 md:flex">

                    <router-link
                        :to="{ name: 'HomePage' }"
                        class="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                        Products
                    </router-link>

                    <router-link
                        :to="{ name: 'HomePage' }"
                        class="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                        Products
                    </router-link>




                </PopoverGroup>
                <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <a
                        @click="openCart()"
                        class="whitespace-nowrap cursor-pointer relative text-base font-medium flex bg-green-400 py-2 px-4 rounded-lg  text-gray-900">
                        <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" /> Cart
                        <span class="text-green-400 rounded-full w-6 h-6 flex items-center justify-center absolute bg-gray-50 cart_icon" v-if="store.state.cartProducts.totalCount">{{this.$store.state.cartProducts.totalCount}}</span>
                    </a>
                </div>
            </div>
        </div>

        <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <PopoverPanel focus class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="px-5 pt-5 pb-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                            </div>
                            <router-link
                                :to="{ name: 'HomePage' }"
                                class="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Products
                            </router-link>

                            <router-link
                                :to="{ name: 'HomePage' }"
                                class="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Products
                            </router-link>
                            <div class="-mr-2">
                                <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </PopoverButton>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </transition>

    </Popover>
    <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
    </DisclosurePanel>

    <ShoppingCart/>
    <router-view :key="$route.path"></router-view>
</template>

<script setup>
import ShoppingCart from '@/components/ShoppingCart.vue';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel, } from '@headlessui/vue'
import {
    ArrowPathIcon,
    Bars3Icon,
    BookmarkSquareIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorArrowRaysIcon,
    LifebuoyIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    XMarkIcon,
    ShoppingCartIcon
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import store from "../store";
store.dispatch('getCartProducts');

function openCart() {
    store.dispatch('openCart')
}

</script>
<style>
.cart_icon {
    top: -5px;
    right: -5px;
}
</style>
