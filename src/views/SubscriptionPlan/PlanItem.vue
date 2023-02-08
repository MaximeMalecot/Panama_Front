<script setup>
import { ref, onMounted, defineProps } from "vue";
import Btn from "@/components/common/Btn.vue";

const props = defineProps({
    plan: {
        type: Object,
        required: true,
    },
    onClick: {
        type: Function,
        required: true,
    },
    showBtn: {
        type: Array,
        default: [true, ""],
        required: false,
    }
});
</script>

<template>
    <div class="plan_item">
        <h3>{{ plan.name }}</h3>
        <p>{{ plan.id ?? "unset" }}</p>
        <p>{{ plan.description }}</p>
        <span>{{ plan.price }}$</span>
        <Btn v-if="showBtn[0]" @click="() => onClick(plan.id)">COMMENCER</Btn>
        <div v-else>
            <button >Action indisponible</button>
            <span>{{ showBtn[1] }}</span>
        </div>
        <span> Offre soumise aux Conditions générales. </span>
    </div>
</template>

<style lang="scss" scoped>
.plan_item {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}
</style>
