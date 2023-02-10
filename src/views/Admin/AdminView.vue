<template>
    <div class="subNavbar">
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-index' }">Accueil</RouterLink>
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-filters' }">Filters</RouterLink>
    </div>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
    .subNavbar {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 2rem;
        justify-content: center;
        align-items: center;
    }
</style>