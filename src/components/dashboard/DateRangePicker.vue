<template>
    <div class="flex flex-col md:flex-row items-center justify-between mb-6 bg-white p-6 rounded-lg shadow">
      <!-- Selección de fechas -->
      <div class="flex items-center space-x-4 mb-4 md:mb-0">
        <div class="flex flex-col">
          <label for="start-date" class="font-semibold text-gray-700 mb-1">Fecha de Inicio:</label>
          <input
            type="date"
            id="start-date"
            v-model="startDate"
            class="border border-gray-300 rounded-lg p-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#ff8c54]"
          />
        </div>
  
        <div class="flex flex-col">
          <label for="end-date" class="font-semibold text-gray-700 mb-1">Fecha de Fin:</label>
          <input
            type="date"
            id="end-date"
            v-model="endDate"
            class="border border-gray-300 rounded-lg p-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#ff8c54]"
          />
        </div>
  
        <!-- Botón Buscar -->
        <button
          @click="buscar"
          class="bg-[#ff8c54] text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#ff6a2c] transition duration-300 ease-in-out ml-4"
        >
          Buscar
        </button>
      </div>
  
      <!-- Botones de selección rápida -->
      <div class="flex space-x-4">
        <button
          @click="selectRange('today')"
          class="bg-[#ff8c54] text-white px-4 py-2 rounded-lg shadow hover:bg-[#ff6a2c] transition duration-300 ease-in-out"
        >
          Hoy
        </button>
        <button
          @click="selectRange('week')"
          class="bg-[#ff8c54] text-white px-4 py-2 rounded-lg shadow hover:bg-[#ff6a2c] transition duration-300 ease-in-out"
        >
          Esta Semana
        </button>
        <button
          @click="selectRange('month')"
          class="bg-[#ff8c54] text-white px-4 py-2 rounded-lg shadow hover:bg-[#ff6a2c] transition duration-300 ease-in-out"
        >
          Este Mes
        </button>
        <button
          @click="selectRange('year')"
          class="bg-[#ff8c54] text-white px-4 py-2 rounded-lg shadow hover:bg-[#ff6a2c] transition duration-300 ease-in-out"
        >
          Este Año
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from 'date-fns';
  import { useStore } from 'vuex'; // Importar la tienda Vuex
  import { ListDashboardApi } from '@/api/DashboardService'; // Importar el servicio
  
  export default {
    emits: ['dataRecibida'], // Declarar evento de emisión
    setup(props, { emit }) {
      const store = useStore(); // Usar la tienda Vuex
      const startDate = ref('');
      const endDate = ref('');
  
      // Establecer las fechas por defecto al cargar el componente
      onMounted(() => {
        const today = new Date();
        startDate.value = format(today, 'yyyy-MM-dd');
        endDate.value = format(today, 'yyyy-MM-dd');
      });
  
      // Selección rápida de rangos de fecha
      const selectRange = (range) => {
        const today = new Date();
  
        switch (range) {
          case 'today':
            startDate.value = format(today, 'yyyy-MM-dd');
            endDate.value = format(today, 'yyyy-MM-dd');
            break;
          case 'week':
            startDate.value = format(startOfWeek(today), 'yyyy-MM-dd');
            endDate.value = format(endOfWeek(today), 'yyyy-MM-dd');
            break;
          case 'month':
            startDate.value = format(startOfMonth(today), 'yyyy-MM-dd');
            endDate.value = format(endOfMonth(today), 'yyyy-MM-dd');
            break;
          case 'year':
            startDate.value = format(startOfYear(today), 'yyyy-MM-dd');
            endDate.value = format(endOfYear(today), 'yyyy-MM-dd');
            break;
        }
      };
  
      // Método para buscar datos y emitir la respuesta
      const buscar = async () => {
        const token = store.state.token; // Obtener el token del store
        const payload = {
          dateFrom: startDate.value,
          dateTo: endDate.value,
        };
  
        try {
          const response = await ListDashboardApi(token, payload);
          console.log('Datos recibidos:', response.data);
          emit('dataRecibida', response.data); // Emitir los datos recibidos
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      return {
        startDate,
        endDate,
        selectRange,
        buscar,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  