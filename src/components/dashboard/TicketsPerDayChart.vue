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
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          interval: (index) => index % 2 === 0, // Mostrar solo un día sí, otro no
          rotate: 45,
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Tickets Emitidos',
        nameTextStyle: {
          fontSize: 12,
        },
      },
      series: [
        {
          name: 'Tickets Emitidos',
          type: 'bar',
          data: [],
          itemStyle: {
            color: (params) => {
              const colorList = ['#4CAF50', '#66bb6a', '#FF9800', '#42a5f5', '#f54291'];
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
      responsive: true,
    });

    const currentMonthDays = eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    }).map((day) => format(day, 'yyyy-MM-dd'));

    watch(
      () => props.dispatchData,
      (newData) => {
        if (newData && newData.data) {
          const ticketsPerDay = {};
          currentMonthDays.forEach((day) => {
            ticketsPerDay[day] = 0;
          });

          newData.data.forEach((item) => {
            const day = format(new Date(item.generationDate), 'yyyy-MM-dd');
            if (ticketsPerDay[day] !== undefined) {
              ticketsPerDay[day] += 1;
            }
          });

          chartOptions.value.xAxis.data = Object.keys(ticketsPerDay); // Todas las fechas, aunque se mostrarán alternadas
          chartOptions.value.series[0].data = Object.values(ticketsPerDay); // Los datos correspondientes a cada día
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
}

@media (max-width: 768px) {
  .chart-container {
    min-height: 250px;
  }
}
</style>
