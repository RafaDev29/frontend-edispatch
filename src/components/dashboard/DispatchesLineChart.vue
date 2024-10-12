<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <v-chart :option="chartOptions" style="height: 400px;" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  import VChart from 'vue-echarts';
  import { use } from 'echarts/core';
  import { LineChart } from 'echarts/charts';
  import { TooltipComponent, TitleComponent, GridComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { format } from 'date-fns'; // Para formatear fechas
  
  use([CanvasRenderer, LineChart, TooltipComponent, TitleComponent, GridComponent]);
  
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
          text: 'Evolución de Galones Despachados',
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
            type: 'line',
            data: [],
            itemStyle: {
              color: '#ff8c54',
            },
            smooth: true, // Hacer la línea suave
          },
        ],
      });
  
      // Actualizar el gráfico cuando los datos cambian
      watch(
        () => props.dispatchData,
        (newData) => {
          if (newData && newData.data) {
            // Agrupar los galones por la fecha de generación de cada despacho
            const dispatchesByDate = {};
            newData.data.forEach((item) => {
              const date = format(new Date(item.generationDate), 'yyyy-MM-dd');
              if (dispatchesByDate[date]) {
                dispatchesByDate[date] += item.gallons;
              } else {
                dispatchesByDate[date] = item.gallons;
              }
            });
  
            // Preparar los datos para el gráfico
            const categories = Object.keys(dispatchesByDate); // Fechas en el eje X
            const gallonsData = Object.values(dispatchesByDate); // Cantidad de galones en el eje Y
  
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
  