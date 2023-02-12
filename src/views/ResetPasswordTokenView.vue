<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import userService from "@/services/user.service";
import Btn from "@/components/common/Btn.vue";
import Input from "@/components/common/InputField.vue";
import { displayMsg } from "@/utils/toast";

const router = useRouter();
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
        displayMsg({ msg: "User not found or invalid token", type: "error" });
    }
}
</script>

<template>
    <div class="container">
        <h1>Reset password</h1>
        <section class="form">
            <p>New password</p>
            <Input v-model="password" type="password" />
            <Btn @click="() => resetPassword()">Reset password</Btn>
        </section>
    </div>
</template>
<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    border: 1px solid var(--border);
    box-sizing: border-box;
    padding: 0 20px;
    .form{
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .actions{
        display: flex;
        justify-content: center;
    }
}
</style>