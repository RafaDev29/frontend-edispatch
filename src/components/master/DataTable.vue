<template>
    <v-card flat>
        <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
            single-line></v-text-field>

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

        <!-- Formulario para editar Master -->
        <EditMasterForm v-if="isEditFormVisible" :master="selectedMaster" @close="closeEditForm" />
    </v-card>
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { listMasterApi, deleteMasterApi } from '@/api/MasterService';
import store from '@/store';
import eventBus from '@/eventBus';
import EditMasterForm from '@/components/master/EditMasterForm.vue'; // Importar componente de edición
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';

export default {
    name: 'DataTable',
    components: {
        EditMasterForm,
        SuccessAlert,
        ErrorAlert,
        WarningAlert,
    },
    setup() {
        const search = ref('');
        const masters = ref([]);
        const token = store.state.token;
        const isEditFormVisible = ref(false);
        const selectedMaster = ref(null);
        const headers = ref([
            { align: 'start', key: 'name', sortable: false, title: 'Nombre del Master' },
            { key: 'identifier', title: 'Identificador' },
            { key: 'username', title: 'Usuario' },
            { key: 'logo', title: 'Logo', sortable: false },
            { key: 'actions', title: 'Acciones', sortable: false },
        ]);

        // Función para obtener los datos
        const fetchMasters = async () => {
            try {
                const response = await listMasterApi(token);
                masters.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener los masters:', error);
            }
        };

        // Abrir el formulario de edición
        const openEditForm = (item) => {
            selectedMaster.value = item;
            isEditFormVisible.value = true; // Muestra el formulario de edición
        };

        // Cerrar el formulario de edición
        const closeEditForm = () => {
            isEditFormVisible.value = false; // Oculta el formulario de edición
        };

        // Llamada al servicio en onMounted
        onMounted(() => {
            fetchMasters();
            eventBus.on('masterCreated', fetchMasters);
        });

        onBeforeUnmount(() => {
            eventBus.off('masterCreated', fetchMasters);
        });

        const filteredItems = computed(() => {
            if (!search.value) {
                return masters.value;
            }
            const searchTerm = search.value.toLowerCase();
            return masters.value.filter((item) =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm)
                )
            );
        });

        const deleteItem = (item) => {
           const masterId = item.masterId
            const username= item.username
            // Emitir una alerta de advertencia antes de eliminar
            eventBus.emit('warning', {
                msg: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
                action: async () => {
                    try {
                        const token = store.state.token;
                        await deleteMasterApi(token, masterId); // Llamar al servicio de eliminación
                        eventBus.emit('success', '¡Operación completada con éxito!');
                        fetchMasters(); // Actualizar la lista después de eliminar
                    } catch (error) {
                        console.error('Error al eliminar el master:', error);
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
            selectedMaster,
            deleteItem,
        };
    },
};
</script>

<style scoped>
/* Estilos específicos para el componente de la tabla */
</style>