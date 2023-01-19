<script setup>
import Hello from '@/views/Dashboard/Hello.vue';
import Menu from '@/views/Dashboard/Menu.vue';
</script>

<template>
    <div class="dashboard">
        <section class="dashboard__hello">
            <Hello/>
        </section>
        <section class="dashboard__menu">
            <Menu/>
        </section>
        <section class="dashboard__main">
            <RouterView></RouterView>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.dashboard {
    display: grid;
    grid-template-areas:
        'hello hello'
        'menu main';
    grid-template-columns: 250px 1fr;
    padding: 2rem;
    gap: 2rem;

    &__hello {
        grid-area: hello;
    }

    &__menu {
        grid-area: menu;
    }

    &__main {
        grid-area: main;
    }
}
</style>