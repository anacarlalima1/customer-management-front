<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Pesquisar clientes"
            class="ml-15 mt-15"
            variant="outlined"
            clearable
            rounded
        />
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-btn
            color="primary"
            @click="insertRecord"
            rounded
            prepend-icon="mdi-plus"
            size="large"
            class="ml-5 mt-10"
        >
          Inserir
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
        :headers="headers"
        :items="clients"
        :items-per-page="5"
        :server-items-length="totalClients"
        :loading="loading"
        class="elevation-1"
    >
      <!--      <template #item.actions="{ item }">-->
      <!--        <v-btn icon @click="editClient(item)">-->
      <!--          <v-icon>mdi-pencil</v-icon>-->
      <!--        </v-btn>-->
      <!--        <v-btn icon @click="deleteClient(item)">-->
      <!--          <v-icon>mdi-delete</v-icon>-->
      <!--        </v-btn>-->
      <!--      </template>-->
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: '',
      clients: [],
      totalClients: 0,
      loading: false,
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Nome', value: 'name'},
        {text: 'E-mail', value: 'email'},
        {text: 'Telefone', value: 'phone'},
        {text: 'Ações', value: 'actions', sortable: false},
      ],
      currentPage: 1,
    };
  },
  methods: {
    async fetchClients() {
      this.loading = true;
      try {
        const response = await axios.get('/api/clients', {
          params: { page: this.currentPage }
        });
        this.clients = response.data.data;
        this.totalClients = response.data.total;
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        this.loading = false;
      }
    },
    editClient(client) {
      console.log('Edit client', client);
    },
    deleteClient(client) {
      // Chamar API para deletar cliente
      axios.delete(`/api/clients/${client.id}`)
          .then(response => {
            console.log('Client deleted', response);
            this.fetchClients(); // Recarregar lista após deletar
          })
          .catch(error => {
            console.error('Error deleting client:', error);
          });
    }
  },
  // methods: {
  //   fetchClients() {
  //     this.loading = true;
  //     // Aqui você faz sua requisição à API para buscar os clientes com a pesquisa aplicada
  //     // Simulação de uma chamada de API
  //     setTimeout(() => {
  //       // Simular resultados da API
  //       this.clients = [...]; // Substitua isso com dados reais
  //       this.totalClients = this.clients.length;
  //       this.loading = false;
  //     }, 1000);
  //   },
  //   onPageChange(page) {
  //     this.currentPage = page;
  //     this.fetchClients();
  //   },
  //   editClient(client) {
  //     // Implemente a lógica de edição
  //   },
  //   deleteClient(client) {
  //     // Implemente a lógica de remoção
  //   }
  // },
  created() {
    this.fetchClients();
  }
}
</script>
