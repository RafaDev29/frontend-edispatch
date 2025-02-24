<template>
  <div class="bg-white p-6 rounded-lg shadow overflow-hidden">
    <v-chart :option="chartOptions" class="chart-container" />
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
        text: 'Galones Abastecidos por Cisterna',
        left: 'center',
        textStyle: {
          fontSize: 14, // Ajustar tamaño del texto del título
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} galones ({d}%)',
      },
      legend: {
        bottom: '0%',
        left: 'center',
        textStyle: {
          fontSize: 12, // Ajustar tamaño del texto de la leyenda
        },
      },
      series: [
        {
          name: 'Galones por Cisterna',
          type: 'pie',
          radius: '50%',
          data: [],
          itemStyle: {
            color: (params) => {
              // Aplicar colores diferenciados o degradados para cada sección
              const colorList = ['#ff8c54', '#ff6a2c', '#42a5f5', '#66bb6a', '#f54291'];
              return colorList[params.dataIndex % colorList.length];
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
      responsive: true,
    });

    // Actualizar el gráfico cuando los datos cambien
    watch(
      () => props.dispatchData,
      (newData) => {
        if (newData && newData.data) {
          const cisternData = {};

          // Agrupar los datos por cisterna (plate) y sumar los galones
          newData.data.forEach((item) => {
            const plate = item.cistern.plate;
            if (!cisternData[plate]) {
              cisternData[plate] = 0;
            }
            cisternData[plate] += item.gallons;
          });

          // Llenamos los datos del gráfico
          chartOptions.value.series[0].data = Object.keys(cisternData).map((plate) => ({
            name: plate,
            value: cisternData[plate],
          }));
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

@media (max-width: 768px) {
  .chart-container {
    min-height: 250px; /* Reducir altura en pantallas pequeñas */
  }
}
</style>
