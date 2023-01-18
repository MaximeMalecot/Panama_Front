<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { displayMsg } from "@/utils/toast";

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: ''
});

const onSubmit = async () => {
    const { email, password } = formData;
    if (!email) {
        console.error("Missing email");
        displayMsg({ msg: "Veuillez saisir une adresse e-mail", type: "error" });
        return;
    }

    if (!password) {
        console.error("Missing password");
        displayMsg({ msg: "Veuillez saisir un mot de passe", type: "error" });
        return;
    }

    const res = await store.login(formData.email, formData.password);
    if (res === true) {
        displayMsg({ msg: "Connexion réussie", type: "success" });
    } else {
        displayMsg({ msg: "Une erreur est survenue", type: "error" });
    }
}

</script>

<template>
    <div class="auth">
        <form @submit.prevent="onSubmit">
            <input name="email" placeholder="Addresse e-mail" type="text" v-model="formData.email" />
            <input name="password" placeholder="Mot de passe" type="password" v-model="formData.password" />
            <button type="submit">Se connecter</button>
        </form>
        <div>
            <a href="">Mot de passe oublié</a>
            <a href="">Pas de compte? S'inscrire</a>
        </div>
    </div>
</template>

<style scoped>

</style>