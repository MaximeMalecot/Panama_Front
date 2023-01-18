<script setup>
import { ref } from 'vue';
import SelectField from '@/components/common/SelectField.vue';
import Btn from '@/components/common/Btn.vue';
import InputField from '../../components/common/InputField.vue';

const title = ref('')
const technos = ref('')
const priceRange = ref('')
const timeRange = ref('')
</script>

<template>
    <div class="offers-filter">
        <div class="offers-filter__fields">
            <InputField v-model="title" placeholder="📋 Titre de l'offre"/>
            <SelectField v-model="technos" placeholder="🧑‍💻 Technologie" :values="[
                { name: 'PHP', value: 'php' },
                { name: 'Javascript', value: 'javascript' },
                { name: 'HTML/CSS', value: 'html-css' },
                { name: 'C#', value: 'csharp' },
                { name: '.NET', value: 'dotnet' },
                { name: 'Shopify', value: 'shopify' },
                { name: 'Wordpress', value: 'wordpress' },
            ]" />
            <SelectField v-model="priceRange" placeholder="💵 Prix" :values="[
                { name: '< 5.000€', value: 'lt5000' },
                { name: '> 5.000€ et < 10.000€', value: 'gt5000&&lt10000' },
                { name: '> 10.000€', value: 'gt10000' },
            ]" />
            <SelectField v-model="timeRange" placeholder="⌛ Durée" :values="[
                { name: '< 1 mois', value: 'lt1' },
                { name: '1 mois', value: '1' },
                { name: '2 mois', value: '2' },
                { name: '3 mois', value: '3' },
                { name: '4 mois', value: '4' },
                { name: '5 mois', value: '5' },
                { name: '6 mois', value: '6' },
                { name: '> 6 mois', value: 'gt6' },
            ]" />
        </div>
        <div class="offers-filter__footer">
            <Btn>Chercher parmis nos offres</Btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.offers-filter {
    width: 450px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-1);
    padding: 1rem;

    &__fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;

        &__link {
            color: var(--text-gray);
            text-decoration: none;
        }
    }
}
</style>