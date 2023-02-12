<script setup>
import { ref, onMounted, computed } from "vue";
import Offer from "@/components/Offers/Offer.vue";
import ProjectService from "@/services/project.service";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const project = ref({});
const loading = ref(true);
const clientInfo = computed(() => {
    if (!project.value.owner) return null;
    return project.value.owner;
});

onMounted(() => {
    loading.value = true;
    ProjectService.getFullProject(id).then((res) => {
        if (res) {
            project.value = res;
            loading.value = false;
        }
    });
});
</script>

<template>
    <main class="offer">
        <section class="offer__header">
            <RouterLink
                :to="{ name: 'dashboard-projects' }"
                class="offer__header__link"
                >⬅️ revenir aux projets</RouterLink
            >
        </section>
        <template v-if="loading">
            <p>Loading...</p>
        </template>
        <template v-else>
            <section class="offer__content">
                <Offer :data="project" />
                <hr />
                <div v-if="clientInfo?.id" class="offer_client">
                    <h2>Informations client</h2>
                    <div class="content">
                        <h3>{{ clientInfo.name }} {{ clientInfo.surname }}</h3>
                        <p>
                            <b>{{ clientInfo.email }}</b>
                        </p>
                        <p>
                            {{ clientInfo.clientInfo.address }} |
                            {{ clientInfo.clientInfo.city }}
                        </p>
                        <p>{{ clientInfo.clientInfo.phoneNb }}</p>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>

<style lang="scss" scoped>
.offer {
    &__header {
        padding-bottom: 2rem;

        &__link {
            color: var(--text-gray);
            text-decoration: none;
        }
    }

    &__content {
        margin-bottom: 3rem;
    }

    .offer_client{

        .content{
            padding: 1rem;
            width: fit-content;
            border: 1px solid gray;
        }
    }
}
</style>
