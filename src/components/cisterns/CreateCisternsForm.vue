<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nuevo Master</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.code" label="Código de cisterna" prepend-icon="mdi mdi-shield-check"
              required></v-text-field>
            <v-text-field v-model="form.plate" label="Placa"  prepend-icon="mdi-tanker-truck" required></v-text-field>
            <v-text-field v-model="form.capacity" label="Capacidad" prepend-icon="mdi mdi-battery-80" required></v-text-field>
            <v-text-field v-model="form.documentSeries" label="Documento asignado" prepend-icon="mdi-card" required></v-text-field>
           
  
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
  import { createCisternsApi } from '@/api/CisternsService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      const form = ref({
        username: '',
        capacity: '',
        plate: '',
        documentSeries: '',
  
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
        const payload = {
          code: form.value.code,
          capacity: form.value.capacity,
          plate: form.value.plate,
          documentSeries: form.value.documentSeries,
        
        };
  
        try {
          await createCisternsApi(token, payload);
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
  