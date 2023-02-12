<script setup>
import { PROPOSITION_STATUS } from "@/constants/status.js";
import Btn from "../../../components/common/Btn.vue";
import { ref } from "vue";
import FreelancerModal from "@/components/FreelancerModal/FreelancerModal.vue";

const props = defineProps({
    propositions: {
        type: Array,
        required: true,
    },
    handleAction: {
        type: Function,
        required: true,
    },
});

const showProfilModal = ref(false);
const selectedFreelancer = ref(null);

const selectFreelancer = id => {
    console.log(id)
    selectFreelancer.value = id;
    showProfilModal.value = true;
}

</script>

<template>
    <section class="offer_propositions">
        <h2>Propositions reçues</h2>
        <div class="propositions_list" v-if="propositions.length > 0">
            <div
                class="propositions_item"
                v-for="(proposition, index) in propositions"
                :key="index"
            >
                <p>
                    From {{ proposition.freelancer?.surname }} {{ proposition.freelancer?.name }}
                </p>
                <button @click="() => selectFreelancer(proposition.freelancer.id)">Voir le profil</button>
                <div
                    class="actions"
                    v-if="proposition.status === PROPOSITION_STATUS.AWAITING"
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
                    <Btn :outline="true">PROPOSITION ACCEPTEE</Btn>
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
    <FreelancerModal :close="() => showProfilModal = false" v-show="showProfilModal" :freelancer="selectedFreelancer" />
</template>

<style lang="scss" scoped>
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
</style>
