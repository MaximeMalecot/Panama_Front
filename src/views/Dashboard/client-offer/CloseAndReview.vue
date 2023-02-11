<script setup>
import Btn from "@/components/common/Btn.vue";
import { watch, ref, computed, onMounted } from "vue";
import ProjectService from "@/services/project.service.js";
import { PROJECT_STATUS } from "@/constants/status.js";
import InputWithCounter from "../../../components/common/InputWithCounter.vue";

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
const reviewForm = ref({
    rating: 0,
    comment: "",
});

const closeProject = async () => {
    loading.value = true;
    const res = await ProjectService.closeProject(props.project.id);
    props.project.status = "CLOSED";
    if (res) {
        props.project.status = PROJECT_STATUS.ENDED;
    }
    loading.value = false;
};

const publishReview = async () => {
    loading.value = true;
    console.log(reviewForm.value);
    if (reviewForm.value.rating < 0 || reviewForm.value.rating > 5) {
        alert("La note doit être comprise entre 0 et 5");
        return;
    }

    if (reviewForm.value.comment.length > MAX_COMMENT_LENGTH) {
        alert(
            `Le commentaire ne doit pas dépasser ${MAX_COMMENT_LENGTH} caractères`
        );
        return;
    }


    // const res = await ProjectService.publishReview(props.project.id);
    // if (res) {
    //     props.project.status = PROJECT_STATUS.REVIEWED;
    // }
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
    <section class="review_part">
        <h2>Laisser un avis concernant votre prestataire</h2>
        <p>
            Laissez une note et un commentaire concernant
            <b>{{ freelancer?.surname }}</b>.
            Comment avez-vous vécu votre expérience avec lui ?
        </p>
        <div class="freelancer_part">
            <div class="freelancer_part__img">
                <img :src="freelancer?.avatar" alt="freelancer avatar" />
            </div>
            <span>{{ freelancer?.surname }} {{ freelancer?.name }}</span>
        </div>
        <form class="review_form" @submit.prevent="publishReview">
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="0"
                    max="5"
                    placeholder="Note sur 5"
                    v-model="reviewForm.rating"
                />
                <!-- <InputWithCounter :max-length="MAX_COMMENT_LENGTH" :value="reviewForm.comment">
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Laissez un commentaire concernant le freelancer"
                        :maxlength="MAX_COMMENT_LENGTH"
                        v-model="reviewForm.comment"
                    />
                </InputWithCounter> -->
                <InputWithCounter :type="'input'" :maxLength="MAX_COMMENT_LENGTH" v-model="reviewForm.comment"/>
                <Btn :type="'submit'" value="Envoyer">Envoyer</Btn>
        </form>
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

    .review_form{
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: 1rem 0;
    }
}
</style>
