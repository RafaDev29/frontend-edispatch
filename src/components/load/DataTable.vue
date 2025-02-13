<template>
    <v-card flat>
        <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
            single-line density="compact"></v-text-field>

        <v-data-table :headers="headers" :items="filteredItems" :search="search">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="openEditForm(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small color="red" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <EditLoadForm v-if="isEditFormVisible" :cisterns="selectCisterns" @close="closeEditForm" />
    </v-card>
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ListLoadApi, deleteLoadApi } from '@/api/LoadService';
import store from '@/store';
import eventBus from '@/eventBus';
import EditLoadForm from '@/components/load/EditLoadForm.vue'; 
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';

export default {
    name: 'DataTable',
    components: {
        EditLoadForm,
        SuccessAlert,
        ErrorAlert,
        WarningAlert,
    },
    setup() {
        const search = ref('');
        const cisterns = ref([]);
        const token = store.state.token;
        const isEditFormVisible = ref(false);
        const selectCisterns = ref(null);
        const headers = ref([
        { key: 'date', title: 'Fecha de la carga' , align: 'center' },
        { key: 'cisternName', title: 'Cisterna' , align: 'center' },
            { key: 'amount', title: 'Cantidad' , align: 'center' },
           
          
            { key: 'actions', title: 'Acciones', sortable: false },
        ]);

        
        const fetchLoads = async () => {
            try {
                const response = await ListLoadApi(token);
                cisterns.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener los cisterns:', error);
            }
        };

        // Abrir el formulario de edición
        const openEditForm = (item) => {
            selectCisterns.value = item;
            isEditFormVisible.value = true; // Muestra el formulario de edición
        };

        // Cerrar el formulario de edición
        const closeEditForm = () => {
            isEditFormVisible.value = false; // Oculta el formulario de edición
        };

        // Llamada al servicio en onMounted
        onMounted(() => {
            fetchLoads();
            eventBus.on('masterCreated', fetchLoads);
        });

        onBeforeUnmount(() => {
            eventBus.off('masterCreated', fetchLoads);
        });

        const filteredItems = computed(() => {
            if (!search.value) {
                return cisterns.value;
            }
            const searchTerm = search.value.toLowerCase();
            return cisterns.value.filter((item) =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm)
                )
            );
        });

        const deleteItem = (item) => {
           const cisternId = item.loadId
            const username= item.username
            // Emitir una alerta de advertencia antes de eliminar
            eventBus.emit('warning', {
                msg: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
                action: async () => {
                    try {
                        const token = store.state.token;
                        await deleteLoadApi(token, cisternId); // Llamar al servicio de eliminación
                        eventBus.emit('success', '¡Operación completada con éxito!');
                        fetchLoads(); 
                    } catch (error) {
                        console.error('Error al eliminar el cisterns:', error);
                    }
                }
            });
        };

        return {
            search,
            headers,
            filteredItems,
            openEditForm,
            closeEditForm,
            isEditFormVisible,
            selectCisterns,
            deleteItem,
        };
    },
};
</script>

<style scoped>
/* Estilos específicos para el componente de la tabla */
</style>