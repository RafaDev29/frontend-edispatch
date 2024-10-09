<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Mantenimiento de Master</h1>
      <v-btn color="#ff8c54" @click="openCreateForm">Crear +</v-btn>
    </div>

    <DataTable />

    
    <CreateMasterForm v-if="isCreateFormVisible" @close="closeCreateForm" />
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
