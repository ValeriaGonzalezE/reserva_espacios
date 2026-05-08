<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

import BackButton from "@/components/ui/BackButton.vue";
import PageHeader from "@/components/ui/PageHeader.vue";
import SpaceCard from "@/components/espacios/SpaceCard.vue";

const router = useRouter();
const userStore = useUserStore();

const espacios = ref([]);
const loading = ref(true);

const cargarEspacios = async () => {
  try {
    if (!userStore.user?.id) return;

    const res = await api.get(`/espacios/mis-espacios/${userStore.user.id}`);
    espacios.value = res.data;

    console.log("MIS ESPACIOS:", res.data);
  } catch (err) {
    console.error("ERROR MIS ESPACIOS:", err);
  } finally {
    loading.value = false;
  }
};

const editarEspacio = (id) => {
  router.push(`/space-edit/${id}`);
};

const verReservas = (id) => {
  router.push(`/space-reservations/${id}`);
};

onMounted(async () => {
  await cargarEspacios();
});
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="page">

        <BackButton class="back-floating" />
        <PageHeader titulo="MIS ESPACIOS" />

        <div class="container">

          <div v-if="loading" class="loading">
            Cargando espacios...
          </div>

          <div v-else-if="espacios.length === 0" class="empty">
            No tienes espacios registrados
          </div>

          <div v-else class="grid">
            <SpaceCard
              v-for="espacio in espacios"
              :key="espacio.id"
              :espacio="espacio"
              :mostrarEditar="true"
              @editar="editarEspacio"
              @verReservas="verReservas"
            />
          </div>

        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a0005);
  color: white;
  padding: 20px;
}

.container {
  margin-top: 80px;
}

.back-floating {
  position: absolute;
  top: 32px;
  left: 35px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.loading, .empty {
  text-align: center;
  color: #aaa;
  margin-top: 40px;
}
</style>