<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="text-center">
        <span class="text-h5">Editar carga</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="form.amount" label="Cantidad" type="number" prepend-icon="mdi mdi-fuel"
            required></v-text-field>
          <v-text-field v-model="form.date" label="Fecha" type="date" prepend-icon="mdi mdi-calendar-range"
            required></v-text-field>
          <v-select v-model="selectedCustomerName" :items="customerNames" 
            prepend-icon="mdi mdi-account-group" required></v-select>

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
import { ref, watch, onMounted } from 'vue';
import { updateLoadsgApi } from '@/api/LoadService';
import { ListCisternsApi } from '@/api/CisternsService'
import store from '@/store'
import eventBus from '@/eventBus';
export default {
  props: {
    cisterns: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const customers = ref([]);
    const customerNames = ref([]);
    const selectedCustomerName = ref(props.cisterns.cisternName);

    const dialog = ref(true);
    const form = ref({
      amount: '',
      cisternId: '',
      date: ''
    });


    watch(
      () => props.cisterns,
      (newCisterns) => {
        if (newCisterns) {
          form.value = { ...newCisterns };
        }
      },
      { immediate: true }
    );

    const closeDialog = () => {
      emit('close');
    };

    // Enviar los datos para actualizar el master
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
      try {
        const payload = {
          gallons: form.value.gallons,
          date: form.value.date,
          cisternId: form.value.cisternId,
          image: form.value.image


        };
        const token = store.state.token
        const id = form.value.loadId;
        await updateLoadsgApi(token, payload, id);
        eventBus.emit('success', '¡Operación completada con éxito!');
        eventBus.emit('masterCreated');
        closeDialog();
      } catch (error) {
        eventBus.emit('error', `Ups... hubo un error al editar el usuario:  ${error.message}`);
        console.error('Error al actualizar el cisterns:', error.message);
      }
    };


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
      fetchCustomers,

    };
  },
};
</script>

<style scoped>
/* Estilos específicos para el formulario de edición */
</style>