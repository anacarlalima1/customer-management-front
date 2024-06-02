<template>
  <v-container>
    <div class="mt-15">
      <form @submit.prevent="submit">
        <v-select
            label="Tipos"
            :items="types"
            v-model="selectedType"
            rounded
            variant="outlined"
        ></v-select>
        <v-text-field label="CEP" v-model="cep" variant="outlined" clearable rounded/>
        <v-text-field label="Rua" v-model="street" variant="outlined" clearable rounded/>
        <v-text-field label="Número" v-model="number" variant="outlined" clearable rounded/>
        <v-text-field label="Complemento" v-model="complement" variant="outlined" clearable rounded/>
        <v-text-field label="Distrito" v-model="district" variant="outlined" clearable rounded/>
        <v-text-field label="Estado" v-model="state" variant="outlined" clearable rounded/>
        <v-text-field label="Cidade" v-model="city" variant="outlined" clearable rounded/>
        <v-btn
            color="primary"
            @click="submit"
            rounded
            prepend-icon="mdi mdi-content-save-all-outline"
            size="large"
            class="me-4"
            type="submit"
        >
          Salvar
        </v-btn>
        <v-btn
            color="primary"
            @click="cancel"
            rounded
            prepend-icon="mdi mdi-close-box-outline"
            size="large"
        >
          Cancelar
        </v-btn>
      </form>
    </div>
  </v-container>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const types = ['Residencial', 'Comercial'];
const selectedType = ref('');
const cep = ref('');
const street = ref('');
const number = ref('');
const complement = ref('');
const district = ref('');
const state = ref('');
const city = ref('');

const submit = async () => {
  try {
    const response = await axios.post('/api/addresses', {
      type: selectedType.value,
      cep: cep.value,
      street: street.value,
      number: number.value,
      complement: complement.value,
      district: district.value,
      state: state.value,
      city: city.value,
    });
    console.log('Success:', response);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

const cancel = () => {
  // Reset form or handle cancel
};</script>
<style scoped>
</style>