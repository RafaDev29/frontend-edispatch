<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
  
        <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Compañia</span>
  
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="form.name" label="Nombre de la Compañia " prepend-icon="mdi-domain"
              required></v-text-field>
              <v-text-field v-model="form.username" label="Usuario " prepend-icon="mdi-account"
              required></v-text-field>
            <v-text-field v-model="form.password" label="Contraseña" type="password" prepend-icon="mdi-lock" required></v-text-field>
            <v-text-field v-model="form.code" label="Código" prepend-icon="mdi-file-document-outline" required></v-text-field>
            <v-text-field v-model="form.document" label="Documento" prepend-icon="mdi mdi-account-box-outline" required></v-text-field>
            <v-text-field v-model="form.ubigeo" label="ubigeo" prepend-icon="mdi-map-marker" required></v-text-field>
            <v-text-field v-model="form.address" label="Dirección" prepend-icon="mdi-map-marker" required></v-text-field>
           
            <v-text-field v-model="form.email" label="Correo" prepend-icon="mdi-mail" required></v-text-field>
            <v-text-field v-model="form.phone" label="Teléfono" prepend-icon="mdi-phone" required></v-text-field>
            <v-text-field v-model="form.codefiscal" label="Código Fiscal" prepend-icon="mdi-file-document-outline" required></v-text-field>
    
            <v-text-field v-model="form.logo" label="Logo URL"  prepend-icon="mdi-camera" required></v-text-field>
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
  import { createCompanyApi } from '@/api/CompanyService';
  import eventBus from '@/eventBus';
  import store from '@/store';
  
  export default {
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true);
      const form = ref({
        username: '',
        password: '',
        name: '',
        code: '',
        logo: '',
        ubigeo: '',
        address: '',
        email: '',
        phone: '',
        codefiscal: '',
        document: '',
      });
  
  
      const closeDialog = () => {
        emit('close');
      };
  
  
      const submitForm = async () => {
        const token = store.state.token;
        const payload = {
          username: form.value.username,
          password: form.value.password,
          name: form.value.name,
        code : form.value.code,
          logo: form.value.logo,
          ubigeo: form.value.ubigeo,
          address: form.value.address,
          email: form.value.email,
          phone: form.value.phone,
          codefiscal: form.value.codefiscal,
          document: form.value.document,
     
        };
  
        try {
          await createCompanyApi(token, payload);
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
  