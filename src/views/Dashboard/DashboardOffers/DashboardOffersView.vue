<script setup>
import { useOffersStore } from '@/stores/offers'
import { useRouter } from 'vue-router';
import OfferCard from '@/components/Offers/OfferCard.vue';
import NoResults from '@/components/NoResults.vue';
import useClientProjects from '../../../hooks/use-client-projects';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const ProjectStore = useClientProjects();
const router = useRouter();
const { projects } = storeToRefs(ProjectStore);

onMounted(() => {
    ProjectStore.fetchAllProjects();
});

</script>

<template>
    <main class="offers">
        <h1 class="offers__title">Offres</h1>
        <p>Vous retrouverez ici toutes les offres que vous avez posté.</p>
        <div v-if="projects.length > 0" class="offers__list">
            <OfferCard v-for="project in projects" :offerData="project" status="inprogress" hasLink
                customLinkText="Voir l'offre" @click="router.push({ name: 'offer', params: { id: 1 } })"></OfferCard>
        </div>
        <div v-else class="offers__no-results">
            <NoResults>Vous n'avez publié aucune offre dernièrement.</NoResults>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.offers {
    &__title {
        font-size: 2rem;
        margin: 0;
    }

    &__subtitle {
        font-size: 1.5rem;
        margin: 2rem 0 1rem 0;
        font-weight: 600;
    }

    &__list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
    }

    &__no-results {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }
}
</style>