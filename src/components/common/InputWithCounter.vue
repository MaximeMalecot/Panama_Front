<script setup>
const props = defineProps({
    maxLength: {
        type: Number,
        default: 255,
    },
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "input",
    },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<template>
    <div class="input_wrapper">
        <input
            v-if="type === 'input'"
            type="text"
            :value="modelValue"
            :placeholder="placeholder"
            @input="emit('update:modelValue', $event.target.value)"
            :maxlength="maxLength"
            v-on:keydown.enter.prevent
        />
        <textarea
            v-else-if="type === 'textarea'"
            :value="modelValue"
            :placeholder="placeholder"
            multiline="true"
            rows="4"
            cols="50"
            :maxlength="maxLength"
            @input="emit('update:modelValue', $event.target.value)"
        />
        <span>{{ modelValue.length }}/{{ maxLength }}</span>
    </div>
</template>

<style scoped lang="scss">
.input_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background-color: white;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    min-height: 100px;
    input,
    textarea {
        margin: 0;
        padding: 0;
        resize: none !important;
        border-color: transparent;
        outline: none;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        font-family: inherit;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    span {
        margin-left: auto;
        font-size: 0.7rem;
    }
}
</style>
