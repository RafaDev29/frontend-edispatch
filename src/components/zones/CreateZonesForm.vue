<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Zona</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-map" required></v-text-field>
            <v-text-field v-model="form.code" label="Código" prepend-icon="mdi mdi-code-greater-than" required></v-text-field>
            <v-text-field v-model="form.description" label="Descripción" prepend-icon="mdi mdi-book-open" required></v-text-field>
            <v-text-field v-model="form.zipCode" label="Código fiscal" prepend-icon="mdi mdi-map-marker" required></v-text-field>

           
  
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
  import { CreateZonesApi } from '@/api/ZonesService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      const form = ref({
        name: '',
        code: '',
        description: '',
        zipCode: '',

  
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
        const payload = {
          name: form.value.name,
          code: form.value.code,
          description: form.value.description,
          zipCode: form.value.zipCode,
        
        
        };
  
        try {
          await CreateZonesApi(token, payload);
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
  