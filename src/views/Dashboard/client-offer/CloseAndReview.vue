<script setup>
import Btn from "@/components/common/Btn.vue";
import { watch, ref } from "vue";
import ProjectService from "@/services/project.service.js";
import { PROJECT_STATUS } from "@/constants/status.js";

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});

const loading = ref(false);

const closeProject = async () => {
    loading.value = true;
    const res = await ProjectService.closeProject(props.project.id);
    props.project.status = "CLOSED";
    if (res) {
        props.project.status = PROJECT_STATUS.ENDED;
    }
    loading.value = false;
};

</script>

<template>
    <section class="close_project">
        <h2>Projet terminé?</h2>
        <p>
            Le projet est terminé ?<br/>Vous pouvez maintenant le cloturer et le noter.
        </p>
        <Btn v-if="!loading" @click="closeProject">Cloturer le projet</Btn>
        <Btn v-else disabled>...</Btn>
    </section>
</template>

<style lang="scss" scoped>
.close_project {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-top: 1rem;
    h2 {
        margin-bottom: 1rem;
    }
    p {
        margin-bottom: 1rem;
        text-align: center;
    }
}
</style>