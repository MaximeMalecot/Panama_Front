<script setup>
import { ref, onMounted, computed } from "vue";
import userService from "@/services/user.service";

const submitted = ref(false);
const ciret_input = ref("");
const CIRET_MAX_LENGTH = 9;

const submitKYC = async () => {
    try {
        if (
            ciret_input.value.length > CIRET_MAX_LENGTH ||
            ciret_input.value.length < CIRET_MAX_LENGTH
        ) {
            throw new Error(`Ciret must be ${CIRET_MAX_LENGTH} digits long`);
        }
        if (isNaN(ciret_input.value))
            throw new Error(
                `Ciret must be a number, received ${typeof ciret_input.value}`
            );

        const res = await userService.submitKYC(ciret_input.value);
        if (res) {
            submitted.value = true;
        }
    } catch (e) {
        console.error(e);
    }
};
</script>

<template>
    <div class="kyc_part" v-if="!submitted">
        <h3>KYC</h3>
        <p>
            Afin de nous assurer que vous êtes réellement un freelancer, nous
            vous demandons de prouver votre status en passant par un service
            externe de verification d'identité (KYC).
        </p>
        <form @submit.prevent="submitKYC">
            <label>Numéro Ciret</label>
            <input
                v-on:keydown.enter.prevent
                type="text"
                v-model="ciret_input"
                :maxlength="CIRET_MAX_LENGTH"
            />
            <button type="submit">Update</button>
        </form>
    </div>
    <div class="kyc_part" v-else>KYC SUBMITED</div>
</template>
