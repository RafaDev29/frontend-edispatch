<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

export default defineComponent({
  name: 'HeatmapChart',
  props: {
    dispatchData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const map = ref(null);
    const heatLayer = ref(null);

    // Inicializar el mapa al montar el componente
    onMounted(() => {
      // Crear el mapa de Leaflet centrado en las coordenadas (puedes ajustarlas)
      map.value = L.map('map').setView([12.345678, -98.765432], 5); // Coordenadas iniciales y zoom

      // Añadir un tile layer (capa de mapa) de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.value);

      // Crear la capa de calor vacía
      heatLayer.value = L.heatLayer([], { radius: 25 }).addTo(map.value);
    });

    // Actualizar la capa de calor cuando los datos cambien
    watch(
      () => props.dispatchData,
      (newData) => {
        if (newData && newData.data && heatLayer.value) {
          const heatPoints = newData.data.map((item) => [
            parseFloat(item.latitude),
            parseFloat(item.longitude),
            1, // Valor de intensidad del punto de calor, ajustable según tus datos
          ]);

          // Limpiar y añadir nuevos puntos de calor si la capa está lista
          heatLayer.value.setLatLngs(heatPoints);
        }
      },
      { immediate: true }
    );

    return {};
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
