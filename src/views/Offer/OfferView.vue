<script setup>
import { reactive, ref, onMounted } from "vue";
import OfferApply from "@/components/Offers/OfferApply.vue";
import Offer from "@/components/Offers/Offer.vue";
import ProjectService from "@/services/project.service";
import PropositionService from "@/services/proposition.service";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { ROLES } from "@/constants/roles";
import PremiumModal from "@/components/Premium/PremiumModal.vue";
import { displayMsg } from "@/utils/toast";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const project = ref({});
const loading = ref(true);
const applicationLoading = ref(false);
const showModal = ref(false);
const alreadyApplied = ref(false);

const handleApplication = async () => {
    applicationLoading.value = true;
    try {
        if (!authStore.isConnected) {
            //router.push({ name: "login" });
            throw new Error("Vous devez être authentifié");
        }

        const { roles, isVerified } = authStore.userData;

        if (!authStore.isSubscribed) {
            showModal.value = true;
            throw new Error();
        }

        if (!isVerified) {
            throw new Error("Vous devez être vérifié");
        }

        const res = await PropositionService.createProposition(
            project.value.id
        );
        if (res) {
            alreadyApplied.value = true;
            displayMsg({
                msg: "Positionnement sur l'offre effectué",
                type: "success",
            });
        } else {
            throw new Error("Une erreur est survenue");
        }
    } catch (e) {
        if(e.message && e.message !== ""){
            console.error(e.message);
            displayMsg({ msg: e.message, type: "error" });
        }
    }finally{
        applicationLoading.value = false;
    }
    applicationLoading.value = false;
};

onMounted(async () => {
    const res = await ProjectService.getProject(route.params.id);
    if (!res) {
        router.push({ name: "offers" });
    }

    if (authStore.isSubscribed) {
        const application = await PropositionService.getSelfPropositionOfProject(route.params.id);
        if (application && application?.proposition?.id) {
            alreadyApplied.value = true;
        }
    }

    project.value = res;
    loading.value = false;
});
</script>

<template>
    <main v-if="loading" class="container">Loading...</main>
    <main v-else class="offer">
        <div class="container">
            <section class="offer__header">
                <RouterLink :to="{ name: 'offers' }" class="offer__header__link"
                    >⬅️ revenir aux offres</RouterLink
                >
            </section>
            <section class="offer__content">
                <Offer :data="project" />
            </section>
            <section>
                <span v-if="applicationLoading"> ... </span>
                <OfferApply
                    v-else-if="!alreadyApplied"
                    :handleClick="() => handleApplication()"
                />
                <span v-else
                    >Vous vous êtes déjà postionné sur cette offre</span
                >
            </section>
        </div>
        <PremiumModal :close="() => (showModal = false)" v-show="showModal" />
    </main>
</template>

<style lang="scss" scoped>
.offer {
    &__header {
        padding: 2rem 0;

        &__link {
            color: var(--text-gray);
            text-decoration: none;
        }
    }

    &__content {
        margin-bottom: 3rem;
    }
}
</style>
