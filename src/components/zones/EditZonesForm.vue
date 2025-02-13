<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Editar Zona</span>
        </v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="form.name"
              label="Nombre"
               prepend-icon="mdi mdi-shield-check"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.code"
              label="Código "
               prepend-icon="mdi mdi-shield-check"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.zipCode"
              label="Código postal"
               prepend-icon="mdi mdi-shield-check"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.description"
              label="Descripción"
               prepend-icon="mdi mdi-shield-check"
              required
            ></v-text-field>
    
      
  
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
  import { updateBillingApi } from '@/api/BillingService';
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
            name: form.value.name,
            code: form.value.code,
            zipCode: form.value.zipCode,
            description: form.value.description,
            
       
          };
          const token = store.state.token
          const id = form.value.billingId; 
          await updateBillingApi(token, payload, id); 
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
  