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
        <EditCompanyForm v-if="isEditFormVisible" :master="selectedCompany" @close="closeEditForm" />
    </v-card>
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { listCompanyApi, deleteCompanyApi } from '@/api/CompanyService';
import store from '@/store';
import eventBus from '@/eventBus';
import EditCompanyForm from '@/components/company/EditCompanyForm.vue'; // Importar componente de edición
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';

export default {
    name: 'DataTable',
    components: {
        EditCompanyForm,
        SuccessAlert,
        ErrorAlert,
        WarningAlert,
    },
    setup() {
        const search = ref('');
        const companies = ref([]);
        const token = store.state.token;
        const isEditFormVisible = ref(false);
        const selectedCompany = ref(null);
        const headers = ref([
            { align: 'start', key: 'name', sortable: false, title: 'Nombre de Compañia' },
            { key: 'code', title: 'code' },
            { key: 'username', title: 'Usuario' },
            { key: 'document', title: 'Documento', sortable: false },
            { key: 'actions', title: 'Acciones', sortable: false },
        ]);

        // Función para obtener los datos
        const fetchCompanies = async () => {
            try {
                const response = await listCompanyApi(token);
                companies.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener los companies:', error);
            }
        };

        // Abrir el formulario de edición
        const openEditForm = (item) => {
            selectedCompany.value = item;
            isEditFormVisible.value = true; // Muestra el formulario de edición
        };

        // Cerrar el formulario de edición
        const closeEditForm = () => {
            isEditFormVisible.value = false; // Oculta el formulario de edición
        };

        // Llamada al servicio en onMounted
        onMounted(() => {
            fetchCompanies();
            eventBus.on('masterCreated', fetchCompanies);
        });

        onBeforeUnmount(() => {
            eventBus.off('masterCreated', fetchCompanies);
        });

        const filteredItems = computed(() => {
            if (!search.value) {
                return companies.value;
            }
            const searchTerm = search.value.toLowerCase();
            return companies.value.filter((item) =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm)
                )
            );
        });

        const deleteItem = (item) => {
           const masterId = item.companyId
            const username= item.username
           
            eventBus.emit('warning', {
                msg: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
                action: async () => {
                    try {
                        const token = store.state.token;
                        await deleteCompanyApi(token, masterId);
                        eventBus.emit('success', '¡Operación completada con éxito!');
                        fetchCompanies(); 
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
            selectedCompany,
            deleteItem,
        };
    },
};
</script>

<style scoped>

</style>