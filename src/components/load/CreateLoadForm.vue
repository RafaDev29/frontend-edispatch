<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Carga</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.gallons" label="Cantidad"  type="number" prepend-icon="mdi mdi-fuel" required></v-text-field>
            <v-text-field v-model="form.date" label="Fecha"  type="date" prepend-icon="mdi mdi-calendar-range" required></v-text-field>
            <v-select v-model="form.cisternId" label="Cisterna" :items="['67081330f96e7a1e90bcf2b1', '670816e8f96e7a1e90bcf2b2']"  prepend-icon="mdi mdi-tanker-truck" required></v-select>
         
  
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
  import { CreateLoadsApi } from '@/api/LoadService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      const form = ref({
        gallons: '',
        image : ''
  
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
        const payload = {
          gallons: form.value.gallons,
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
  