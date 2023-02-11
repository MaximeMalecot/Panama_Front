<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import userService from '@/services/user.service';
import clientInfoService from '@/services/client-info.service';
import freelancerInfoService from '@/services/freelancer-info.service';
import Btn from '@/components/common/Btn.vue';
import Input from "@/components/common/InputField.vue";
import { ROLES } from '../../../constants/roles';
import { displayMsg } from "@/utils/toast";

const route = useRoute();
const id = route.params.id;
const loading = ref(true);

const user = ref({});
const infos = computed(() => {
    if(user.value.roles){
        if(user.value.roles.includes(ROLES.CLIENT)){
            return user.value.clientInfo;
        }else if(user.value.roles.includes(ROLES.FREELANCER) || user.value.roles.includes(ROLES.FREELANCER_PREMIUM)){
            return user.value.freelancerInfo;
        }
    }
    return null;
});
const subscription = computed(() => user.value.subscription ? user.value.subscription : null );
const invoices = computed(() => user.value.invoices ? user.value.invoices : []);
const propositions = computed(() => user.value.propositions ? user.value.propositions : []);

onMounted(async () => {
    const res = await userService.getUserAdmin(id);
    if(res){
        user.value = res;
        if(res.roles.includes(ROLES.CLIENT)){
            infos.value = res.clientInfo;
        }else if(res.roles.includes(ROLES.FREELANCER) || res.roles.includes(ROLES.FREELANCER_PREMIUM)){
            infos.value = res.freelancerInfo;
        }
    }
    loading.value = false;
});

const updateUser = async (id, data) => {
    loading.value = true;
    const res = await userService.updateUser(id, data);
    if(res){
        user.value = res;
    }
    loading.value = false;
    displayMsg({ msg: "User updated", type: "success" });
}

const updateInfos = async (id, data, type) => {
    loading.value = true;
    const res = type === 'ClientInfo' ? await clientInfoService.updateInfo(id, data) : await freelancerInfoService.updateInfo(id, data);
    if(res){
        infos.value = res;
        displayMsg({ msg: "User informations updated", type: "success" });
    }
    loading.value = false;
}

const updateUserWrapper = () => {
    let { email, name, surname} = user.value;
    updateUser(user.value.id, { email, name, surname});
}

const updateInfosWrapper = () => {
    let { description, phoneNb, address, city} = infos.value;
    updateInfos(infos.value.id, { description, phoneNb, address, city}, infos.value['@type']);
}
</script>

<template>
    <section v-if="loading">Loading...</section>
    <div class="container" v-else>
        <div class="header">
            <h3>User {{ user.id }}</h3>
            <div class="content">
                Name : <Input type="text" v-model="user.name"/>
                Surname : <Input type="text" v-model="user.surname"/>
                Email : <Input type="text" v-model="user.email"/>
                <p>Roles : {{ user.roles }}</p>
                <p>isVerified : {{ user.isVerified }}</p>
            </div>
                <Btn @click="updateUserWrapper">Update</Btn>
        </div>
        <div class="infos" v-if="infos">
        <hr style="width: 100%;"/>
            <h3>User informations</h3>
            <div class="content">
                Description : <textarea v-model="infos.description">{{ infos.description }}</textarea>
                Phone number : <Input type="text" v-model="infos.phoneNb"/>
                Address : <Input type="text" v-model="infos.address"/>
                City : <Input type="text" v-model="infos.city"/>
                <p v-if="infos['@type'] === 'FreelancerInfo'">infos vérifiées : {{ infos.isVerified }}</p>
                <Btn @click="updateInfosWrapper">Update</Btn>
            </div>
        </div>
        <div class="subscription" v-if="subscription">
        <hr style="width: 100%;"/>
            <h3>Subscription</h3>
            <div>
                <p>Subscripted to subscription {{ subscription.plan.name }}</p>
                <p>CreatedAt : {{ subscription.plan.createdAt }}</p>
            </div>
        </div>
        <div class="propositions" v-if="propositions.length > 0">
        <hr style="width: 100%;"/>
            <h3>Propositions</h3>
            <div v-for="proposition in propositions">
                <p>On project : {{ proposition.project.name }}</p>
                <p>{{ proposition.status }} at {{ proposition.updatedAt }}</p>
            </div>

        </div>
        <div class="invoice" v-if="invoices.length > 0">
        <hr style="width: 100%;"/>
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
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 1rem;
}
</style>