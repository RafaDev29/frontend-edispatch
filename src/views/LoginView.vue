<template>
  <div class="containerlogin relative flex items-start h-screen">
    <!-- Capa de color sobre la imagen de fondo -->
    <div class="overlay absolute inset-0 bg-[#fc844c] opacity-30"></div>

    <!-- Formulario alineado a la izquierda y ocupando toda la altura -->
    <div class="form-wrapper relative w-full sm:w-3/4 md:w-2/4 lg:w-1/4 h-full p-4 bg-[#130f23] text-white shadow-lg">
      <div class="formLogin h-full flex flex-col justify-center">
        <FormAuthVue @validate-login="onValidateLogin" />
      </div>
    </div>
  </div>
  <SuccessAlert />
  <ErrorAlert />
  <WarningAlert />
  <LoadAlert />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import FormAuthVue from '@/components/login/FormAuth.vue';
import { authLoginApi } from '@/api/LoginService';
import store from '@/store';
import eventBus from '@/eventBus';
import SuccessAlert from '@/components/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/alert/ErrorAlert.vue';
import WarningAlert from '@/components/alert/WarningAlert.vue';
import LoadAlert from '@/components/alert/LoadingAlert.vue'

export default {
  components: {
    FormAuthVue,
    SuccessAlert,
    ErrorAlert,
    WarningAlert,
    LoadAlert
  },
  setup() {
    const messageError = ref('');
    const statusError = ref(false);
    const router = useRouter();
    const route = useRoute();

    const onValidateLogin = async (data) => {
      try {
        eventBus.emit('loading', true);
        const response = await authLoginApi(data);
        const user = response.data.data;
        const token = response.data.data;
        store.commit('setUsername', user.username);
        store.commit('setToken', token.token);
        store.commit('setRole', user.role);
        store.commit('setIsAuthenticated', true);
        eventBus.emit('success', 'Credenciales correctas');
        setTimeout(() => {
          router.push('/');
        }, 1000);


      } catch (error) {
        statusError.value = true;

        if (error.response) {

          if (error.response.status === 400) {

            eventBus.emit('error', 'Usuario no encontrado');



          } else if (error.response.status === 500) {
            eventBus.emit('error', 'Error 500: Error interno del servidor');
            messageError.value = '';
          } else {
            eventBus.emit('error', `${error.response.data.message}`);
          }
        } else if (error.request) {
          eventBus.emit('error', 'No se recibió respuesta del servidor');

        } else {
          eventBus.emit('error', `Error al configurar la solicitud: ${error.message} `);

        }
      } finally {
        eventBus.emit('loading', false); // Ocultar el cargando después de la respuesta
      }
    };

    onMounted(() => {
      const username = route.query.username;
      const password = route.query.password;

      if (username && password) {
        onValidateLogin({ username, password });
      }
    });

    return {
      onValidateLogin,
      messageError,
      statusError,
    };
  },
};
</script>

<style scoped>
.containerlogin {
  background-image: url('@/assets/login/background.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
