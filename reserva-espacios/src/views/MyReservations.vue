<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";

import BackButton from "@/components/ui/BackButton.vue";
import ReservationCard from "@/components/reservations/ReservationCard.vue";

const router = useRouter();
const userStore = useUserStore();

const reservas = ref([]);

// cargar reservas
const cargar = async () => {
  const res = await api.get(`/mis-reservas/${userStore.user.id}`);
  console.log("RESERVAS:", res.data);
  reservas.value = res.data;
};


// cancelar
const cancelar = async (id) => {
  if (!confirm("¿Cancelar reserva?")) return;

  await api.put(`/reservas/cancelar/${id}`);
  alert("Reserva cancelada");
  cargar();
};

// editar
const editar = (reserva) => {
  router.push(`/edit-reservation/${reserva.id}`);
};

onMounted(cargar);
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <BackButton />

        <h2>Mis Reservas</h2>

        <div v-if="reservas.length">

          <ReservationCard v-for="r in reservas" :key="r.id" :reserva="r" @editar="editar" @cancelar="cancelar" />

        </div>

        <div v-else class="no-results">
          No tienes reservas
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<style>
.container {
  padding: 20px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.no-results {
  text-align: center;
  color: #aaa;
}
</style>