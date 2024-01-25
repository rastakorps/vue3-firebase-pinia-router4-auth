<template>
    <h1>Home page</h1>
    <p>{{ userStore.userData?.email }}</p>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore();
</script>