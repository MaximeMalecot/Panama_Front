<script setup>
import { watch, onMounted, reactive } from "vue";
import { useOffersStore } from "@/stores/offers";
import { useRouter, useRoute } from "vue-router";
import OffersFilter from "@/views/Offers/OffersFilter.vue";
import OfferCard from "@/components/Offers/OfferCard.vue";
import Pagination from "@/components/common/Pagination.vue";
import useOffers from "../../hooks/use-offers";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { displayMsg } from "@/utils/toast";
import { ROLES } from "@/constants/roles";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const offersStore = useOffers();
const { offers, offersLoading, offersCount } = storeToRefs(offersStore);

const filters = reactive({
    technos: "",
    priceRange: "",
    timeRange: "",
    title: "",
});

const filterOnSubmit = () => {
    const val = filters;
    const params = Object.entries(val)
        .filter(([key, value]) => value.trim().length > 0)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    router.push({
        query: params,
    });
    offersStore.fetchOffers({ filters: filters.technos });
};

const resetFilters = () => {
    filters.technos = "";
    filters.priceRange = "";
    filters.timeRange = "";
    filters.title = "";
    router.push({
        query: {},
    });
    offersStore.fetchOffers({ filters: filters.technos });
};

const handleClick = (id) => {
    try {
        if (!authStore.isConnected) {
            throw new Error(
                "Vous devez être connecté pour accéder à cette page"
            );
            //router.push({ name: 'login' });
        }
        const { roles } = authStore.userData;
        if (
            !roles.includes(ROLES.FREELANCER_PREMIUM) &&
            !roles.includes(ROLES.FREELANCER)
        ) {
            throw new Error(
                "Seuls les freelancers sont en mesure de consulter les offres"
            );
        }

        router.push({ name: "offer", params: { id } });
    } catch (e) {
        displayMsg({ msg: e.message, type: "info" });
    }
};

onMounted(() => {
    const { query } = route;
    const { technos, priceRange, timeRange, title } = query;
    if (technos) filters.technos = technos;
    if (priceRange) filters.priceRange = priceRange;
    if (timeRange) filters.timeRange = timeRange;
    if (title) filters.title = title;
    offersStore.fetchOffers({ filters: filters.technos });
});
</script>

<template>
    <main class="offers">
        <section class="filters">
            <OffersFilter
                :filters="filters"
                :onClick="filterOnSubmit"
                :reset="resetFilters"
            />
        </section>
        <section class="header">
            <h2>{{ offersCount }} offres disponibles</h2>
        </section>
        <section v-if="offersLoading" class="results">
            <p>Loading...</p>
        </section>
        <section v-else-if="offersCount == 0" class="results">
            <p>Aucun résultat</p>
        </section>
        <section v-else class="results">
            <div class="results__list">
                <OfferCard
                    v-for="offer in offers"
                    :offerData="offer"
                    @click="() => handleClick(offer.id)"
                ></OfferCard>
            </div>
            <div class="results__pagination">
                <Pagination :currentPage="1" :totalItemCount="offersCount" />
            </div>
        </section>
    </main>
</template>

<style lang="scss" scope>
.offers {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 0px;
    grid-template-areas:
        ". header"
        "filters results";
    padding: 1rem;
}

.filters {
    grid-area: filters;
}

.header {
    grid-area: header;
}

.results {
    grid-area: results;
    &__list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
    }
    &__pagination {
        display: flex;
        justify-content: center;
        padding: 2rem 0;
    }
}
</style>
