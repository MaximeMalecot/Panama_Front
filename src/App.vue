<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import UnverifiedBanner from './components/layout/UnverifiedBanner.vue';

const store = useAuthStore();

onMounted(() => {
  store.tryLogin();
})

</script>

<template>
  <AppHeader/>
  <UnverifiedBanner/>
  <RouterView />
</template>
