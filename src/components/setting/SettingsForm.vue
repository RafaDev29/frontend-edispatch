<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <span class="text-h5 mp-2 mb-4 text-center">Configuraciones</span>
      
      <v-card-text>
        <v-form>
          <!-- Renderizamos campos dinámicos -->
          <div v-for="(field, index) in fields" :key="index">
            <!-- Campo tipo texto -->
            <v-text-field
              v-if="field.typeSettings === 2"
              :label="field.label"
              v-model="form[field.name]"
              required
            ></v-text-field>

            <!-- Campo tipo número -->
            <v-text-field
              v-if="field.typeSettings === 1"
              :label="field.label"
              v-model="form[field.name]"
              type="number"
              required
            ></v-text-field>

            <!-- Campo tipo booleano (checkbox) -->
            <v-checkbox
              v-if="field.typeSettings === 3"
              :label="field.label"
              v-model="form[field.name]"
            ></v-checkbox>
          </div>

          <v-card-actions class="justify-end">
            <v-btn text @click="closeDialog" color="#180c24">Cancelar</v-btn>
            <v-btn type="submit" color="#ff8c54">Guardar</v-btn>
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

    return {
      dialog,
      fields,
      form,
      closeDialog
    };
  }
};
</script>

<style scoped></style>
