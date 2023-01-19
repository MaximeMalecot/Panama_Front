<script setup>
import { getContrastingTextColor } from '@/utils/colors';

defineProps({
    color: {
        type: String,
    }
})


</script>

<template>
    <span v-if="color" class="tag" :style="{ background: color, color: getContrastingTextColor(color) }"><slot></slot></span>
    <span v-else class="tag"><slot></slot></span>
</template>

<style lang="scss" scope>
.tag {
    background: var(--border);
    padding: .25rem .5rem;
    border-radius: var(--radius-4);
    font-size: .9rem;
}
</style>