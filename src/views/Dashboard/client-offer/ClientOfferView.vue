<script setup>
import useClientProjects from "../../../hooks/use-client-projects";
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import FilterItem from "@/components/common/FilterItem.vue";
import SearchFilters from "./SearchFilters.vue";
import Input from "@/components/common/InputField.vue";
import Btn from "../../../components/common/Btn.vue";
import { PROPOSITION_STATUS } from "@/constants/status.js";

const router = useRouter();
const route = useRoute();
const ProjectStore = useClientProjects();
const { project, loading, propositions } = storeToRefs(ProjectStore);

onMounted(async () => {
    if (!route.params.id) {
        router.push({ name: "dashboard-offers" });
    }
    const res = await ProjectStore.fetchProject(route.params.id);
    if (!res) {
        router.push({ name: "dashboard-offers" });
    }
    ProjectStore.fetchProjectPropositions(route.params.id);
});

const removeFilter = (payload) => {
    const id = payload["@id"];
    const tags = project.value.filters;
    const newTags = tags.filter((t) => t["@id"] !== id);
    project.value.filters = newTags;
};

const addFilter = (tagToAdd) => {
    if (project.value.filters.find((t) => t["@id"] === tagToAdd["@id"])) return;
    const tags = project.value.filters;
    project.value.filters = [...tags, tagToAdd];
};

const handleAction = (id, status) => {
    ProjectStore.repondToProposition(id, status).then(() => {
        ProjectStore.fetchProjectPropositions(route.params.id);
    });
};
</script>

<template>
    <div class="client_offer">
        <section class="offer__header">
            <RouterLink
                :to="{ name: 'dashboard-offers' }"
                class="offer__header__link"
                >⬅️ revenir aux projets
            </RouterLink>
        </section>
        <section v-if="loading || !project.id">Loading...</section>
        <section v-else class="offer_content">
            <h2>Informations concernant l'offre</h2>
            <Input
                type="text"
                placeholder="Titre du projet"
                v-model="project.name"
            />
            <textarea>{{ project.description }}</textarea>
            <div class="filters">
                <div v-if="(project?.filters).length > 0" class="filters_items">
                    <FilterItem
                        v-for="(tag, index) in project.filters"
                        :key="index"
                        :data="tag"
                        :id="index"
                        :onClick="removeFilter"
                    />
                </div>
                <p v-else>No filter</p>
                <SearchFilters :addFilter="addFilter" />
            </div>
            <Btn @click="ProjectStore.updateProject(project)">Update</Btn>
        </section>
        <section v-if="!loading" class="offer_propositions">
            <h2>Propositions reçues</h2>
            <div class="propositions_list" v-if="propositions.length > 0">
                <div
                    class="propositions_item"
                    v-for="(proposition, index) in propositions"
                    :key="index"
                >
                    <p>
                        From {{ proposition.freelancer?.surname }}
                        {{ proposition.freelancer?.name }}
                    </p>
                    <div
                        class="actions"
                        v-if="
                            proposition.status === PROPOSITION_STATUS.AWAITING
                        "
                    >
                        <Btn
                            :outline="true"
                            @click="
                                () =>
                                    handleAction(
                                        proposition.id,
                                        PROPOSITION_STATUS.ACCEPTED
                                    )
                            "
                            >Accept</Btn
                        >
                        <Btn
                            @click="
                                () =>
                                    handleAction(
                                        proposition.id,
                                        PROPOSITION_STATUS.REFUSED
                                    )
                            "
                            >Refuse</Btn
                        >
                    </div>
                    <div
                        class="actions"
                        v-else-if="
                            proposition.status === PROPOSITION_STATUS.ACCEPTED
                        "
                    >
                        <Btn>PROPOSITION ACCEPTEE</Btn>
                    </div>
                    <div
                        class="actions"
                        v-else-if="
                            proposition.status === PROPOSITION_STATUS.REFUSED
                        "
                    >
                        <Btn>PROPOSITION REFUSEE</Btn>
                    </div>
                </div>
            </div>
            <p v-else>No proposition</p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.client_offer {
    display: flex;
    flex-direction: column;

    .offer_content {
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #a9a9a9;
        gap: 10px;

        .filters {
            display: flex;
            flex-direction: column;

            .filters_items {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                .filter_item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border: 1px solid #000;
                    border-radius: 5px;
                }
            }
        }
    }

    .offer_propositions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .propositions_list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            .propositions_item {
                border: 1px solid var(--text-gray);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;

                .actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
            }
        }
    }
}
</style>
