<template>
    <v-dialog v-model="visible" max-width="200px" persistent transition="dialog-bottom-transition">
      <div class="bg-white bg-opacity-75 backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-xs mx-auto text-center relative">
        <!-- Ícono de Cargando -->
        <div class="flex items-center justify-center">
          <v-icon color="orange" class="text-5xl animate-spin">mdi-loading</v-icon>
        </div>
        <div class="text-black-700 mt-4 font-semibold text-lg">Cargando...</div>
      </div>
    </v-dialog>
  </template>
  
  <script>
  import { ref } from 'vue';
  import eventBus from '@/eventBus';
  
  export default {
    name: 'LoadingAlert',
    setup() {
      const visible = ref(false);
  
      // Escuchar el evento global para mostrar/ocultar la alerta de carga
      eventBus.on('loading', (isLoading) => {
        visible.value = isLoading; // Muestra si es `true`, oculta si es `false`
      });
  
      return {
        visible,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Transición suave de entrada y salida */
  .dialog-bottom-transition-enter-active,
  .dialog-bottom-transition-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .dialog-bottom-transition-enter-from,
  .dialog-bottom-transition-leave-to {
    opacity: 0;
    transform: translateY(20px); /* Efecto de aparición desde abajo */
  }
  
  /* Animación de giro para el ícono de carga */
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  