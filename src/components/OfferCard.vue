<script setup>
import Tag from './common/Tag.vue';
</script>


<template>
    <article class="card">
        <div class="card__thumbnail"></div>
        <div class="card__content">
            <p class="card__content__title">Conception d'un site avec Shopify</p>
            <div class="card__content__technos">
                <Tag>Shopify</Tag>
                <Tag>HTML/CSS</Tag>
            </div>
            <div class="card__content__footer">
                <span class="card__content__footer__price">2000€ - 5000€</span>
                <span class="card__content__footer__time">4 mois</span>
            </div>
        </div>

    </article>
</template>

<style lang="scss" scoped>
.card {
    display: inline-block;
    border: 1px solid var(--border);
    border-radius: var(--radius-1);

    &__thumbnail {
        background: green;
        height: 50px;
        width: 100%;
        border-top-right-radius: var(--radius-1);
        border-top-left-radius: var(--radius-1);
    }

    &__content {
        padding: 1rem;

        &__title {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        &__technos {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: .5rem;
            margin-bottom: 1rem;
        }
        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

}
</style>