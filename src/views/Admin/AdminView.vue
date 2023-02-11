<template>
    <div class="subNavbar">
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-index' }">Accueil</RouterLink>
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-filters' }">Filters</RouterLink>
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-projects' }">Projects</RouterLink>
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-subscription-plans' }">Subscription plans</RouterLink>
        <RouterLink class="subNavbar__link" :to="{ name: 'admin-users' }">Users</RouterLink>
    </div>
    <main>
        <div class="main-container">
            <h1>Admin Dashboard</h1>
            <RouterView />
        </div>
    </main>
</template>

<style scoped>
.main-container {
    width:50%;
    margin: auto;
    text-align: center;
}
.subNavbar {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    align-items: center;
}
</style>