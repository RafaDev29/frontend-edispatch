<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Editar Master</span>
        </v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="form.name"
              label="Nombre de Compañia"
               prepend-icon="mdi-domain"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.username"
              label="Nombre de Usuario"
               prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Contraseña"
              type="password"
               prepend-icon="mdi-lock"
              required
            ></v-text-field>
           
            <v-text-field
              v-model="form.code"
              label="Código"
               prepend-icon="mdi-file-document-outline"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.ubigeo"
              label="ubigeo"
               prepend-icon="mdi-map-marker"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.address"
              label="address"
               prepend-icon="mdi-map-marker"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              label="email"
               prepend-icon="mdi-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.phone"
              label="Télefono"
               prepend-icon="mdi-phone"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.codefiscal"
              label="Código postal"
               prepend-icon="mdi-file-document-outline"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.document"
              label="Documento"
               prepend-icon="mdi mdi-account-box-outline"
              required
            ></v-text-field>
           
            <v-text-field
              v-model="form.logo"
              label="Logo URL"
               prepend-icon="mdi-image"
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
  import { updateCompanyApi } from '@/api/CompanyService';
  import store from '@/store'
  import eventBus from '@/eventBus';
  export default {
    props: {
      master: {
        type: Object,
        required: true,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true); 
  
      const form = ref({
        username: '',
        password: '',
        name: '',
        ubigeo: '',
        address: '',
        email: '',
        phone: '',
        codefiscal: '',
        document: '',
        logo: ''
      });
  
 
      watch(
        () => props.master, // Observa los cambios en master
        (newMaster) => {
          if (newMaster) {
            form.value = { ...newMaster };
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
            username: form.value.username,
            password: form.value.password,
            name: form.value.name,
            code : form.value.code,
            ubigeo: form.value.ubigeo,
            address: form.value.address,
            email: form.value.email,
            phone: form.value.phone,
            codefiscal: form.value.codefiscal,
            document: form.value.document,
            logo: form.value.logo
          };
          const token = store.state.token
          const id = form.value.companyId; 
          await updateCompanyApi(token, payload, id); 
          eventBus.emit('success', '¡Operación completada con éxito!');
          eventBus.emit('masterCreated');
          closeDialog(); 
        } catch (error) {
            eventBus.emit('error', `Ups... hubo un error al editar el usuario:  ${ error.message}`);
          console.error('Error al actualizar el master:', error.message);
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
  