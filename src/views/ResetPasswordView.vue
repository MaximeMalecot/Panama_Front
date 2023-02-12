<script setup>
import { ref, onMounted, computed } from "vue";
import authService from "@/services/auth.service";
import Btn from "@/components/common/Btn.vue";
import Input from "@/components/common/InputField.vue";
import { displayMsg } from "@/utils/toast";

const email = ref("");

const resetPassword = async() => {
    if(!email.value) return;
    try {
        const res = await authService.forgotPassword({email: email.value});
        if (res === true) {
            displayMsg({ msg: "Un email de réinitialisation de mot de passe vous a été envoyé", type: "success" });
        } else {
            displayMsg({ msg: "Votre mail n'a pas été trouvé", type: "error" });
        }
    } catch (e) {
        console.error(e);
    }
}

</script>
<template>
    <div class="container">
        <h1>Reset password</h1>
        <section class="form">
            <p>Enter your email</p>
            <Input v-model="email" type="email" />
            <div class="actions">
                <Btn @click="resetPassword">Reset password</Btn>
            </div>
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