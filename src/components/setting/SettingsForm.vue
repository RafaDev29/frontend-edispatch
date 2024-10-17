<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Configuraciones</span>
  
  
        <v-card-text>
          <v-form >
            <v-text-field  label="Nombre de configuración" prepend-icon="mdi mdi-card"
              required></v-text-field>
           
  
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

 
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
   
      return {
        dialog,
      
        closeDialog,
  
      };
    }
  };
  </script>
  
  <style scoped></style>
  