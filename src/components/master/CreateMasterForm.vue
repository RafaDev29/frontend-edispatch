<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>

      <span class="text-h5 mp-2 mb-4 text-center">Crear Nuevo Master</span>


      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="form.username" label="Nombre de Usuario " prepend-icon="mdi-account"
            required></v-text-field>
          <v-text-field v-model="form.password" label="Contraseña" type="password" prepend-icon="mdi-lock" required></v-text-field>
          <v-text-field v-model="form.name" label="Nombre del Master" prepend-icon="mdi-account" required></v-text-field>
          <v-text-field v-model="form.identifier" label="Identificador" prepend-icon="mdi-key" required></v-text-field>
          <v-text-field v-model="form.logo" label="Logo URL"  prepend-icon="mdi-camera" required></v-text-field>

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
import { ref } from 'vue';
import { createMasterApi } from '@/api/MasterService';
import eventBus from '@/eventBus';
import store from '@/store';

export default {
  emits: ['close'],
  setup(props, { emit }) {
    const dialog = ref(true);
    const form = ref({
      username: '',
      password: '',
      name: '',
      identifier: '',
      logo: ''
    });


    const closeDialog = () => {
      emit('close');
    };


    const submitForm = async () => {
      const token = store.state.token;
      const payload = {
        username: form.value.username,
        password: form.value.password,
        name: form.value.name,
        identifier: form.value.identifier,
        logo: form.value.logo,
      };

      try {
        await createMasterApi(token, payload);
        eventBus.emit('success', '¡Operación completada con éxito!');
        eventBus.emit('masterCreated');

        closeDialog();
      } catch (error) {
        console.error('Error al crear el master:', error);
      }
    };

    return {
      dialog,
      form,
      closeDialog,
      submitForm,
    };
  }
};
</script>

<style scoped></style>
