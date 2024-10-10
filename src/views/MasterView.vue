<template>

<div class="pt-0 mt-0 pb-10 ml-0 mr-0 min-w-max[100%]"> 
  <div >
    <div class="flex justify-between items-center mb-6 bg-gray-50 p-6 rounded-lg shadow-lg">
  <h1 class="text-4xl font-bold text-indigo-900">Mantenimiento de Master</h1>
  <v-btn
    color="#ff8c54"
    class="text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-500 shadow-md"
    @click="openCreateForm"
  >
    Crear +
  </v-btn>
</div>


    <DataTable />

    
    <CreateMasterForm v-if="isCreateFormVisible" @close="closeCreateForm" />
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import DataTable from '@/components/master/DataTable.vue';
import CreateMasterForm from '@/components/master/CreateMasterForm.vue';
  
export default {
  components: {
    DataTable,
    CreateMasterForm,
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
