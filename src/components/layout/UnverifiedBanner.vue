<script setup>
import { ref, watch, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { ROLES } from "@/constants/roles.js";

const authStore = useAuthStore();
const showBanner = computed(() => {
    console.log(authStore.userData)
    if (!authStore.userData) return false;
    if (!authStore.userData.roles.includes(ROLES.FREELANCER)) return false;
    return !(authStore.userData?.isInfoVerified)
});
</script>

<template>
    <div v-if="showBanner" class="banner">
        <div class="content container">
            <h3>Votre compte n'est pas encore vérifié</h3>
            <div class="sub_text">
                <p>
                    Sans cela, vous ne serez en mesure de vous positionner sur
                    la moindre offre
                </p>
                <p>
                    Rendez-vous dans la partie
                    <RouterLink :to="{ name: 'dashboard-settings' }"
                        >Paramètres</RouterLink
                    >
                    de votre Dashboard pour saisir votre numéro CIRET
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.banner {
    width: 100%;
    background-color: #ea884e;
    padding: 1.4rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    .content {
        * {
            color: white;
            margin: 0;
            padding: 0;
        }

        .sub_text {
            font-size: 14px;
        }
    }
}
</style>
