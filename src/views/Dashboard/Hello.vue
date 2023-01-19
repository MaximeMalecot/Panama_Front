<template>
    <div class="hello">
        <div class="hello__picture">
            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d51" alt="pp">
        </div>
        <p class="hello__title">Bonjour user !</p>
    </div>
</template>

<style lang="scss" scoped>
.hello {
    grid-area: hello;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;
    background: var(--background);
    border-radius: var(--radius-1);

    &__picture {
        width: 100px;
        height: 100px;
        background: var(--white);
        border-radius: var(--radius-round);
        overflow: hidden;

        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
    }

    &__title {
        font-size: 2rem;
        font-weight: 500;
        margin: 0;
    }
}
</style>