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
          text: 'Cantidad de Galones por Cliente',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: [], // Clientes
        },
        yAxis: {
          type: 'value',
          name: 'Galones',
        },
        series: [
          {
            name: 'Galones',
            type: 'bar',
            data: [], // Galones por cliente
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
            const customerData = {};
  
            // Agrupar los datos por cliente y sumar los galones
            newData.data.forEach((item) => {
              const customerName = item.customer.name;
              if (!customerData[customerName]) {
                customerData[customerName] = 0;
              }
              customerData[customerName] += item.gallons;
            });
  
            // Llenamos los datos del gráfico
            chartOptions.value.xAxis.data = Object.keys(customerData); // Nombres de los clientes
            chartOptions.value.series[0].data = Object.values(customerData); // Galones totales por cliente
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
    min-height: 400px;
    max-width: 100%;
    overflow: hidden;
  }
  </style>
  