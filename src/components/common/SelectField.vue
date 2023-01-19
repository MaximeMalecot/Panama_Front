<script setup>
import { ref } from 'vue';

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
    },
    values: {
        type: Array,
        default: () => ([]),
    },
});

const emit = defineEmits(['update:modelValue']);

const selectName = ref('');
const isSelectOpened = ref(false)

function updateValue(value) {
    selectName.value = value.name;
    emit('update:modelValue', value.value)
}

</script>

<template>
    <div class="select" :class="{ 'opened': isSelectOpened }" @click="isSelectOpened = !isSelectOpened">
        <template v-if="!modelValue">
            <span class="select__content placeholder">{{ placeholder }}</span>
        </template>
        <template v-else>
            <span class="select__content">{{ selectName }}</span>
        </template>
        <div v-show="isSelectOpened" class="select__dropdown">
            <ul class="select__dropdown__list">
                <li v-for="value, index in values" class="select__dropdown__list__item" :key="`selectitem-${index}`"
                    @click="() => updateValue(value)">
                    {{ value.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.select {
    position: relative;
    display: inline-block;
    background: var(--background);
    border: none;
    border-radius: var(--radius-2);
    padding: .5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    min-width: 200px;

    &.opened {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    &__content {
        user-select: none;

        &.placeholder {
            color: var(--text-gray)
        }
    }

    &__dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--background);
        border-bottom-right-radius: var(--radius-2);
        border-bottom-left-radius: var(--radius-2);
        z-index: 2;

        &__list {
            list-style: none;
            padding: 0;
            margin: 0;

            &__item {
                padding: .5rem 1rem;
            }
        }
    }
}
</style>