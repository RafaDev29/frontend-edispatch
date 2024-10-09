<template>
    <v-dialog v-model="visible" max-width="400px" persistent transition="dialog-bottom-transition">
      <v-card class="elevation-3" color="white">
        <!-- Encabezado con ícono de advertencia -->
        <v-card-title class="text-h5 d-flex align-center">
          <v-icon color="orange" class="mr-2">mdi-alert-circle</v-icon>
          ¡Advertencia!
        </v-card-title>
  
        <!-- Mensaje de advertencia -->
        <v-card-text class="text-center">
          <v-divider class="mb-4"></v-divider>
          <span>{{ message }}</span>
        </v-card-text>
  
        <!-- Botones de acción -->
        <v-card-actions class="justify-end">
          <v-btn color="orange" @click="confirmAction" elevation="1" class="mr-2">Aceptar</v-btn>
          <v-btn color="grey lighten-1" @click="closeAlert" elevation="1">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { ref } from 'vue';
  import eventBus from '@/eventBus';
  
  export default {
    name: 'WarningAlert',
    setup() {
      const visible = ref(false);
      const message = ref('');
      let actionToConfirm = null; // Guardará la acción que se ejecutará al confirmar
  
      // Escuchar el evento global para mostrar la alerta de advertencia
      eventBus.on('warning', ({ msg, action }) => {
        message.value = msg;
        actionToConfirm = action; // Almacena la acción que se ejecutará al confirmar
        visible.value = true;
      });
  
      // Confirmar la acción cuando se presiona "Aceptar"
      const confirmAction = () => {
        if (actionToConfirm) {
          actionToConfirm(); // Ejecuta la acción guardada
        }
        visible.value = false;
      };
  
      const closeAlert = () => {
        visible.value = false;
      };
  
      return {
        visible,
        message,
        confirmAction,
        closeAlert,
      };
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 10px; /* Bordes redondeados */
  }
  
  .v-card-title {
    font-weight: 600; /* Aumenta el peso del texto en el título */
  }
  
  .dialog-bottom-transition-enter-active,
  .dialog-bottom-transition-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .dialog-bottom-transition-enter-from,
  .dialog-bottom-transition-leave-to {
    opacity: 0;
    transform: translateY(30px); /* Efecto de aparición desde abajo */
  }
  </style>
  