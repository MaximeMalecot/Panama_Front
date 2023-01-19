<script setup>
import { computed } from 'vue';

const props = defineProps({
    totalItemCount: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
    itemPerPage: {
        type: Number,
        default: 30,
    }
});


/**
 * ⚠️ Not a pure function
 */
const getNumberOfPages = () => {
    const computedPageNumber = props.totalItemCount / props.itemPerPage;
    if (Number.isInteger(computedPageNumber)) {
        return computedPageNumber;
    }
    if (computedPageNumber < 1) {
        return 1;
    }
    return Math.floor(computedPageNumber) + 1;
}

const totalPageCount = computed(() => getNumberOfPages())

</script>

<template>
    <nav class="pagination">
        <ul class="pagination__list">
            <li v-for="page, index in [...Array(totalPageCount)]" class="pagination__list__item"
                :class="{ 'active': index + 1 === currentPage }">
                {{ index + 1 }}
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.pagination {
    display: inline-block;
    &__list {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        gap: .25rem;
        padding: 0;
        margin: 0;
        list-style-type: none;

        &__item {
            width: 1.4rem;
            height: 1.4rem;
            font-weight: 500;
            text-align: center;
            cursor: pointer;

            &.active {
                background: var(--primary);
                border-radius: var(--radius-round);
                color: var(--white)
            }
        }
    }
}
</style>