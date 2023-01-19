<template>
    <div class="no-results">
        <img class="no-results__image" src="/emptyresult.png" alt="">
        <p class="no-results__text"><slot>Aucun résultats</slot></p>
    </div>
</template>

<style lang="scss" scoped>
.no-results {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-1);

    &__image {
        width: 200px;
    }

    &__text {
        font-weight: 500;
    }
}
</style>