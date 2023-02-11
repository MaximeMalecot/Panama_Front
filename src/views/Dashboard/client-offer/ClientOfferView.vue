<script setup>
import useClientProjects from "../../../hooks/use-client-projects";
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import Btn from "../../../components/common/Btn.vue";
import { PROPOSITION_STATUS } from "@/constants/status.js";
import ProjectPart from "./ProjectPart.vue";
import PropositionsPart from "./PropositionsPart.vue";

const router = useRouter();
const route = useRoute();
const ProjectStore = useClientProjects();
const { project, loading, propositions } = storeToRefs(ProjectStore);

onMounted(async () => {
    // if (!route.params.id) {
    //     router.push({ name: "dashboard-offers" });
    // }
    // const res = await ProjectStore.fetchProject(route.params.id);
    if (!route.params.id) {
        router.push({ name: "dashboard-offers" });
    }
    ProjectStore.fetchProjectWithPropositions(route.params.id);
});

const handleAction = (id, status) => {
    ProjectStore.repondToProposition(id, status).then(() => {
        ProjectStore.fetchProjectWithPropositions(route.params.id);
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
        <section v-else>
            <ProjectPart :project="project" :updateProject="(id, payload) => ProjectStore.updateProject(id, payload)"/>
            <PropositionsPart
                :propositions="propositions"
                :handleAction="handleAction"
            />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.client_offer {
    display: flex;
    flex-direction: column;

}
</style>
