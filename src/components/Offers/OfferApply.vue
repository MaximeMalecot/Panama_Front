<script setup>
import Btn from '@/components/common/Btn.vue';
</script>

<template>
    <div class="offer-apply">
        <p class="offer-apply__title">Vous souhaitez travailler pour ce projet ?</p>
        <div class="offer-apply__cta">
            <Btn class="offer-apply__cta__btn">Je me positionne sur l'offre</Btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.offer-apply {
    background: var(--background);
    border-radius: var(--radius-1);
    padding: 1rem;
    &__title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: 1rem;
    }
    &__cta {
        display: flex;
        justify-content: flex-end;
        &__btn {
            font-size: 1.2rem;
        }
    }
}
</style>