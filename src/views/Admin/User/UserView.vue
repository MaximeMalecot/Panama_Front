<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import userService from '@/services/user.service';
import Btn from '@/components/common/Btn.vue'
import { ROLES } from '../../../constants/roles';

const route = useRoute();
const id = route.params.id;

const user = ref({});
const infos = ref({});
const subscription = ref({});
const invoices = ref([]);
const propositions = ref([]);

onMounted(async () => {
    const res = await userService.getUserAdmin(id);
    if(res){
        console.log(res);
        user.value = res;
        if(res.roles.includes(ROLES.CLIENT)){
            infos.value = res.clientInfo;
        }else if(res.roles.includes(ROLES.FREELANCER) || res.roles.includes(ROLES.FREELANCER_PREMIUM)){
            infos.value = res.freelancerInfo;
        }
        if(res.subscription){
            subscription.value = res.subscription;
        }
        if(res.invoices){
            invoices.value = res.invoices;
        }
        if(res.propositions){
            propositions.value = res.propositions;
        }
    }
});
</script>

<template>
    <div class="container">
        <div class="header">
            <h3>User {{ user.name }} {{ user.surname }}</h3>
            <div>
                <p>{{ user.email }}</p>
                <p>{{ user.roles }}</p>
                <p>isVerified : {{ user.isVerified }}</p>
                <Btn :type="'link'" :to="{ name: 'admin-user-edit', params: { id: id } }">Modifier</Btn>
            </div>
        </div>
        <div class="infos">
            <h3>User informations</h3>
            <div v-if="infos['@id']">
                <p>{{ infos.descriptions }}</p>
                <p>Phone : {{ infos.phoneNb }}</p>
                <p>Address : {{ infos.address }}</p>
                <p>City : {{ infos.city }}</p>
                <p v-if="infos['@type'] === 'FreelancerInfo'">infos vérifiées : {{ infos.isVerified }}</p>
            </div>
        </div>
        <div class="subscription" v-if="subscription['@id']">
            <h3>Subscription</h3>
            <div>
                <p>Subscripted to subscription {{ subscription.plan.name }}</p>
                <p>CreatedAt : {{ subscription.plan.createdAt }}</p>
            </div>
        </div>
        <div class="propositions" v-if="propositions.length > 0">
            <h3>Propositions</h3>
            <div v-for="proposition in propositions">
                <p>On project : {{ proposition.project.name }}</p>
                <p>{{ proposition.status }} at {{ proposition.updatedAt }}</p>
            </div>

        </div>
        <div class="invoice" v-if="invoices.length > 0">
            <h3>Invoices</h3>
            <div v-for="invoice in invoices">
                <p>{{ invoice.idStripe }}</p>
                <p>{{ invoice.amount }}€</p>
                <p>CreatedAt : {{ invoice.createdAt }}</p>
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
    justify-items: center;
    gap: 1rem;
}
.container > * {
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}
</style>