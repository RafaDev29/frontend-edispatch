<template>
  <div class="flex items-center justify-center min-h-screen bg-[#130f23] p-4">
    <div class="w-full max-w-md bg-transparent shadow-none p-6">
      <div class="flex justify-center mb-4">
        <img :src="LogoImage" alt="Logo" class="w-20 h-20">
      </div>
      <h1 class="text-lg text-[#fc844c] text-center mb-4 font-bold">Bienvenido de nuevo a eDispatch!!</h1>
      <p class="text-xs text-gray-400 text-center mb-4">
        Ingresa las credenciales para ingresar
      </p>
      <v-form @submit.prevent="validateLogin">
        <v-text-field
          v-model="username"
          label="Usuario"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          color="#fc844c"
          class="text-white w-full mb-4"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Contraseña"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          color="#fc844c"
          class="text-white w-full mb-4"
          @click:append-inner="togglePasswordVisibility"
        ></v-text-field>
        <v-btn type="submit" color="#fc844c" class="w-full mt-4 text-[#130f23] font-bold">Ingresar</v-btn>
      </v-form>
      <div class="mt-8 text-gray-400 text-sm text-center">
        <p class="font-semibold">
          Soluciones para el Servicio de Abastecimiento
        </p>
        <p>
          Soluciones integrales, atención especializada <br>
          y personalizada a todos nuestros clientes.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import logoImage from '@/assets/login/logo_sysnet.png';

export default {
  data() {
    return {
      LogoImage: logoImage,
    };
  },
  emits: ['validate-login'],
  setup(_, { emit }) {
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);

    const validateLogin = () => {
      const data = {
        username: username.value,
        password: password.value,
      };
      emit('validate-login', data);
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      username,
      password,
      validateLogin,
      togglePasswordVisibility,
      showPassword,
    };
  },
};
</script>

<style scoped>
/* No se requiere mucho CSS adicional con Tailwind CSS aplicado directamente */
</style>
