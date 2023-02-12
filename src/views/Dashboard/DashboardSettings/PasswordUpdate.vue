<script setup>
import { ref } from "vue";
import Input from "@/components/common/InputField.vue";
import Btn from "@/components/common/Btn.vue";
import { displayMsg } from "@/utils/toast";
import userService from "@/services/user.service";

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
})

const plainPassword = ref("");
const oldPassword = ref("");

const updatePassword = async () => {
    let res = await userService.modifyPwd(props.id, {
        plainPassword: plainPassword.value,
        oldPassword: oldPassword.value,
    });
    if(res){
        displayMsg({ msg: "Password update", type: "success" });
        plainPassword.value = "";
        oldPassword.value = "";
        return;
    } else {
        displayMsg({ msg: "Old password not recognized", type: "error" });
    }
}

</script>
<template>
    <div class="content">
        <p>Pour mettre à jour votre mot de passe :</p>
        <p>Ancien mot de passe</p>
        <Input v-model="oldPassword" type="password" label="Ancien mot de passe" />
        <p>Nouveau mot de passe</p>
        <Input v-model="plainPassword" type="password" label="Nouveau mot de passe" />
        <Btn @click="updatePassword">Update pwd</Btn>
    </div>
</template>
<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>