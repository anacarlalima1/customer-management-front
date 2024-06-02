<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Pesquisar clientes"
            class="mt-15"
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
            class="mt-10"
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
        item-key="id"
    >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.social_name }}</td>
        <td>{{ item.cpf }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.father_name }}</td>
        <td>{{ item.mother_name }}</td>
        <td>
          <v-btn icon @click="editClient(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteClient(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "@/api";

export default {
  data() {
    return {
      clients: [],
      totalClients: 0,
      loading: false,
      headers: [
        {title: 'ID', value: 'id'},
        {title: 'Nome', value: 'name'},
        {title: 'Nome Social', value: 'social_name'},
        {title: 'CPF', value: 'cpf'},
        {title: 'E-mail', value: 'email'},
        {title: 'Telefone', value: 'phone'},
        {title: 'Nome do Pai', value: 'father_name'},
        {title: 'Nome da Mãe', value: 'mother_name'},
        {title: 'Ações', value: 'actions', sortable: false},
      ],
      currentPage: 1,
    };
  },
  methods: {
    async fetchClients() {
      this.loading = true;
      try {
        const response = await axios.get('/clients', {
          params: { page: this.currentPage }
        });
        this.clients = response.data.clients.data;
        this.totalClients = response.data.total;
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        this.loading = false;
      }
    },
    editClient(item) {
      this.$router.push({ name: 'EditClient', params: { id: item.id } });
    },
    deleteClient(client) {
      // Chamar API para deletar cliente
      axios.delete(`/clients/${client.id}`)
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
