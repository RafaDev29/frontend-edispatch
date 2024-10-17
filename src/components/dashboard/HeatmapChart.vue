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

    // Coordenadas aproximadas para limitar el mapa al departamento de Lima
    const limaBounds = [
      [-12.6, -77.5], // Suroeste de Lima
      [-11.5, -76.5], // Noreste de Lima
    ];

    // Inicializar el mapa al montar el componente
    onMounted(() => {
      // Centrar el mapa en el departamento de Lima con un zoom ajustado
      map.value = L.map('map', {
        maxBounds: limaBounds, // Limitar la vista a los límites de Lima
        maxBoundsViscosity: 1.0, // Evitar que el mapa se salga de los límites
      }).setView([-12.0464, -77.0428], 10); // Coordenadas de Lima y zoom ajustado

      // Añadir un tile layer (capa de mapa) de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.value);

      
      heatLayer.value = L.heatLayer([], {
        radius: 25, 
        blur: 15, 
        maxZoom: 10, 
        gradient: {
          0.2: 'blue',  // Menor intensidad (frío)
          0.4: 'lime',  // Intensidad intermedia
          0.6: 'yellow', // Calor medio
          0.8: 'orange', // Calor alto
          1: 'red',     // Máxima intensidad (calor más visible)
        },
      }).addTo(map.value);
    });

    
    watch(
      () => props.dispatchData,
      (newData) => {
        if (newData && newData.data && heatLayer.value) {
          const heatPoints = newData.data.map((item) => [
            parseFloat(item.latitude),
            parseFloat(item.longitude),
            1, // Intensidad máxima del punto de calor
          ]);

          
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
