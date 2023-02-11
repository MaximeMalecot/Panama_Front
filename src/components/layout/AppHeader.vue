<script setup>
import Btn from '@/components/common/Btn.vue';
import { useAuthStore } from '../../stores/auth';
import { ROUTES } from '../../constants/routes';
import { ROLES } from '../../constants/roles';

const authStore = useAuthStore();

const userHasRole = (role, checkAuth = true) => {
    try {
        const authStore = useAuthStore();

        if (checkAuth && !authStore.isConnected) {
            return false;
        }

        if (authStore.userData.roles.includes(role)) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e.message);
        return false;
    }
};

</script>

<template>
    <header class="header">
        <RouterLink :to="{ name: 'home' }" class="header__logo">
            <img class="header__logo__image" src="/logo.png" alt="Logo panama">
            <span class="header__logo__text">Panama</span>
        </RouterLink>
        <nav class="header__nav">
            <ul class="header__nav__list">
                <li class="header__nav__list__item">
                    <RouterLink class="header__nav__list__item__link" :to="{ name: 'offers' }">Offres</RouterLink>
                </li>
                <li class="header__nav__list__item">
                    <RouterLink class="header__nav__list__item__link" :to="{ name: 'plans' }">Forfaits
                    </RouterLink>
                </li>
                <li class="header__nav__list__item">
                    <RouterLink class="header__nav__list__item__link" :to="{ name: 'home' }">A propos</RouterLink>
                </li>
            </ul>
        </nav>
        <div v-if="!authStore.isConnected" class="auth_header">
            <Btn type="link" :to="{ name: 'login' }" outline>Connexion</Btn>
            <RouterLink :to="{ name: 'auth-portal'}">Pas de compte ? S'inscrire</RouterLink>
        </div>
        <div v-else class="header__account">
            <p>{{ authStore.userData.email }}</p>
            <span>|</span>
            <RouterLink v-if="userHasRole(ROLES.ADMIN, false)" class="header__nav__list__item__link" :to="{ name: 'admin-index' }">Dashboard admin</RouterLink>
            <RouterLink v-else class="header__nav__list__item__link" :to="{ name: 'dashboard-home' }">Dashboard</RouterLink>
            <Btn type="button" @click="authStore.logout">Déconnexion</Btn>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid var(--border);
    padding: 1rem 2rem;
}

.header__logo {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    gap: .625rem;
    text-decoration: none;


    &__text {
        font-family: 'Titan one';
        color: var(--primary);
        font-size: 2.5rem;
    }
}

.header__nav {
    flex-grow: 1;
    margin-left: 3rem;

    &__list {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2rem;
        list-style: none;
        padding: 0;

        &__item__link {
            color: var(--text-gray);
            font-weight: 600;
            text-decoration: none;
        }
    }
}

.header__login {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
}

.auth_header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
}

.header__account{
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>