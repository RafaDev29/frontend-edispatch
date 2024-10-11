<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nuevo Conductor</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-rename-box" required></v-text-field>
            <v-text-field v-model="form.lastName" label="Apellidos" prepend-icon="mdi mdi-account-box" required></v-text-field>
            <v-text-field v-model="form.licenseNumber" label="Licencia" prepend-icon="mdi mdi-card-account-details-outline" required></v-text-field>
            <v-text-field v-model="form.username" label="Usuario" prepend-icon="mdi mdi-account-circle-outline" required></v-text-field>
            <v-text-field v-model="form.password" label="Contraseña" type="password" prepend-icon="mdi-key" required></v-text-field>


           
  
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
  import { CreateDriversApi } from '@/api/DriverService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit} ) {
      const dialog = ref(true);
      const form = ref({
        name: '',
        lastName : '',
        licenseNumber : '',
        username: '',
        password: ''

  
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
        const payload = {
          name: form.value.name,
        lastName : form.value.lastName,
        licenseNumber : form.value.licenseNumber,
        username: form.value.username,
        password: form.value.password
        
        };
  
        try {
          await CreateDriversApi(token, payload);
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
  