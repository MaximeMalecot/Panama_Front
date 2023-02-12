<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SubscriptionService from "@/services/subscription.service";
import PlanItem from "./PlanItem.vue";
import { useAuthStore } from "../../stores/auth";
import { displayMsg } from "@/utils/toast";
import { ROLES } from "@/constants/roles";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const plans = ref([]);

const canSubscribe = computed(() => {
    if (!authStore.isConnected) return [false, "Authentification requise"];
    const { roles } = authStore.userData;

    if (authStore.isSubscribed) {
        return [false, "Vous êtes déjà abonné à un forfait premium"];
    }

    if (roles.includes(ROLES.CLIENT)) {
        return [
            false,
            "Seuls les freelances peuvent souscrire à un abonnement",
        ];
    }
    if (authStore.userData?.isInfoVerified === false) {
        return [
            false,
            "Vous devez vérifier vos informations avant de souscrire à un abonnement",
        ];
    }

    return [true, ""];
});

onMounted(async () => {
    plans.value = [];
    loading.value = true;
    const res = await SubscriptionService.getPlans();
    if (res && res["hydra:member"]) {
        plans.value = res["hydra:member"];
    }
    loading.value = false;
});

const handlePlanClick = async (planId) => {
    if (loading.value) return;
    const [can, msg] = canSubscribe.value;
    if (!can) {
        displayMsg({ msg, type: "error" });
        return;
    }
    loading.value = true;
    const res = await SubscriptionService.subscribe(planId);
    if (res && res.url) {
        window.location.replace(res.url);
    } else {
        displayMsg({ msg: "Une erreur est survenue", type: "error" });
        loading.value = false;
    }

};
</script>

<template>
    <main class="subscriptions">
        <div class="container">
            <div class="header">
                <h1>Forfaits disponibles</h1>
            </div>
            <div class="subscriptions_plans">
                <template v-if="loading">
                    <p>Loading...</p>
                </template>
                <template v-else-if="plans.length === 0">
                    <p>No plans available</p>
                </template>
                <template v-else>
                    <div class="plan_items">
                        <PlanItem
                            v-for="plan in plans"
                            :showBtn="canSubscribe"
                            :key="plan.id"
                            :plan="plan"
                            @click="handlePlanClick"
                        />
                    </div>
                </template>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.subscriptions {
    display: flex;
    flex-direction: column;

    .header {
        border-bottom: 1px solid gray;
    }

    .subscriptions_plans {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;

        .plan_items {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
        }
    }
}
</style>
