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


        <EditDriverForm v-if="isEditFormVisible" :cisterns="selectCisterns" @close="closeEditForm" />
    </v-card>
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ListDriversApi, deleteDriversApi } from '@/api/DriverService';
import store from '@/store';
import eventBus from '@/eventBus';
import EditDriverForm from '@/components/drivers/EditDriverForm.vue'; 
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';

export default {
    name: 'DataTable',
    components: {
        EditDriverForm,
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
           
            { key: 'name', title: 'Nombre'  },
            { key: 'lastName', title: 'Apellidos' },
            { key: 'licenseNumber', title: 'Licencia de Conducir'  },
            { key: 'username', title: 'Usuario' },
            { key: 'actions', title: 'Acciones', sortable: false },
        ]);

        
        const fetchDrivers = async () => {
            try {
                const response = await ListDriversApi(token);
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
            fetchDrivers();
            eventBus.on('masterCreated', fetchDrivers);
        });

        onBeforeUnmount(() => {
            eventBus.off('masterCreated', fetchDrivers);
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
           const cisternId = item.driverId
            const username= item.username

            eventBus.emit('warning', {
                msg: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
                action: async () => {
                    try {
                        const token = store.state.token;
                        await deleteDriversApi(token, cisternId); 
                        eventBus.emit('success', '¡Operación completada con éxito!');
                        fetchDrivers(); 
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