<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Cisterna</span>
        </v-card-title>
  
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
  import { ref, watch } from 'vue';
  import { updateLoadsgApi } from '@/api/LoadService';
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
        description: '',
     
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
            gallons: form.value.gallons,
          date: form.value.date,
          cisternId: form.value.cisternId,
          image : form.value.image
        
       
          };
          const token = store.state.token
          const id = form.value.loadId; 
          await updateLoadsgApi(token, payload, id); 
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
  