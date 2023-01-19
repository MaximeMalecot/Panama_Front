<script setup>
import { onMounted } from 'vue';
import Input from '@/components/common/InputField.vue';

const props = defineProps({
    formData: Object
});

</script>

<template>
    <div class="step_1">
        <div class="header">
            <h3>Présentation de votre projet</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit obcaecati accusamus vero fugiat, animi
                facere
                odio, sequi dignissimos earum, dicta incidunt nostrum deserunt atque mollitia! Quia neque consequuntur
                accusantium rem?</p>
        </div>
        <div class="content">
            <Input type="text" placeholder="L'intitulé de votre projet" v-model="formData.title" />
            <textarea placeholder="Quel est la mission ? Détaillez autant que possible"
                v-model="formData.description" />
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.step_1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 10px;

    .header {
        display: flex;
        flex-direction: column;

        h3{
            margin: 0;
            padding: 0;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 10px;

        textarea {
            background: var(--background);
            border: none;
            border-radius: var(--radius-2);
            padding: .5rem 1rem;
            font-size: 1rem;
            font-family: inherit;
            resize: none;
        }
    }


}
</style>