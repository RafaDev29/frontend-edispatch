<template>
  <v-dialog v-model="visible" max-width="400px" persistent transition="dialog-bottom-transition">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center relative">
      <!-- Encabezado con ícono de advertencia -->
      <div class="flex items-center justify-center mb-4">
        <v-icon color="orange" class="mr-2 text-3xl">mdi-alert-circle</v-icon>
        <span class="text-2xl font-semibold text-orange-600">¡Advertencia!</span>
      </div>

      <!-- Mensaje de advertencia -->
      <div class="text-gray-700 mb-4">
        <span>{{ message }}</span>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-end space-x-2">
        
        <v-btn color="grey lighten-1" @click="closeAlert" elevation="1" class="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2">
          Cancelar
        </v-btn>
        <v-btn color="orange" @click="confirmAction" elevation="1" class="bg-orange-500 text-white hover:bg-orange-600 rounded-md px-4 py-2">
          Aceptar
        </v-btn>
      </div>
    </div>
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
/* Estilos de transición y animación */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Efecto de aparición desde abajo */
}
</style>
