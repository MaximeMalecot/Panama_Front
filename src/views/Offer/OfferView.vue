<script setup>
import { reactive, ref, onMounted } from 'vue';
import OfferApply from '@/components/Offers/OfferApply.vue';
import Offer from '@/components/Offers/Offer.vue';
import ProjectService from "@/services/project.service";
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import {ROLES} from "@/constants/roles";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const data = reactive({
    "title": "Conception d'un site avec Shopify",
    "tags": ["python", "htmlcss"],
    "time": 1,
    "price": 800,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});

const project = ref({});
const loading = ref(true);

onMounted(async () => {
    const res = await ProjectService.getProject(route.params.id);
    if (!res){
        router.push({ name: 'offers' });
    }
    project.value = res;
    loading.value = false;
});

const handleApplication = () => {
    console.log(authStore.userData);
    if(!authStore.isConnected){
        console.log("you must be logged in");
        router.push({ name: 'login' });
        return;
        //router.push({ name: 'login' });
    }
    const { roles, isVerified } = authStore.userData;
    
    if( !roles.includes(ROLES.FREELANCER_PREMIUM) ){
        console.log("you must be premium")
        return;
        //router.push({ name: 'login' });
    }

    if( !isVerified ){
        console.log("you must be verified")
        return;
        //router.push({ name: 'login' });
    }
    
    console.log('handleApplication');
}

</script>

<template>
    <main v-if="loading"  class="container">
        Loading...
    </main>
    <main v-else class="offer">
        <div class="container">
            <section class="offer__header">
                <RouterLink :to="{ name: 'offers' }" class="offer__header__link">⬅️ revenir aux offres</RouterLink>
            </section>
            <section class="offer__content">
                <Offer :data="project" />
            </section>
            <section>
                <OfferApply :handleClick="() => handleApplication()" />
            </section>
        </div>
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