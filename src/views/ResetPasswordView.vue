<script setup>
import { ref, onMounted, computed } from "vue";
import userService from "@/services/user.service";
import Btn from "@/components/common/Btn.vue";
import Input from "@/components/common/InputField.vue";

const resetPassword = async() => {
    
}

</script>
<template>
    <div>
        <h1>Reset password</h1>
        <section v-if="error">
            <p>{{ error }}</p>
        </section>
        <section v-else>
            <p>Enter your email</p>
            <Input v-model="email" type="email" />
            <Btn @click="resetPassword">Reset password</Btn>
        </section>
    </div>
</template>