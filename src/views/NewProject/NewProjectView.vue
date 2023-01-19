<script setup>
import { reactive, provide, ref, watch, computed } from 'vue';
import Btn from '@/components/common/Btn.vue';
import Timeline from "./Timeline.vue";
import Step1 from "./steps/Step1.vue";
import Step2 from "./steps/Step2.vue";
import Step3 from "./steps/Step3.vue";
import Step4 from "./steps/Step4.vue";

const currentStep = ref(0);
const formData = reactive({
    title: "",
    description: "",
    filters: [
        {
            id: "1",
            name: "TAG1",
        }
    ],
    price_range: { minPrice: null, maxPrice: null },
    duration: { value: null, unit: null },
});

const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

const steps = [
    {
        title: "Presentation",
        component: Step1
    },
    {
        title: "Tags",
        component: Step2
    },
    {
        title: "Détails",
        component: Step3
    },
    {
        title: "Aperçu",
        component: Step4
    }
];

const createPost = async () => {
    console.log("create post");
};

</script>

<template>
    <div class="new_project">
        <Timeline :currentStep="currentStep" :steps="steps" />
    </div>
    <div class="container content">
        <component :is="steps[currentStep].component" :formData="formData">
            <slot>
                <div class="change_step">
                    <Btn v-if="currentStep > 0" @click="prevStep" outline>Previous</Btn>
                    <Btn v-if="currentStep < (steps.length - 1)" @click="nextStep">Next</Btn>
                    <Btn v-else @click="createPost">Valider et procéder au paiement</Btn>
                </div>
            </slot>
        </component>
    </div>
</template>

<style scoped lang="scss">
.new_project {
    margin-bottom: 2rem;
}

.content {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: var(--radius-1);
    .change_step {
        display: flex;
        gap: 10px;
    }
}
</style>