<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Carga</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.amount" label="Cantidad"  type="number" prepend-icon="mdi mdi-fuel" required></v-text-field>
            <v-text-field v-model="form.date" label="Fecha"  type="date" prepend-icon="mdi mdi-calendar-range" required></v-text-field>
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
  import { CreateLoadsApi } from '@/api/LoadService';
  import {ListCisternsApi} from '@/api/CisternsService.js'
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const selectedCustomerName = ref('');
      const customerNames = ref([]); 
      const customers = ref([]); 
      const dialog = ref(true);
      const form = ref({
        gallons: '',
        image : '',
        cisternId : ''
  
      });

      const fetchCustomers = async () => {
      const token = store.state.token;
      try {
        const response = await ListCisternsApi(token);
        customers.value = response.data.data;

       
        customerNames.value = customers.value.map(customer => customer.plate);
      } catch (error) {
        eventBus.emit('error', `Error al cargar los clientes: ${error.message}`);
      }
    };
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {

         
      const selectedCustomer = customers.value.find(
        (customer) => customer.plate === selectedCustomerName.value
      );

      if (selectedCustomer) {
        form.value.cisternId = selectedCustomer.cisternId; 
      } else {
        eventBus.emit('error', 'No se encontró el cliente seleccionado');
        return;
      }
        const token = store.state.token;
        const payload = {
          amount: form.value.amount,
          date: form.value.date,
          cisternId: form.value.cisternId,
          image : form.value.image
        
        };
  
        try {
          await CreateLoadsApi(token, payload);
          eventBus.emit('success', '¡Operación completada con éxito!');
          eventBus.emit('masterCreated');
  
          closeDialog();
        } catch (error) {
          eventBus.emit('error', `Ups... hubo un error al crear el usuario:  ${ error.message}`);
       
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
        selectedCustomerName,
        customerNames,
        fetchCustomers
      };
    }
  };
  </script>
  
  <style scoped></style>
  