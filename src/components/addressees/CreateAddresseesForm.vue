<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <span class="text-h5 mp-2 mb-4 text-center">Crear Nuevo Destinatario</span>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-account-edit" required></v-text-field>
          <v-text-field v-model="form.ubigeo" label="Ubigeo" prepend-icon="mdi-map-marker" required></v-text-field>
          <v-text-field v-model="form.phone" label="Teléfono" prepend-icon="mdi-phone" required></v-text-field>
          <v-text-field v-model="form.address" label="Dirección" prepend-icon="mdi-map" required></v-text-field>
          <v-select
            v-model="selectedCustomerName"  
            :items="customerNames"         
            label="Cliente"
            prepend-icon="mdi mdi-account-group"
            required
          ></v-select>
          <v-card-actions class="justify-end">
            <v-btn text @click="closeDialog" color="#180c24">Cancelar</v-btn>
            <v-btn type="submit" color="#ff8c54">Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, onMounted } from 'vue';
import { CreateAddresseesApi } from '@/api/AddresseesService';
import { ListCustomersApi } from '@/api/CustomerService';
import eventBus from '@/eventBus';
import store from '@/store';

export default {
  emits: ['close'],
  setup(props, { emit }) {
    const dialog = ref(true);
    const customers = ref([]); 
    const customerNames = ref([]); 
    const selectedCustomerName = ref('');

    const form = ref({
      name: '',
      ubigeo: '',
      phone: '',
      address: '',
      customerId: '',
    });

    const closeDialog = () => {
      emit('close');
    };

    const submitForm = async () => {
      const token = store.state.token;
      
     
      const selectedCustomer = customers.value.find(
        (customer) => customer.name === selectedCustomerName.value
      );

      if (selectedCustomer) {
        form.value.customerId = selectedCustomer.customerId; 
      } else {
        eventBus.emit('error', 'No se encontró el cliente seleccionado');
        return;
      }

      const payload = {
        name: form.value.name,
        ubigeo: form.value.ubigeo,
        phone: form.value.phone,
        address: form.value.address,
        customerId: form.value.customerId,
      };

      try {
        await CreateAddresseesApi(token, payload);
        eventBus.emit('success', '¡Operación completada con éxito!');
        eventBus.emit('masterCreated');
        closeDialog();
      } catch (error) {
        eventBus.emit('error', `Ups... hubo un error al crear el usuario: ${error.message}`);
      }
    };

    const fetchCustomers = async () => {
      const token = store.state.token;
      try {
        const response = await ListCustomersApi(token);
        customers.value = response.data.data;

       
        customerNames.value = customers.value.map(customer => customer.name);
      } catch (error) {
        eventBus.emit('error', `Error al cargar los clientes: ${error.message}`);
      }
    };

    onMounted(() => {
      fetchCustomers(); 
    });

    return {
      dialog,
      form,
      closeDialog,
      submitForm,
      customers,
      customerNames,
      selectedCustomerName,
    };
  },
};
</script>

<style scoped></style>
