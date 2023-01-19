<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    onClick: {
        type: Function,
        required: true
    }
});

</script>

<template>
    <div class="tag_item" @click="onClick(data)">
        <p>{{ data.name }}</p>
    </div>
</template>

<style lang="scss" scoped>
.tag_item {
    padding: 6px 10px;
    margin: 0;
    border-radius: 8px;
    background-color: var(--background);
    border: 1px solid var(--border);
    transition: 0.3s;
    width: fit-content;
    cursor: pointer;

    &:hover {
        background-color: var(--primary);

        p {
            color: white;
        }
    }


    p {
        margin: 0;
        padding: 0;
        user-select: none;
    }
}
</style>