<script setup>
// DOIT ALLER CHERCHER LES FILTRES ET METTER UN COMPOSANT FILTERS
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SubscriptionService from '@/services/subscription.service.js'
import Btn from '@/components/common/Btn.vue'
import Input from '@/components/common/InputField.vue'
import { displayMsg } from "@/utils/toast";

const router = useRouter();
const subscriptionPlan = ref({
    name: '',
    description: '',
    color: '',
    stripeId : '',
})

const createSubscriptionPlan = async () => {
    let payload = {
        name: subscriptionPlan.value.name,
        description: subscriptionPlan.value.description,
        color: subscriptionPlan.value.color,
        stripeId : subscriptionPlan.value.stripeId,
    }
    if(!/^#[0-9a-f]{6}$/i.test(payload.color)){
        displayMsg({ msg: "Color isn't and hexadecimal value", type: "error" });
        return;
    }
    let res = await SubscriptionService.createPlan(payload)
    if(res.status !== 201){
        res = await res.json();
        displayMsg({ msg: res, type: "error" });
        return;
    }else{
        router.push({ name: 'admin-subscription-plans' });
    }
}
</script>

<template>
    <div class="container">
        <label>Name : </label>
        <Input type="text" v-model="subscriptionPlan.name" />
        <label>Description : </label>
        <textarea v-model="subscriptionPlan.description">{{ subscriptionPlan.description }}</textarea>
        <label>Color : </label>
        <Input type="text" v-model="subscriptionPlan.color" />
        <label>StripeId : </label>
        <Input type="text" v-model="subscriptionPlan.stripeId" />
        <Btn type="button" @click="createSubscriptionPlan">Create</Btn>
    </div>
</template>

<style scoped>
.container {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
</style>