<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Factura</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.business" label="Razón social" prepend-icon="mdi mdi-account-box" required></v-text-field>
            <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-account-edit-outline" required></v-text-field>
           
 
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
  import { CreateSuppliersApi } from '@/api/SupplierService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      const form = ref({
        business: '',
        name: '',
  
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
        const payload = {
          business: form.value.business,
          name: form.value.name,
        
        };
  
        try {
          await CreateSuppliersApi(token, payload);
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
  