<script setup>
import { ref } from 'vue';
import InputField from '@/components/common/InputField.vue';
import SelectField from '@/components/common/SelectField.vue';

const input = ref('')
const select = ref('')
</script>

<template>
  <main>
    <div class="container">
      <h1>Trouvez un projet qui correspond à vos besoin</h1>
      <InputField v-model="input"/>
      <SelectField v-model="select" placeholder="💵 Prix" :values="[
        { name: '< 5.000€', value: 'lt5000'},
        { name: '> 5.000€ et < 10.000€', value: 'gt5000&&lt10000'},
        { name: '> 10.000€', value: 'gt10000'},
        ]"/>
    </div>
  </main>
</template>
