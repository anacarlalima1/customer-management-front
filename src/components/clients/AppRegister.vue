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
            :error-messages="name.errorMessage.value"
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
            :error-messages="name.errorMessage.value"
            label="Nome do Pai"
            variant="outlined"
            clearable
            rounded
        />
        <v-text-field
            v-model="mother_name.value.value"
            append-inner-icon="mdi mdi-pencil-outline"
            :counter="10"
            :error-messages="name.errorMessage.value"
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
        ></v-text-field>

        <v-text-field
            v-model="email.value.value"
            append-inner-icon="mdi mdi-email-outline"
            :error-messages="email.errorMessage.value"
            label="E-mail"
            variant="outlined"
            clearable
            rounded
        ></v-text-field>
        <v-btn
            color="primary"
            @click="insertRecord"
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
            @click="insertRecord"
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
// import {ref} from 'vue'
import {useField, useForm} from 'vee-validate'

const {handleSubmit} = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be at least 9 digits.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
  },
})
const name = useField('name')
const social_name = useField('social_name')
const cpf = useField('cpf')
const father_name = useField('father_name')
const mother_name = useField('mother_name')
const phone = useField('phone')
const email = useField('email')

// const items = ref([
//   'Item 1',
//   'Item 2',
//   'Item 3',
//   'Item 4',
// ])

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>