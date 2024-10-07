<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="p-4" flat>
          <v-card-title class="text-center">
            <img :src="LogoImage" alt="Logo" class="logo-image">
          </v-card-title>
          <div>
            <h1 class="text-lg text-[#fc844c] text-center mb-4 font-bold">Bienvenido de nuevo a eDispatch!!</h1>
            <p class="text-xs text-gray-400 text-center mb-4">
              Ingresa las credenciales para ingresar
            </p>
          </div>
          <v-card-text>
            <v-form @submit.prevent="validateLogin">
              <v-text-field
                v-model="username"
                label="Usuario"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                color="#fc844c"
                class="text-white"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                color="#fc844c"
                class="text-white"
                @click:append-inner="togglePasswordVisibility"
              ></v-text-field>
              <v-btn type="submit" color="#fc844c" class="mt-4 text-[#130f23] font-bold" block>Ingresar</v-btn>
            </v-form>
          </v-card-text>
          <!-- Texto adicional debajo del formulario -->
          <div class="additional-text mt-8 text-gray-400 text-sm text-center">
            <p class="font-semibold">
              Soluciones para el Servicio de Abastecimiento
            </p>
            <p>
              Soluciones integrales, atención especializada <br>
              y personalizada a todos nuestros clientes.
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
.logo-image {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.v-card {
  background-color: transparent; /* Sin fondo para permitir que se vea el color oscuro del formulario */
  box-shadow: none; /* Sin sombra */
}

.v-btn {
  background-color: #fc844c; /* Botón con color anaranjado */
}

.v-btn:hover {
  background-color: #ff9f66; /* Un poco más claro al pasar el mouse */
}

.additional-text {
  color: rgba(255, 255, 255, 0.7); /* Texto en gris claro para ser suave y no destacar demasiado */
}
</style>
