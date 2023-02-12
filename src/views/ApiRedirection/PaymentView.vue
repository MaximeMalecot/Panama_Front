<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const isSuccessful = computed(() => {
    return route.query.success === "true";
});

</script>

<template>
    <div v-if="isSuccessful">
        <div class="container">
            <h1>Payment réussi !</h1>
            <p>Votre paiement a bien été accepté, votre offre de projet devrait être visible sur la plateforme dans quelques minutes.</p>
            <p>Si après plusieurs minutes ce n'est toujours pas le cas, contactez-nous.</p>
        </div>
        </div>
    <div v-else>
        <div class="container">
            <h1>Payment échoué</h1>
            <p>Une erreur est survenue durant le paiement des frais de publication de votre projet.</p>
            <p>Attendez quelques minutes avant de recommencer.</p>
            <p>En cas de problèmes persistant, contactez votre banque.</p>
        </div>

    </div>
</template>