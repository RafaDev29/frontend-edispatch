<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Cisterna</span>
        </v-card-title>
  
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
  import { ref, watch } from 'vue';
  import { updateSuppliersApi } from '@/api/SupplierService';
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
        business: '',
        name: '',
     
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
  
            business: form.value.business,
          name: form.value.name,
        
          
       
          };
          const token = store.state.token
          const id = form.value.supplierId; 
          await updateSuppliersApi(token, payload, id); 
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
  