<script setup>
import { ref } from "vue";
import SelectField from "@/components/common/SelectField.vue";
import Btn from "@/components/common/Btn.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const technos = ref("");
const priceRange = ref("");

const handleClick = () => {
    const query = {};
    if (technos.value) query.technos = technos.value;
    if (priceRange.value) query.priceRange = priceRange.value;

    router.push({
        name: "offers",
        query
    });
};

</script>

<template>
    <div class="offer-form">
        <div class="offer-form__fields">
            <SelectField
                v-model="technos"
                placeholder="🧑‍💻 Technologie"
                :values="[
                    { name: 'PHP', value: 'php' },
                    { name: 'Javascript', value: 'javascript' },
                    { name: 'HTML/CSS', value: 'html-css' },
                    { name: 'C#', value: 'csharp' },
                    { name: '.NET', value: 'dotnet' },
                    { name: 'Shopify', value: 'shopify' },
                    { name: 'Wordpress', value: 'wordpress' },
                ]"
            />
            <SelectField
                v-model="priceRange"
                placeholder="💵 Prix"
                :values="[
                    { name: '< 5.000€', value: 'lt5000' },
                    { name: '> 5.000€ et < 10.000€', value: 'gt5000&&lt10000' },
                    { name: '> 10.000€', value: 'gt10000' },
                ]"
            />
        </div>
        <div class="offer-form__footer">
            <RouterLink class="offer-form__footer__link" :to="{ name: 'home' }"
                >Déposer une offre</RouterLink
            >
            <Btn @click="handleClick">Chercher parmis nos offres</Btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.offer-form {
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
