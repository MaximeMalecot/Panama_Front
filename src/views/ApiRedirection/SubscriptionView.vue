<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const route = useRoute();
const authStore = useAuthStore();

const isSuccessful = computed(() => {
    return route.query.success === "true";
});

// watch(isSuccessful, (newVal) => {
//     // if (newVal) {
//     //     authStore.setRole("freelancer_premium");
//     // }
//     console.log("newVal")
// });

onMounted(() => {
    if (isSuccessful.value) {
        authStore.logout(false);
    }
});

</script>

<template>
    <div v-if="isSuccessful">
        <div class="container">
            <h1>Abonnement réussi !</h1>
            <p>Votre abonnement a bien été pris en compte, votre compte devrait passer en FREELANCER PREMIUM d'ici quelques instants.</p>
            <p>Pour profiter de ce changement, vous allez devoir vous reconnecter.</p>
            <p>Si après plusieurs minutes ce n'est toujours pas le cas, contactez-nous.</p>
        </div>
        </div>
    <div v-else>
        <div class="container">
            <h1>Abonnement échoué</h1>
            <p>Une erreur est survenue durant l'abonnement de votre compte.</p>
            <p>Attendez quelques minutes avant de recommencer.</p>
            <p>En cas de problèmes persistant, contactez votre banque.</p>
        </div>

    </div>
</template>