<template>
    <div class="bg-white p-6 rounded-lg shadow overflow-hidden">
      <v-chart :option="chartOptions" class="chart-container" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  import VChart from 'vue-echarts';
  import { use } from 'echarts/core';
  import { BarChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, TitleComponent]);
  
  export default defineComponent({
    components: {
      VChart,
    },
    props: {
      dispatchData: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const chartOptions = ref({
        title: {
          text: 'Cantidad de Galones por Despacho',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
          name: 'Galones',
        },
        series: [
          {
            name: 'Galones',
            type: 'bar',
            data: [],
            itemStyle: {
              color: '#ff8c54',
            },
          },
        ],
      });
  
      // Actualizar el gráfico cuando los datos cambian
      watch(
        () => props.dispatchData,
        (newData) => {
          if (newData && newData.data) {
            const categories = newData.data.map((item) => item.idTicket); // Usamos idTicket como categoría en el eje X
            const gallonsData = newData.data.map((item) => item.gallons); // Cantidad de galones por despacho
  
            chartOptions.value.xAxis.data = categories;
            chartOptions.value.series[0].data = gallonsData;
          }
        },
        { immediate: true }
      );
  
      return {
        chartOptions,
      };
    },
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px; /* Aseguramos una altura mínima */
    max-width: 100%; /* Limita el ancho para evitar que se desborde */
    overflow: hidden; /* Evita desbordamientos del contenido */
  }
  </style>
  