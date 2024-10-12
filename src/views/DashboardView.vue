<template>
  <div class="p-8 bg-gray-100 min-h-screen">
  
    <DateRangePicker @dataRecibida="procesarDatos" ref="dateRangePicker" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
  
      <DispatchesChart v-if="dispatchData.data && dispatchData.data.length" :dispatchData="dispatchData" />


      <DispatchesPieChart v-if="dispatchData.data && dispatchData.data.length" :dispatchData="dispatchData" />


      <DispatchesLineChart v-if="dispatchData.data && dispatchData.data.length" :dispatchData="dispatchData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DateRangePicker from '@/components/dashboard/DateRangePicker.vue';
import DispatchesChart from '@/components/dashboard/DispatchesChart.vue';
import DispatchesPieChart from '@/components/dashboard/DispatchesPieChart.vue';
import DispatchesLineChart from '@/components/dashboard/DispatchesLineChart.vue'; 

export default {
  components: {
    DateRangePicker,
    DispatchesChart,
    DispatchesPieChart,
    DispatchesLineChart, 
  },
  setup() {
    const dispatchData = ref({}); 
    const dateRangePicker = ref(null);

    const procesarDatos = (data) => {
      console.log('Datos recibidos:', data); 
      dispatchData.value = data; 
    };

    
    onMounted(() => {
      dateRangePicker.value.selectRange('today'); 
      dateRangePicker.value.buscar(); 
    });

    return {
      dispatchData,
      procesarDatos,
      dateRangePicker, 
    };
  },
};
</script>

<style scoped>
</style>
