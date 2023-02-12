<script setup>
import Btn from '../components/common/Btn.vue';
</script>

<template>
    <div class="container">
        <h2>Bienvenue sur le site Panama</h2>
        <p>Sur ce site vous pourrez agir, soit en tant que client, soit en tant que freelancer, alors inscrivez-vous avez le bon rôle</p>
        <div class="actions">
            <Btn type="link" :to="{ name: 'signup', query: { role: 'client' } }" outline>S'inscrire en tant que client</Btn>
            <Btn type="link" :to="{ name: 'signup', query: { role: 'freelancer'} }">S'inscrire en tant que freelancer</Btn>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
.actions{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>