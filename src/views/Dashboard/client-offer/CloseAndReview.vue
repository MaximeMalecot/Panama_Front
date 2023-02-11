<script setup>
import Btn from "@/components/common/Btn.vue";
import { watch, ref, computed, onMounted } from "vue";
import ProjectService from "@/services/project.service.js";
import ReviewService from "@/services/review.service.js";
import { PROJECT_STATUS } from "@/constants/status.js";
import InputWithCounter from "../../../components/common/InputWithCounter.vue";
import ReviewModal from "@/components/ReviewModal/ReviewModal.vue";
const MAX_COMMENT_LENGTH = 255;

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    freelancer: {
        type: Object,
        required: true,
    },
});

const loading = ref(false);
const showModal = ref(true);

const closeProject = async () => {
    loading.value = true;
    const res = await ProjectService.closeProject(props.project.id);
    props.project.status = "CLOSED";
    if (res) {
        props.project.status = PROJECT_STATUS.ENDED;
    }
    loading.value = false;
};

onMounted(() => {
    console.log(props.freelancer);
});
</script>

<template>
    <section
        class="close_project"
        v-if="project.status === PROJECT_STATUS.IN_PROGRES"
    >
        <h2>Projet terminé?</h2>
        <p>
            Le projet est terminé ?<br />Vous pouvez maintenant le cloturer et
            le noter.
        </p>
        <Btn v-if="!loading" @click="closeProject">Cloturer le projet</Btn>
        <Btn v-else disabled>...</Btn>
    </section>
    <ReviewModal v-if="showModal" :freelancer="freelancer" :project="project" :close="() => showModal = false"/>
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

.review_part {
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    width: 70%;
    padding: 1rem;

    .freelancer_part {
        display: flex;
        align-items: center;

        .freelancer_part__img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1rem;
            background-color: gray;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .review_form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 0;
    }
}
</style>
