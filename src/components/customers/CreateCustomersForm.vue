<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nuevo Cliente</span>
  
  
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
  import { ref } from 'vue';
  import { CreateCustomersApi } from '@/api/CustomerService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      const form = ref({
        name: '',
        code: '',
        document: '',
        business: '',
        ubigeo : '',
        address : '',
        email: '',
        phone: ''
  
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
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
  
        try {
          await CreateCustomersApi(token, payload);
          eventBus.emit('success', '¡Operación completada con éxito!');
          eventBus.emit('masterCreated');
  
          closeDialog();
        } catch (error) {
          eventBus.emit('error', `Ups... hubo un error al crear el usuario:  ${ error.message}`);
       
        }
      };
  
      return {
        dialog,
        form,
        closeDialog,
        submitForm,
      };
    }
  };
  </script>
  
  <style scoped></style>
  