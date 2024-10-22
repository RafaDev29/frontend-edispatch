<template>
  <div class="bg-white p-6 rounded-lg shadow overflow-hidden">
    <h2 class="text-center font-semibold mb-4">Tabla resumen</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Clientes abastecidos -->
      <div class="flex items-center justify-between p-4 bg-[#f5faff] rounded-lg">
        <div class="flex items-center">
          <v-icon class="text-2xl text-[#2196F3]">mdi-account-group</v-icon>
          <span class="ml-2 text-gray-700 font-medium">Clientes abastecidos</span>
        </div>
        <span class="font-semibold text-gray-700">{{ totalCustomers }}</span>
      </div>

      <!-- Cisternas en operación -->
      <div class="flex items-center justify-between p-4 bg-[#f5faff] rounded-lg">
        <div class="flex items-center">
          <v-icon class="text-2xl text-[#4CAF50]">mdi-truck</v-icon>
          <span class="ml-2 text-gray-700 font-medium">Cisternas en operación</span>
        </div>
        <span class="font-semibold text-gray-700">{{ totalCisterns }}</span>
      </div>

      <!-- Galones abastecidos -->
      <div class="flex items-center justify-between p-4 bg-[#f5faff] rounded-lg">
        <div class="flex items-center">
          <v-icon class="text-2xl text-[#FF9800]">mdi-gas-station</v-icon>
          <span class="ml-2 text-gray-700 font-medium">Galones abastecidos</span>
        </div>
        <span class="font-semibold text-gray-700">{{ totalGallons }}</span>
      </div>

      <!-- Unidades abastecidas -->
      <div class="flex items-center justify-between p-4 bg-[#f5faff] rounded-lg">
        <div class="flex items-center">
          <v-icon class="text-2xl text-[#9C27B0]">mdi-truck-delivery</v-icon>
          <span class="ml-2 text-gray-700 font-medium">Unidades abastecidas</span>
        </div>
        <span class="font-semibold text-gray-700">{{ totalUnits }}</span>
      </div>

      <!-- Tickets emitidos -->
      <div class="flex items-center justify-between p-4 bg-[#f5faff] rounded-lg">
        <div class="flex items-center">
          <v-icon class="text-2xl text-[#3F51B5]">mdi-ticket</v-icon>
          <span class="ml-2 text-gray-700 font-medium">Tickets emitidos</span>
        </div>
        <span class="font-semibold text-gray-700">{{ totalTickets }}</span>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    props: {
      dispatchData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const totalCustomers = ref(0);
      const totalCisterns = ref(0);
      const totalGallons = ref(0);
      const totalUnits = ref(0);
      const totalTickets = ref(0);
  
      // Observar los cambios en los datos recibidos
      watch(
        () => props.dispatchData,
        (newData) => {
          if (newData && newData.data) {
            const cisternSet = new Set();
            const customerSet = new Set();
            let gallonsCount = 0;
            let ticketCount = 0;
  
            newData.data.forEach((item) => {
              cisternSet.add(item.cistern.plate);
              customerSet.add(item.customer.customerId); 
              gallonsCount += item.gallons; // Contamos los galones
              ticketCount += 1; // Contamos los tickets emitidos
            });
  
            // Actualizamos los valores en la vista
            totalCisterns.value = cisternSet.size;
            totalCustomers.value = customerSet.size;
            totalGallons.value = gallonsCount;
            totalUnits.value = cisternSet.size; // Puedes ajustar si se necesita otro cálculo
            totalTickets.value = ticketCount;
          }
        },
        { immediate: true }
      );
  
      return {
        totalCustomers,
        totalCisterns,
        totalGallons,
        totalUnits,
        totalTickets
      };
    }
  });
  </script>
  
  <style scoped>
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>
  