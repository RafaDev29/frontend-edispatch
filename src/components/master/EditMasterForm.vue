<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Master</span>
        </v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="form.username"
              label="Nombre de Usuario"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Contraseña"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.name"
              label="Nombre del Master"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.identifier"
              label="Identificador"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.logo"
              label="Logo URL"
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
  import { updateMasterApi } from '@/api/MasterService';
  
  export default {
    props: {
      master: {
        type: Object,
        required: true,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const dialog = ref(true); // Controla la visibilidad del dialog
  
      const form = ref({
        username: '',
        password: '',
        name: '',
        identifier: '',
        logo: ''
      });
  
      // Cargar los datos del master seleccionado en el formulario
      watch(
        () => props.master, // Observa los cambios en master
        (newMaster) => {
          if (newMaster) {
            form.value = { ...newMaster }; // Carga los datos del master en el formulario
          }
        },
        { immediate: true }
      );
  
      // Cerrar el diálogo y emitir evento 'close' al padre
      const closeDialog = () => {
        emit('close'); // Emitir evento para cerrar el modal
      };
  
      // Enviar los datos para actualizar el master
      const submitForm = async () => {
        try {
          const payload = {
            masterId: props.master.masterId,
            username: form.value.username,
            password: form.value.password,
            name: form.value.name,
            identifier: form.value.identifier,
            logo: form.value.logo
          };
          await updateMasterApi(payload); // Llamar al servicio de actualización
          closeDialog(); // Cerrar el diálogo después de la actualización
        } catch (error) {
          console.error('Error al actualizar el master:', error);
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
  