<script setup>
import { reactive, provide, ref, watch, computed } from "vue";
import Btn from "@/components/common/Btn.vue";
import Timeline from "./Timeline.vue";
import Step1 from "./steps/Step1.vue";
import Step2 from "./steps/Step2.vue";
import Step3 from "./steps/Step3.vue";
import Step4 from "./steps/Step4.vue";
import projectService from "../../services/project.service";
import { displayMsg } from "@/utils/toast";

const currentStep = ref(0);
const loading = ref(false);
const formData = reactive({
    title: "",
    description: "",
    filters: [],
    price_range: { minPrice: 0, maxPrice: 0 },
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
        component: Step1,
    },
    {
        title: "Tags",
        component: Step2,
    },
    {
        title: "Détails",
        component: Step3,
    },
    {
        title: "Aperçu",
        component: Step4,
    },
];

const createPost = async () => {
    loading.value = true;
    const { title: name, description, ...rest } = formData;
    const { minPrice, maxPrice } = rest.price_range;
    const { value, unit } = rest.duration;

    const filters = formData.filters.map((filter) => filter.id);

    const payload = {
        name,
        description,
        minPrice,
        maxPrice,
        length: value,
        filters
    };
    const res = await projectService.createProject(payload);
    if (res === false && !res?.url) {
        displayMsg({
            msg: "An error occured with your project",
            type: "error",
        });
    } else {
        window.location.replace(res.url);
    }
    loading.value = false;
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
                    <Btn v-if="currentStep > 0" @click="prevStep" outline
                        >Previous</Btn
                    >
                    <Btn v-if="currentStep < steps.length - 1" @click="nextStep"
                        >Next</Btn
                    >
                    <template v-else>
                        <Btn v-if="!loading" @click="createPost"
                            >Valider et procéder au paiement</Btn
                        >
                        <Btn v-else>...</Btn>
                    </template>
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
