<template>
  <v-container>
    <div class="mt-15">
      <form @submit.prevent="submit">
        <v-text-field
            v-model="name.value.value"
            append-inner-icon="mdi mdi-pencil-outline"
            :counter="10"
            :error-messages="name.errorMessage.value"
            label="Nome"
            variant="outlined"
            clearable
            rounded
        />
        <v-text-field
            v-model="social_name.value.value"
            append-inner-icon="mdi mdi-pencil-outline"
            :counter="10"
            :error-messages="social_name.errorMessage.value"
            label="Nome Social"
            variant="outlined"
            clearable
            rounded
        />
        <v-text-field
            v-model="cpf.value.value"
            append-inner-icon="mdi mdi-form-textbox"
            :counter="10"
            :error-messages="cpf.errorMessage.value"
            label="CPF"
            variant="outlined"
            clearable
            rounded
        />
        <v-text-field
            v-model="father_name.value.value"
            append-inner-icon="mdi mdi-pencil-outline"
            :counter="10"
            :error-messages="father_name.errorMessage.value"
            label="Nome do Pai"
            variant="outlined"
            clearable
            rounded
        />
        <v-text-field
            v-model="mother_name.value.value"
            append-inner-icon="mdi mdi-pencil-outline"
            :counter="10"
            :error-messages="mother_name.errorMessage.value"
            label="Nome da Mãe"
            variant="outlined"
            clearable
            rounded
        />

        <v-text-field
            v-model="phone.value.value"
            append-inner-icon="mdi mdi-phone-outline"
            :counter="7"
            :error-messages="phone.errorMessage.value"
            label="Telefone"
            variant="outlined"
            clearable
            rounded
        />

        <v-text-field
            v-model="email.value.value"
            append-inner-icon="mdi mdi-email-outline"
            :error-messages="email.errorMessage.value"
            label="E-mail"
            variant="outlined"
            clearable
            rounded
        />
        <v-btn
            color="primary"
            :click="isEditMode.value ? updateRecord : insertRecord"
            rounded
            prepend-icon="mdi mdi-content-save-all-outline"
            size="large"
            class="me-4"
            type="submit"
        >
          {{ isEditMode.value ? 'Editar' : 'Salvar' }}
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
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import axios from "@/api";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const isEditMode = ref(route.params.id !== undefined);
const clientData = ref({
  name: '',
  social_name: '',
  cpf: '',
  father_name: '',
  mother_name: '',
  phone: '',
  email: ''
});

// function validateCPF(cpf) {
//   cpf = cpf.replace(/\D/g, '');
//   if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return 'CPF inválido';
//
//   let sum = 0;
//   let remainder;
//   for (let i = 1; i <= 9; i++)
//     sum += parseInt(cpf.charAt(i-1)) * (11 - i);
//   remainder = (sum * 10) % 11;
//
//   if (remainder === 10 || remainder === 11) remainder = 0;
//   if (remainder !== parseInt(cpf.charAt(9))) return 'CPF inválido';
//
//   sum = 0;
//   for (let i = 1; i <= 10; i++)
//     sum += parseInt(cpf.charAt(i-1)) * (12 - i);
//   remainder = (sum * 10) % 11;
//
//   if (remainder === 10 || remainder === 11) remainder = 0;
//   if (remainder !== parseInt(cpf.charAt(10))) return 'CPF inválido';
//
//   return true;
// }
const {handleSubmit, setValues } = useForm();
const name = useField('name', value => {
  return value?.length >= 2 ? true : 'Name needs to be at least 2 characters.';
})
const social_name = useField('social_name', value => {
  return value?.length >= 2 ? true : 'Name needs to be at least 2 characters.';
})
const cpf = useField('cpf')
const father_name = useField('father_name', value => {
  return value?.length >= 2 ? true : 'Name needs to be at least 2 characters.';
})
const mother_name = useField('mother_name', value => {
  return value?.length >= 2 ? true : 'Name needs to be at least 2 characters.';
})
const phone = useField('phone', value => {
  return value?.length > 9 && /[0-9-]+/.test(value) ? true : 'Phone number needs to be at least 9 digits.';
})
const email = useField('email', value => {
  return /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value) ? true : 'Must be a valid e-mail';
})

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const response = await axios.get(`/client/${route.params.id}`);
      if (response.data.client && response.data.client.length > 0) {
        setValues(response.data.client[0]);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  }
});
const insertRecord = async () => {
  try {
    await axios.post('/api/add-client', clientData.value);
    await Swal.fire({
      title: 'Success!',
      text: 'Client has been added successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    router.push({ name: 'ClientsList' });
  } catch (error) {
    console.error('Insert error:', error.response.data);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to add client.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

const updateRecord = async () => {
  try {
    await axios.put(`/update-client/${route.params.id}`, clientData.value);
    await Swal.fire({
      text: 'Cliente editado com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    router.push({ name: 'ClientsList' });
  } catch (error) {
    console.error('Update error:', error.response.data);
    Swal.fire({
      text: 'Falha ao editar.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

const cancel = () => {
  router.push({ name: 'Home' });
};
const submit = handleSubmit(async values => {
  const method = isEditMode.value ? 'put' : 'post';
  const url = isEditMode.value ? `/update-client/${route.params.id}` : '/add-client';

  try {
    const response = await axios({ method, url, data: values });
    router.push({ name: 'ClientsList' });
    console.log('Success:', response);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
});
</script>