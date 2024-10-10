<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer v-if="!isCamposGeneralesView" v-model="drawer" :rail="rail" permanent
          @click="rail = false" color="#180c24" class="border-0">
          <div class="p-2 py-7 flex items-center justify-center gap-2">
            <div>
              <div class="p-1 pt-4 flex items-center justify-center">
                <img :src="logoEdriver" class="w-[6rem] bg-[#ff8c54] rounded-md" />
              </div>
              <p v-if="!rail" class="font-bold text-2xl text-center w-full text-white">eDispatch 
                <span class="mdi mdi-hammer-wrench"></span>
              </p>
            </div>
          </div>
          <v-list>
            <div v-for="itemNavegation in filteredItems" :key="itemNavegation.value">
              <router-link :to="itemNavegation.to" v-if="itemNavegation.children.length == 0">
                <v-list-item
                  @click="selectItem(itemNavegation.to)" :prepend-icon="itemNavegation.icon"
                  :title="itemNavegation.title" :value="itemNavegation.value"
                  :class="{ 'selected-item-orange': selectedItem === itemNavegation.to }"
                ></v-list-item>
                <v-tooltip activator="parent" location="end" v-if="rail">{{ itemNavegation.title }}</v-tooltip>
              </router-link>
              <v-list-group v-else :value="itemNavegation.value" fluid>
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" :prepend-icon="itemNavegation.icon" :title="itemNavegation.title" color="#180c24"></v-list-item>
                </template>
                <div
                  :class="{ 'my-2 border-l-4 border-[#ff8c54] ml-3': !rail, 'my-2 border-l-4 border-[#ff8c54]': rail }"
                >
                  <router-link :to="item.to" v-for="item in itemNavegation.children" :key="item.value"
                    class="rounded-md">
                    <v-list-item
                      @click="selectItem(item.to)" :prepend-icon="item.icon" :title="item.title"
                      :value="item.value" active-class="yellow-darken-3 rounded-md"
                      :class="{ 'selected-item-orange': selectedItem === item.to }"
                    ></v-list-item>
                  </router-link>
                </div>
              </v-list-group>
            </div>
          </v-list>
        </v-navigation-drawer>
  
        <v-main class="h-screen bg-slate-100 block">
          <div class="w-full bg-white flex justify-between items-center px-3 shadow-sm">
            <v-btn variant="text" icon="mdi-menu" color="#ff8c54" class="cursor-pointer"
              @click.stop="rail = !rail"></v-btn>
            <div class="flex items-center">
              <div class="flex items-center text-start text-xs">
                <v-list>
                  <v-list-item class="text-start item-personalizado" :prepend-avatar="avatarPath">
                    <template v-slot:default>
                      <v-row>
                        <v-col>
                          <div class="text-sm">Hola, {{ nombre_usuario }}</div>
                          <div class="caption">{{ rols }}</div>
                        </v-col>
                      </v-row>
                    </template>
                  </v-list-item>
                </v-list>
              </div>
              <MenuAsPopover />
            </div>
          </div>
          <section class="overflow-y-auto section_main" :class="isMobile ? 'p-4' : 'p-8'">
            <router-view />
          </section>
        </v-main>
      </v-layout>
    </v-card>
  
    <v-dialog v-model="dialogLoader" :scrim="false" persistent width="auto">
      <v-card color="blue">
        <v-card-text>
          Procesando...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import MenuAsPopover from '@/components/general/MenuAsPopover.vue';
  import store from '@/store';
  
  export default {
    components: {
      MenuAsPopover
    },
    setup() {
      const isMobile = ref(false);
      const drawer = ref(true);
      const rail = ref(true);
      const nombre_usuario = ref('');
      const selectedItem = ref(null);
      const dialogLoader = ref(false);
  
      const ItemsNavegation = ref([
        {
          icon: "mdi mdi-toolbox",
          title: "Administradores",
          value: "master",
          to: "/master",
          children: []
        }   ,
        {
          icon: "mdi mdi-domain",
          title: "Compañias",
          value: "company",
          to: "/company",
          children: []
        }     
      ]);
  
      const router = useRoute();
  
      const loadData = async () => {
        dialogLoader.value = true;
        dialogLoader.value = false;
      };
  
      onMounted(() => {
        nombre_usuario.value = store.state.username;
        handleResize();
        window.addEventListener("resize", handleResize);
        selectedItem.value = router.fullPath;
      });
  
      const rols = computed(() => {
        if (store.state.role === 'ROOT') {
          return 'root';
        } else if (store.state.role === 'MASTER') {
          return 'Administrador';
        }
        return '';
      });
  
      const filteredItems = computed(() => {
        if (store.state.role === 'ROOT') {
          return ItemsNavegation.value.filter(item => item.value === 'master'  );
        } else if (store.state.role === 'MASTER') {
          return ItemsNavegation.value.filter(item => item.value === 'company');
        } else {
          return [];
        }
      });
  
      const handleResize = () => {
        isMobile.value = window.innerWidth <= 500;
      };
  
      const selectItem = (item) => {
        selectedItem.value = item;
      };
  
      return {
        isMobile,
        drawer,
        rail,
        nombre_usuario,
        selectedItem,
        ItemsNavegation,
        filteredItems,
        selectItem,
        loadData,
        dialogLoader,
        rols
      };
    }
  };
  </script>
  
  <style>
  .selected-item-orange {
      background-color: #ff8c54 !important; /* Fondo con color #ff8c54 */
      color: white !important; /* Texto en blanco */
      border-right: 4px solid #e20303; /* Borde derecho más oscuro para contraste */
  }
  
  .v-list-item-title {
      font-size: 12px !important;
  }
  
  .v-list-item-subtitle {
      font-size: 13px !important;
  }
  
  .section_main {
      overflow-y: auto !important;
      height: 100%;
      padding-bottom: 2rem !important;
  }
  </style>
  