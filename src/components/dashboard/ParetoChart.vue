<template>
    <div class="bg-white p-6 rounded-lg shadow overflow-hidden">
      <v-chart :option="chartOptions" class="chart-container" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  import VChart from 'vue-echarts';
  import { use } from 'echarts/core';
  import { BarChart, LineChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { format, startOfYear, endOfMonth, eachMonthOfInterval } from 'date-fns';
  
  use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent]);
  
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
          text: 'Abastecimientos por Mes (Pareto)',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Abastecimientos', 'Acumulado (%)'],
          top: '5%',
        },
        xAxis: {
          type: 'category',
          data: [], // Meses del año
        },
        yAxis: [
          {
            type: 'value',
            name: 'Abastecimientos',
          },
          {
            type: 'value',
            name: 'Acumulado (%)',
            axisLabel: {
              formatter: '{value}%',
            },
          },
        ],
        series: [
          {
            name: 'Abastecimientos',
            type: 'bar',
            data: [], // Conteo de abastecimientos por mes
            itemStyle: {
              color: '#2196F3',
            },
          },
          {
            name: 'Acumulado (%)',
            type: 'line',
            yAxisIndex: 1,
            data: [], // Acumulación de porcentaje de abastecimientos
            itemStyle: {
              color: '#FF9800',
            },
          },
        ],
      });
  
      // Calcular los meses desde el inicio del año hasta el mes actual
      const currentYearMonths = eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfMonth(new Date()),
      }).map((month) => format(month, 'MMMM'));
  
      // Actualizar el gráfico cuando los datos cambian
      watch(
        () => props.dispatchData,
        (newData) => {
          if (newData && newData.data) {
            const supplyPerMonth = {};
            const totalSupplies = newData.data.length; // Total de abastecimientos
  
            // Inicializar los meses con cero abastecimientos
            currentYearMonths.forEach((month) => {
              supplyPerMonth[month] = 0;
            });
  
            // Contar abastecimientos por mes
            newData.data.forEach((item) => {
              const month = format(new Date(item.generationDate), 'MMMM');
              if (supplyPerMonth[month] !== undefined) {
                supplyPerMonth[month] += 1;
              }
            });
  
            // Convertimos los valores en un array para su representación
            const supplyValues = Object.values(supplyPerMonth);
  
            // Calcular la acumulación porcentual para el Pareto
            const cumulativePercent = [];
            let cumulativeSum = 0;
            supplyValues.forEach((value) => {
              cumulativeSum += value;
              cumulativePercent.push(((cumulativeSum / totalSupplies) * 100).toFixed(2)); // Porcentaje acumulado
            });
  
            // Actualizamos los datos del gráfico
            chartOptions.value.xAxis.data = Object.keys(supplyPerMonth);
            chartOptions.value.series[0].data = supplyValues;
            chartOptions.value.series[1].data = cumulativePercent;
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
  