<template>

    <div class="pt-0 mt-0 pb-10 ml-0 mr-0 min-w-max[100%]">
      <div>
        <div class="flex justify-between items-center mb-2 bg-gray-50 p-6 rounded-lg shadow-lg">
       
                  <h1 class="font-bold lg:text-2xl text-xl text-indigo-900 " >      <span class="mdi mdi-tooltip-account"></span> Mantenimiento de Destinatarios</h1>
                  <button
                      class="flex items-center justify-center bg-[#ff8c54] text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-500 shadow-md"
                      @click="openCreateForm">
                      Crear +
                  </button>
              </div>
  
  
  
        <DataTable />
  
  
        <CreateBillingForm v-if="isCreateFormVisible" @close="closeCreateForm" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import DataTable from '@/components/addressees/DataTable.vue';
  import CreateBillingForm from '@/components/billing/CreateBillingForm.vue';
  
  export default {
    components: {
      DataTable,
      CreateBillingForm,
    },
    setup() {
      const isCreateFormVisible = ref(false);
  
      const openCreateForm = () => {
        isCreateFormVisible.value = true;
      };
  
      const closeCreateForm = () => {
        isCreateFormVisible.value = false;
      };
  
      return {
        isCreateFormVisible,
        openCreateForm,
        closeCreateForm,
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para esta vista si es necesario */
  </style>
  