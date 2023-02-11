<script setup>
import { ref, onMounted } from 'vue'
import Btn from '@/components/common/Btn.vue';
import SubscriptionPlansService from '@/services/subscription.service.js'

const subscriptionPlans = ref([])
onMounted(async () => {
    const res = await SubscriptionPlansService.getPlans()
    if(res){
        subscriptionPlans.value = res['hydra:member']
    }
})

</script>

<template>
    <Btn :type="'link'" :to="{ name: 'admin-subscription-plan-create'}">Create a new one</Btn>
    <div class="container" v-for="sub in subscriptionPlans">
        <h3>{{ sub.name }}</h3>
        <p>{{ sub.color }}</p>
        <p>{{ sub.price }}€</p>
        <div class="actions">
            <Btn :type="'link'" :to="{ name: 'admin-subscription-plan', params: { id: sub.id } }">See or edit</Btn>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.actions {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>