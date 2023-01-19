<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    toggled: {
        type: Boolean,
        required: true,
        default: false
    },
    color: {
        type: String,
        default: 'var(--primary)'
    },
    toggle: {
        type: Function,
        required: true
    }
});

</script>

<template>
    <label for="toggle_button">
        <input type="checkbox" id="toggle_button" v-model="checkedValue">
        <span class="toggle__switch"></span>
    </label>
</template>

<style scoped lang="scss">
    
</style>