<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card class="rounded-lg shadow-lg">
      <v-card-title class="justify-center text-xl font-bold text-gray-700 bg-primary text-white">
        Configuraciones
      </v-card-title>

      <v-card-text class="px-6 pt-4 pb-6 bg-gray-50">
        <v-form>
          <!-- Renderizamos campos dinámicos -->
          <div v-for="(field, index) in fields" :key="index" class="mb-6">
            <div class="flex items-center space-x-3">
              <!-- Ícono -->
              <v-icon class="text-primary">
                {{ getIconForField(field.name) }}
              </v-icon>

              <!-- Campo tipo texto -->
              <v-text-field
                v-if="field.typeSettings === 2"
                :label="field.label"
                v-model="form[field.name]"
                class="rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out w-full"
                outlined
                dense
                clearable
                required
              ></v-text-field>

              <!-- Campo tipo número -->
              <v-text-field
                v-if="field.typeSettings === 1"
                :label="field.label"
                v-model="form[field.name]"
                type="number"
                class="rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out w-full"
                outlined
                dense
                clearable
                required
              ></v-text-field>

              <!-- Campo tipo booleano (switch) -->
              <v-switch
                v-if="field.typeSettings === 3"
                :label="field.label"
                v-model="form[field.name]"
                inset
                color="primary"
                class="w-full"
              ></v-switch>
            </div>
          </div>

          <v-card-actions class="justify-between px-6">
            <v-btn text @click="closeDialog" class="text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-300">
              Cancelar
            </v-btn>
            <v-btn color="primary" class="bg-primary text-white hover:bg-primary-dark transition-colors duration-300" @click="submitForm">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ListSettingApi } from '@/api/SettingService';
import { useStore } from 'vuex';

export default {
  emits: ['close'],
  setup(props, { emit }) {
    const dialog = ref(true);
    const store = useStore();
    const fields = ref([]);
    const form = ref({}); // Para manejar los valores del formulario

    // Función para cerrar el diálogo
    const closeDialog = () => {
      emit('close');
    };

    // Función para obtener las configuraciones desde la API
    const getSettings = async () => {
      try {
        const token = store.state.token;
        const response = await ListSettingApi(token);
        const data = response.data.data;

        // Filtrar solo los campos que tengan `status: true` y no incluir `configurationId`
        fields.value = Object.keys(data)
          .filter(key => key !== 'configurationId' && data[key].status)
          .map(key => {
            return {
              name: key,
              label: key, // Puedes ajustar los labels según sea necesario
              description: data[key].description || '',
              typeSettings: data[key].typeSettings
            };
          });

        // Inicializar los valores del formulario
        fields.value.forEach(field => {
          form.value[field.name] = field.description || '';
        });
      } catch (error) {
        console.error('Error al obtener configuraciones:', error);
      }
    };

    // Llamamos a getSettings cuando se monta el componente
    onMounted(() => {
      getSettings();
    });

    // Función para manejar el envío del formulario
    const submitForm = () => {
      // Aquí iría la lógica para enviar el formulario
      console.log('Formulario enviado', form.value);
    };

    // Función para obtener el ícono según el nombre del campo
    const getIconForField = (fieldName) => {
      switch (fieldName) {
        case 'nameCompany':
          return 'mdi-domain';
        case 'ruc':
          return 'mdi-card-account-details';
        case 'decimals':
          return 'mdi-decimal';
        case 'unit':
          return 'mdi-cube-outline';
        case 'product':
          return 'mdi-package-variant';
        case 'electronic':
          return 'mdi-monitor';
        case 'printGuide':
          return 'mdi-printer';
        default:
          return 'mdi-help-circle';
      }
    };

    return {
      dialog,
      fields,
      form,
      closeDialog,
      submitForm,
      getIconForField,
    };
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #ff8c54 !important;
}
.bg-primary-dark {
  background-color: #ff6a30 !important;
}
</style>
