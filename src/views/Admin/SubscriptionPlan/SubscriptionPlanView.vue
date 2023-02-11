<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import subscriptionService from '@/services/subscription.service.js';
import Btn from '@/components/common/Btn.vue'

const route = useRoute();
const id = route.params.id;
const subscriptionPlan = ref({});

onMounted(async () => {
    const res = await subscriptionService.getPlan(id);
    if(res){
        subscriptionPlan.value = res;
    }
});

</script>

<template>
    <div class="container">
        <div class="header">
            <h2>Subscription {{ subscriptionPlan.name }}</h2>
            <p>{{ subscriptionPlan.description }}</p>
            <p>{{ subscriptionPlan.color }}</p>
            <p>{{ subscriptionPlan.price }}€</p>
            <p>{{ subscriptionPlan.stripeId }}</p>
            <Btn :type="'link'" :to="{ name: 'admin-subscription-plan-edit', params: { id: id } }">Modifier</Btn>
        </div>
        <div class="subscriptions">
            <h3>Subscriptions</h3>
            <div v-for="subscription in subscriptionPlan.subscriptions">
                <p>{{ subscription.freelancer.name }} {{ subscription.freelancer.surname }} on {{ subscription.freelancer.createdAt }}</p>
            </div>
        </div>

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
    margin: auto
}
</style>