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
  import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
  
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
          text: 'Tickets Emitidos por Día (Mes Actual)',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: [], // Días del mes
        },
        yAxis: {
          type: 'value',
          name: 'Tickets Emitidos',
        },
        series: [
          {
            name: 'Tickets Emitidos',
            type: 'bar',
            data: [], // Conteo de tickets emitidos por día
            itemStyle: {
              color: '#4CAF50',
            },
          },
        ],
      });
  
      // Calcular días del mes actual
      const currentMonthDays = eachDayOfInterval({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date())
      }).map((day) => format(day, 'yyyy-MM-dd'));
  
      // Actualizar el gráfico cuando los datos cambian
      watch(
        () => props.dispatchData,
        (newData) => {
          if (newData && newData.data) {
            const ticketsPerDay = {};
  
            // Inicializar con cero todos los días del mes
            currentMonthDays.forEach((day) => {
              ticketsPerDay[day] = 0;
            });
  
            // Contar tickets por día
            newData.data.forEach((item) => {
              const day = format(new Date(item.generationDate), 'yyyy-MM-dd');
              if (ticketsPerDay[day] !== undefined) {
                ticketsPerDay[day] += 1;
              }
            });
  
            // Actualizar el gráfico
            chartOptions.value.xAxis.data = Object.keys(ticketsPerDay);
            chartOptions.value.series[0].data = Object.values(ticketsPerDay);
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
    height: 400px;
  }
  </style>
  