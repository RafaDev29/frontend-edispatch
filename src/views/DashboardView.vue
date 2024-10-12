<template>
  <div class="dashboard p-8 bg-gray-100 min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Card: Total Sales -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">Total Sales</span>
          <span class="text-3xl font-semibold text-[#ff8c54]">$45,000</span>
        </div>
      </div>

      <!-- Card: Active Users -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">Active Users</span>
          <span class="text-3xl font-semibold text-[#ff8c54]">1,230</span>
        </div>
      </div>

      <!-- Card: New Customers -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">New Customers</span>
          <span class="text-3xl font-semibold text-[#ff8c54]">85</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Sales Overview Chart -->
      <div class="bg-white shadow rounded-lg p-6">
        <v-chart :option="salesChartOptions" style="height: 400px;"></v-chart>
      </div>

      <!-- User Growth Chart -->
      <div class="bg-white shadow rounded-lg p-6">
        <v-chart :option="userGrowthChartOptions" style="height: 400px;"></v-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, TitleComponent]);

export default defineComponent({
  components: {
    VChart,
  },
  setup() {
    // Opciones de gráfico de ventas
    const salesChartOptions = ref({
      title: {
        text: 'Sales Overview',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: [5000, 7000, 8000, 9000, 11000, 13000],
          itemStyle: {
            color: '#ff8c54',
          },
        },
      ],
    });

    // Opciones de gráfico de crecimiento de usuarios
    const userGrowthChartOptions = ref({
      title: {
        text: 'User Growth',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Active Users',
          type: 'line',
          data: [200, 300, 400, 550, 600, 800],
          itemStyle: {
            color: '#ff8c54',
          },
          lineStyle: {
            width: 3,
          },
        },
      ],
    });

    return {
      salesChartOptions,
      userGrowthChartOptions,
    };
  },
});
</script>

<style scoped>
.dashboard {
  background-color: #f8fafc;
}
</style>
