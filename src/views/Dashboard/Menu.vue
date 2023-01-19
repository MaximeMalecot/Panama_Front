<script setup>
const dashboardRoutes = [
    {
        name: 'dashboard-offers',
        title: 'Mes offres'
    },
    {
        name: 'dashboard-projects',
        title: 'Mes projets'
    },
    {
        name: 'dashboard-projects',
        title: 'Paramètres'
    },
];
</script>

<template>
    <nav class="nav">
        <ul class="nav__list">
            <li v-for="dashboardRoute in dashboardRoutes " class="nav__list__item">
                <RouterLink :to="{ name: dashboardRoute.name }" class="nav__list__item__link" active-class="active">
                    {{ dashboardRoute.title }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.nav {
    &__list {
        list-style: none;
        padding: 0;
        margin: 0;

        &__item {
            margin-bottom: .5rem;

            &__link {
                color: var(--text-dark);
                text-decoration: none;
                font-size: 1.2rem;
                &.active {
                    font-weight: 600;
                }
            }
        }
    }
}
</style>