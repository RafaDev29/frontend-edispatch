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
        textStyle: {
          fontSize: 14, // Ajustar tamaño del texto del título
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
          interval: 0,
          rotate: 30,
          fontSize: 10, // Ajustar tamaño de las etiquetas en pantallas pequeñas
        },
      },
      yAxis: {
        type: 'value',
        name: 'Galones',
        nameTextStyle: {
          fontSize: 12, // Ajustar tamaño de la etiqueta del eje Y
        },
      },
      series: [
        {
          name: 'Galones',
          type: 'bar',
          data: [],
          itemStyle: {
            color: (params) => {
              // Aplicar un degradado de color o colores diferenciados para cada barra
              const colorList = ['#ff8c54', '#ff6a2c', '#f54291', '#42a5f5', '#66bb6a'];
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
      responsive: true,
    });

    // Actualizar el gráfico cuando los datos cambian
    watch(
      () => props.dispatchData,
      (newData) => {
        if (newData && newData.data) {
          const customerData = {};

          newData.data.forEach((item) => {
            const customerName = item.customer.name;
            if (!customerData[customerName]) {
              customerData[customerName] = 0;
            }
            customerData[customerName] += item.gallons;
          });

          chartOptions.value.xAxis.data = Object.keys(customerData);
          chartOptions.value.series[0].data = Object.values(customerData);
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
