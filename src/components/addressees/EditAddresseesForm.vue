<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Cisterna</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-account-edit" required></v-text-field>
          <v-text-field v-model="form.ubigeo" label="Ubigeo" prepend-icon="mdi-map-marker" required></v-text-field>
          <v-text-field v-model="form.phone" label="Teléfono" prepend-icon="mdi-phone" required></v-text-field>
          <v-text-field v-model="form.address" label="Dirección" prepend-icon="mdi-map" required></v-text-field>

          <v-select
            v-model="selectedCustomerName"  
            :items="customerNames"         
            :label="form.customerName"
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
import { ref, watch , onMounted} from 'vue';
import { updateAddresseesApi } from '@/api/AddresseesService';  // Mantengo el servicio que usas
import { ListCustomersApi } from '@/api/CustomerService';      // Importar el servicio de clientes
import store from '@/store';
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


    

    // Actualizar el formulario con los datos de cisterns
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

    

    const submitForm = async () => {

      const selectedCustomer = customers.value.find(
        (customer) => customer.name === selectedCustomerName.value
      );

      if (selectedCustomer) {
        form.value.customerId = selectedCustomer.customerId; 
      } else {
        eventBus.emit('error', 'No se encontró el cliente seleccionado');
        return;
      }

      try {
        const payload = {
          name: form.value.name,
          ubigeo: form.value.ubigeo,
          phone: form.value.phone,
          address: form.value.address,
          customerId: form.value.customerId,  // Enviar el customerId seleccionado
        };
        const token = store.state.token;
        const id = form.value.addresseeId; 
        await updateAddresseesApi(token, payload, id);
        eventBus.emit('success', '¡Operación completada con éxito!');
        eventBus.emit('masterCreated');
        closeDialog();
      } catch (error) {
        eventBus.emit('error', `Ups... hubo un error al editar el usuario: ${error.message}`);
        console.error('Error al actualizar el cisterns:', error.message);
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

<style scoped>

</style>
