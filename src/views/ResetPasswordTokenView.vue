<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import userService from "@/services/user.service";
import Btn from "@/components/common/Btn.vue";
import Input from "@/components/common/InputField.vue";
import { displayMsg } from "@/utils/toast";

const route = useRoute();
const token = route.params.token;
const loading = ref(true);
const error = ref("");
const password = ref("");

const resetPassword = async () => {
    loading.value = true;
    const res = await userService.resetPassword({token, password: password.value});
    if (res) {
        loading.value = false;
        displayMsg({ msg: "Mot de passe mis à jour !", type: "success" });
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 2000);
    }else{
        loading.value = false;
        error.value = "User not found or invalid token";
    }
}
</script>

<template>
    <div>
        <h1>Reset password</h1>
        <section v-if="error">
            <p>{{ error }}</p>
        </section>
        <section v-else>
            <p>New password</p>
            <Input v-model="password" type="password" />
            <Btn @click="resetPassword">Reset password</Btn>
        </section>
    </div>
</template>