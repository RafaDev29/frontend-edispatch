<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Componente de selección de fechas -->
    <DateRangePicker @dataRecibida="procesarDatos" />

    <!-- Contenedor con cuadrícula responsiva para los gráficos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <!-- Gráfico de barras -->
      <DispatchesChart v-if="dispatchData.data && dispatchData.data.length" :dispatchData="dispatchData" />

      <!-- Gráfico de pastel -->
      <DispatchesPieChart v-if="dispatchData.data && dispatchData.data.length" :dispatchData="dispatchData" />

      <!-- Gráfico de líneas -->
      <DispatchesLineChart v-if="dispatchData.data && dispatchData.data.length" :dispatchData="dispatchData" />
    </div>
  </div>
</template>

<script>
import DateRangePicker from '@/components/dashboard/DateRangePicker.vue';
import DispatchesChart from '@/components/dashboard/DispatchesChart.vue';
import DispatchesPieChart from '@/components/dashboard/DispatchesPieChart.vue';
import DispatchesLineChart from '@/components/dashboard/DispatchesLineChart.vue'; // Importamos el gráfico de líneas
import { ref } from 'vue';

export default {
  components: {
    DateRangePicker,
    DispatchesChart,
    DispatchesPieChart,
    DispatchesLineChart, // Registramos el gráfico de líneas
  },
  setup() {
    const dispatchData = ref({}); // Inicializamos como un objeto

    const procesarDatos = (data) => {
      console.log('Datos recibidos:', data); // Verificar los datos recibidos
      dispatchData.value = data; // Guardar los datos recibidos
    };

    return {
      dispatchData,
      procesarDatos,
    };
  },
};
</script>

<style scoped>
</style>
