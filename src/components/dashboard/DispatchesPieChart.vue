<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <v-chart :option="chartOptions" style="height: 400px;" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  import VChart from 'vue-echarts';
  import { use } from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import { TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  use([CanvasRenderer, PieChart, TooltipComponent, TitleComponent, LegendComponent]);
  
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
          text: 'Distribución de Galones por Cliente',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: 'bottom',
        },
        series: [
          {
            name: 'Galones',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
  
      // Actualizar el gráfico cuando los datos cambian
      watch(
        () => props.dispatchData,
        (newData) => {
          if (newData && newData.data) {
            // Agrupar galones por cliente
            const clientes = {};
            newData.data.forEach((item) => {
              const cliente = item.customer.name;
              if (clientes[cliente]) {
                clientes[cliente] += item.gallons;
              } else {
                clientes[cliente] = item.gallons;
              }
            });
  
            // Transformar datos para el gráfico de pastel
            const pieData = Object.keys(clientes).map((cliente) => ({
              name: cliente,
              value: clientes[cliente],
            }));
  
            chartOptions.value.series[0].data = pieData;
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
  