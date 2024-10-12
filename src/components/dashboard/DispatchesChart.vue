<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <v-chart :option="chartOptions" style="height: 400px;" />
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
        type: Object, // Cambiamos el tipo de dato esperado a Object
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
          // Asegurarnos de que estamos accediendo a los despachos en `newData.data`
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
  </style>
  