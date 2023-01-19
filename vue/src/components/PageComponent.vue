<template>
    <header class="bg-white shadow">
        <slot name="header"></slot>
    </header>
    <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 sm:px-0">
                <slot></slot>
            </div>
        </div>
    </main>

</template>

<script setup>
const props = defineProps({
    title: String
})
</script>

<style scoped>

</style>
