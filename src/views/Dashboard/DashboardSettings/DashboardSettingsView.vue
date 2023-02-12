<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import Input from "@/components/common/InputField.vue";
import Btn from "@/components/common/Btn.vue";
import { ROLES } from "@/constants/roles";
import userService from "@/services/user.service";
import clientInfoService from "@/services/client-info.service";
import freelancerInfoService from "@/services/freelancer-info.service";
import subscriptionService from "@/services/subscription.service";
import InputWithCounter from "@/components/common/InputWithCounter.vue";
import KYCVerification from "./KYCVerification.vue";
import { displayMsg } from "@/utils/toast";

const loading = ref(true);

const authStore = useAuthStore();
const user = ref({});
const id = authStore.userData.userId;

const showKYC = computed(()=>{
    if(!authStore) return false;
    const userData=(authStore).userData;
    if( !userData.roles) return false;
    if( !userData.roles.includes(ROLES.FREELANCER)) return false;
    if( userData.isInfoVerified) return false;
    return true;
});

const showSubscription = computed(() => {
    if(!authStore) return false;
    const userData=(authStore).userData;
    return userData.roles && (userData.roles.includes(ROLES.FREELANCER) || userData.roles.includes(ROLES.FREELANCER_PREMIUM)) && userData.isInfoVerified;
})

const infos = computed(() => {
    if (user.value.roles) {
        if (user.value.roles.includes(ROLES.CLIENT)) {
            return user.value.clientInfo;
        } else if (
            user.value.roles.includes(ROLES.FREELANCER) ||
            user.value.roles.includes(ROLES.FREELANCER_PREMIUM)
        ) {
            return user.value.freelancerInfo;
        }
    }
    return null;
});

const subscription = computed(() =>
    user.value.subscription ? user.value.subscription : null
);

onMounted(async () => {
    const res = await userService.getSelfUser(id);
    if (res) {
        user.value = res;
        if (res.roles.includes(ROLES.CLIENT)) {
            infos.value = res.clientInfo;
        } else if (
            res.roles.includes(ROLES.FREELANCER) ||
            res.roles.includes(ROLES.FREELANCER_PREMIUM)
        ) {
            infos.value = res.freelancerInfo;
        }
    }
    console.log(res);
    loading.value = false;
});

const updateInfos = async (id, data, type) => {
    loading.value = true;
    const res =
        type === "ClientInfo"
            ? await clientInfoService.updateInfo(id, data)
            : await freelancerInfoService.updateInfo(id, data);
    if (res) {
        infos.value = res;
        displayMsg({ msg: "User informations updated", type: "success" });
    }
    loading.value = false;
};

const updateInfosWrapper = () => {
    let { description, phoneNb, address, city } = infos.value;
    updateInfos(
        infos.value.id,
        { description, phoneNb, address, city },
        infos.value["@type"]
    );
};

const cancelSubscription = async () => {
    if(subscription.value){
        let res = await subscriptionService.cancel();
        if(!res){
            displayMsg({ msg: "Error while cancelling subscription", type: "error" });
        } else {
            displayMsg({ msg: "Subscription cancelled", type: "success" });
            user.value.subscription.isActive = false;
        }
    }
}

</script>

<template>
    <main class="settings">
        <div>
            <h1 class="settings__title">Paramètres</h1>
            <h2 class="settings__subtitle">Avatar</h2>
            <p>
                Nous utilisons Gravatar comme service d'image de proil. Vous
                pouvez changer votre avatar en allant sur gravatar.com :
            </p>
            <a href="https://fr.gravatar.com/" target="_blank"
                >https://fr.gravatar.com/</a
            >
        </div>
        <template v-if="infos">
            <div class="infos_part">
                <hr style="width: 100%" />
                <h3>User informations</h3>
                <div class="content">
                    Description :
                    <textarea v-model="infos.description">{{
                        infos.description
                    }}</textarea>
                    Phone number :
                    <Input type="text" v-model="infos.phoneNb" /> Address :
                    <Input type="text" v-model="infos.address" /> City :
                    <Input type="text" v-model="infos.city" />
                    <p v-if="infos['@type'] === 'FreelancerInfo'">
                        infos vérifiées : {{ infos.isVerified }}
                    </p>
                    <Btn @click="updateInfosWrapper">Update</Btn>
                </div>
            </div>
            <KYCVerification v-if="showKYC" />
        </template>
        <template v-if="showSubscription">
            <h3>Subscription</h3>
            <template v-if="subscription">
                <div class="subscription" v-if="subscription">
                    <hr style="width: 100%" />
                    <div>
                        <p>Subscripted to subscription {{ subscription.plan.name }}</p>
                        <p v-if="subscription.isActive == true">CreatedAt : {{ subscription.createdAt }}</p>
                        <p v-else>CanceledAt : {{ subscription.updatedAt }}</p>
                    </div>
                    <Btn v-if="subscription.isActive == true" @click="() => cancelSubscription()">Cancel</Btn>
                </div>
            </template>
            <template v-else>
                <p>Vous n'avez aucun abonnement...</p>
            </template>
        </template>
    </main>
</template>

<style lang="scss" scoped>
.settings {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .infos_part {
        display: flex;
        flex-direction: column;
        padding: 0.3rem 0;
        border-bottom: 1px solid gray;
        .content {
            display: flex;
            flex-direction: column;
        }
    }

    .kyc_part {
        display: flex;
        flex-direction: column;
        padding: 0.3rem 0;
        border-bottom: 1px solid gray;

        form {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
}
</style>
