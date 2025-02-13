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

        <EditAddresseesForm v-if="isEditFormVisible" :cisterns="selectCisterns" @close="closeEditForm" />
    </v-card>
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ListAddresseesApi, deleteAddresseesApi } from '@/api/AddresseesService';

import store from '@/store';
import eventBus from '@/eventBus';
import EditAddresseesForm from '@/components/addressees/EditAddresseesForm.vue';
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';

export default {
    name: 'DataTable',
    components: {
        EditAddresseesForm,
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
            { key: 'name', title: 'Nombre', align: 'center' },
            { key: 'ubigeo', title: 'Ubigeo', align: 'center' },
            { key: 'phone', title: 'Teléfono', align: 'center' },
            { key: 'address', title: 'Dirección', align: 'center' },
            { key: 'customerName', title: 'Cliente', align: 'center' },
            { key: 'actions', title: 'Acciones', sortable: false },
        ]);

        const fetchAddressees = async () => {
            try {
                const response = await ListAddresseesApi(token);
                cisterns.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener los cisterns:', error);
            }
        };

   

      

        const openEditForm = (item) => {
            selectCisterns.value = item;
            isEditFormVisible.value = true;
        };

        const closeEditForm = () => {
            isEditFormVisible.value = false;
        };

        onMounted(() => {
            fetchAddressees();
        
            eventBus.on('masterCreated', fetchAddressees);
        });

        onBeforeUnmount(() => {
            eventBus.off('masterCreated', fetchAddressees);
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
            const cisternId = item.addresseeId;
            const username = item.username;

            eventBus.emit('warning', {
                msg: `¿Estás seguro de que deseas eliminar al usuario ${username}?`,
                action: async () => {
                    try {
                        const token = store.state.token;
                        await deleteAddresseesApi(token, cisternId);
                        eventBus.emit('success', '¡Operación completada con éxito!');
                        fetchAddressees();
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
</style>
