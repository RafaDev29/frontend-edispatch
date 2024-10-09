<template>
    <v-dialog v-model="visible" max-width="400px" persistent transition="dialog-bottom-transition">
      <v-card class="elevation-3" color="white">
        <!-- Encabezado con ícono de error -->
        <v-card-title class="text-h5 d-flex align-center">
          <v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
          ¡Error!
        </v-card-title>
  
        <!-- Mensaje de error -->
        <v-card-text class="text-center">
          <v-divider class="mb-4"></v-divider>
          <span>{{ message }}</span>
        </v-card-text>
  
        <!-- Cierre automático -->
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { ref } from 'vue';
  import eventBus from '@/eventBus';
  
  export default {
    name: 'ErrorAlert',
    setup() {
      const visible = ref(false);
      const message = ref('');
  
      // Escuchar el evento global para mostrar la alerta de error
      eventBus.on('error', (msg) => {
        message.value = msg;
        visible.value = true;
        setTimeout(() => (visible.value = false), 3000); // Cerrar automáticamente después de 3 segundos
      });
  
      return {
        visible,
        message,
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
  