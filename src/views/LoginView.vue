<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: ''
});

const onSubmit = () => {
    const { email, password } = formData;
    if (!email) {
        console.error("Missing email")
        return;
    }

    if (!password) {
        console.error("Missing password")
        return;
    }

    store.login(formData.email, formData.password);
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