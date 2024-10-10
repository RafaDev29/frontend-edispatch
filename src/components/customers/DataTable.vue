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


        <EditCustomersForm v-if="isEditFormVisible" :cisterns="selectCisterns" @close="closeEditForm" />
    </v-card>
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ListCustomersApi, deleteCustomerApi } from '@/api/CustomerService';
import store from '@/store';
import eventBus from '@/eventBus';
import EditCustomersForm from '@/components/customers/EditCustomersForm.vue'; 
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';

export default {
    name: 'DataTable',
    components: {
        EditCustomersForm,
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
        { key: 'code', title: 'Código' },
            { align: 'start', key: 'name', sortable: false, title: 'Nombre' },

            { key: 'document', title: 'Documento' },
            { key: 'business', title: 'Razón Social', sortable: false },
            { key: 'address', title: 'Dirección', sortable: false },
            { key: 'email', title: 'Correo', sortable: false },
            { key: 'phone', title: 'Télefono', sortable: false },
            { key: 'actions', title: 'Acciones', sortable: false },
        ]);

        
        const fetchCustomers = async () => {
            try {
                const response = await ListCustomersApi(token);
                cisterns.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener los cisterns:', error);
            }
        };

        // Abrir el formulario de edición
        const openEditForm = (item) => {
            selectCisterns.value = item;
            isEditFormVisible.value = true; 
        };

        // Cerrar el formulario de edición
        const closeEditForm = () => {
            isEditFormVisible.value = false; // Oculta el formulario de edición
        };

        // Llamada al servicio en onMounted
        onMounted(() => {
            fetchCustomers();
            eventBus.on('masterCreated', fetchCustomers);
        });

        onBeforeUnmount(() => {
            eventBus.off('masterCreated', fetchCustomers);
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
           const cisternId = item.cisternId
            const username= item.username
            // Emitir una alerta de advertencia antes de eliminar
            eventBus.emit('warning', {
                msg: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
                action: async () => {
                    try {
                        const token = store.state.token;
                        await deleteCustomerApi(token, cisternId);
                        eventBus.emit('success', '¡Operación completada con éxito!');
                        fetchCustomers(); 
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