<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import subscriptionService from '@/services/subscription.service.js';
import Btn from '@/components/common/Btn.vue'
import Input from "@/components/common/InputField.vue";

const route = useRoute();
const id = route.params.id;
const subscriptionPlan = ref({});
const loading = ref(true);

onMounted(async () => {
    const res = await subscriptionService.getPlan(id);
    if(res){
        subscriptionPlan.value = res;
    }
    loading.value = false;
});

const updatePlan = async () => {
    loading.value = true;
    const res = await subscriptionService.updatePlan(id, subscriptionPlan.value);
    if(res){
        subscriptionPlan.value = res;
    }
    loading.value = false;
}

const updatePlanWrapper = () => {
    let { name, description, color } = subscriptionPlan.value;
    if(!/^#[0-9a-f]{6}$/i.test(color)){
        color = "#000000";
    }
    const toSend = { name, description, color}
    console.log(toSend)
    // updatePlan(subscriptionPlan.value.id, toSend);
}
</script>

<template>
    <div class="container">
        <section v-if="loading || !subscriptionPlan.id">Loading...</section>
        <template v-else>
            <div class="header">
                <h2>Subscription {{ subscriptionPlan.id }}</h2>
                <Input type="text" v-model="subscriptionPlan.name"/>
                <textarea v-model="subscriptionPlan.description">{{ subscriptionPlan.description }}</textarea>
                <Input type="text" v-model="subscriptionPlan.color"/>
                <p>{{ subscriptionPlan.price }}€</p>
                <p>{{ subscriptionPlan.stripeId }}</p>
            </div>
            <div class="subscriptions">
                <h3>Subscriptions</h3>
                <div v-for="subscription in subscriptionPlan.subscriptions">
                    <p>{{ subscription.freelancer.name }} {{ subscription.freelancer.surname }} on {{ subscription.freelancer.createdAt }}</p>
                </div>
            </div>
            <Btn @click="updatePlanWrapper">Update</Btn>
        </template>
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
.header{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>