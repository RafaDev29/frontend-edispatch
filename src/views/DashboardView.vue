<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Filtro DateRangePicker -->
    <DateRangePicker @dataRecibida="procesarDatos" />

    <!-- Organizar en una fila de 3 columnas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

      <!-- Tabla de resumen -->
      <SummaryTable :dispatchData="{ data: dispatchData }" />
      <!-- Gráfico de barras -->
      <TotalGallonsChart :dispatchData="{ data: dispatchData }" />

      <!-- Gráfico de pastel -->
      <CisternGallonsPieChart :dispatchData="{ data: dispatchData }" />


    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      <div class="mt-8">
        <TicketsPerDayChart :dispatchData="{ data: dispatchData }" />
      </div>

      <!-- Gráfico de Pareto de abastecimientos por mes -->
      <div class="mt-8">
        <ParetoChart :dispatchData="{ data: dispatchData }" />
      </div>
    </div>

    <div class="mt-8">
      <HeatmapChart :dispatchData="{ data: dispatchData }" />
    </div>
    <!-- Gráfico de barras de tickets emitidos por día -->

  </div>
  <LoadAlert/>
</template>
 
<script>
import { ref, onMounted } from 'vue';
import DateRangePicker from '@/components/dashboard/DateRangePicker.vue';
import TotalGallonsChart from '@/components/dashboard/TotalGallonsChart.vue';
import CisternGallonsPieChart from '@/components/dashboard/CisternGallonsPieChart.vue'
import SummaryTable from '@/components/dashboard/SummaryTable.vue'
import TicketsPerDayChart from '@/components/dashboard/TicketsPerDayChart.vue';
import ParetoChart from '@/components/dashboard/ParetoChart.vue'
import HeatmapChart from '@/components/dashboard/HeatmapChart.vue'; // Nuevo componente
import LoadAlert from '@/components/alert/LoadingAlert.vue'

export default {
  components: {
    DateRangePicker,
    TotalGallonsChart,
    CisternGallonsPieChart,
    SummaryTable,
    TicketsPerDayChart,
    ParetoChart,
    HeatmapChart,
    LoadAlert
  },
  setup() {
    const dispatchData = ref([]);
    const dateRangePicker = ref(null);

    const procesarDatos = (data) => {
      dispatchData.value = data.data;
    };


    onMounted(() => {
      if (dateRangePicker.value) {
        dateRangePicker.value.buscar();
      }
    });

    return {
      dispatchData,
      procesarDatos,
      dateRangePicker
    };
  }
};
</script>

<style scoped></style>
