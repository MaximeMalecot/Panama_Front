<script setup>
import Btn from '@/components/common/Btn.vue'
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
                    <RouterLink class="header__nav__list__item__link" :to="{ name: 'home' }">Comment ça marche ?</RouterLink>
                </li>
                <li class="header__nav__list__item">
                    <RouterLink class="header__nav__list__item__link" :to="{ name: 'home' }">A propos</RouterLink>
                </li>
            </ul>
        </nav>
        <div class="header__login">
            <Btn type="link" :to="{ name: 'home' }" outline>Je suis client</Btn>
            <Btn type="link" :to="{ name: 'home' }">Je suis freelance</Btn>
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
</style>