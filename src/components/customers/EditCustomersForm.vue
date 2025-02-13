<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Editar cliente</span>
        </v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.code" label="Código de cliente" prepend-icon="mdi mdi-shield-check" required></v-text-field>
            <v-text-field v-model="form.name" label="Nombre de cliente"  prepend-icon="mdi mdi-clipboard-account-outline" required></v-text-field>
            <v-text-field v-model="form.document" label="Documento" prepend-icon="mdi mdi-card-account-details" required></v-text-field>
            <v-text-field v-model="form.business" label="Razón social" prepend-icon="mdi mdi-card-account-details-star" required></v-text-field>
            <v-text-field v-model="form.ubigeo" label="Ubigeo" prepend-icon="mdi-map-marker" required></v-text-field>
            <v-text-field v-model="form.address" label="Dirección" prepend-icon="mdi-map" required></v-text-field>
            <v-text-field v-model="form.email" label="Correo electrónico" prepend-icon="mdi-email" required></v-text-field>
            <v-text-field v-model="form.phone" label="Teléfono" prepend-icon="mdi-phone" required></v-text-field>
      
  
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
  import { ref, watch } from 'vue';
  import { updateCustomerApi } from '@/api/CustomerService';
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
      const dialog = ref(true); 
  
      const form = ref({
        code: '',
        capacity: '',
        plate: '',
        //driverId: '',
        documentSeries: ''
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
        try {
          const payload = {
            name: form.value.name,
        code: form.value.code,
        document: form.value.document,
        business: form.value.business,
        ubigeo : form.value.business,
        address : form.value.address,
        email: form.value.email,
        phone: form.value.phone
         
          };
          const token = store.state.token
          const id = form.value.customerId; 
          await updateCustomerApi(token, payload, id); 
          eventBus.emit('success', '¡Operación completada con éxito!');
          eventBus.emit('masterCreated');
          closeDialog(); 
        } catch (error) {
            eventBus.emit('error', `Ups... hubo un error al editar el usuario:  ${ error.message}`);
          console.error('Error al actualizar el cisterns:', error.message);
        }
      };
  
      return {
        dialog,
        form,
        closeDialog,
        submitForm,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el formulario de edición */
  </style>
  