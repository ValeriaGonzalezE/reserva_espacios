<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

import BackButton from "@/components/ui/BackButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const reserva = ref({});

const nuevaFecha = ref("");
const nuevaHoraInicio = ref("");
const nuevaHoraFin = ref("");

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-CO");
};

onMounted(async () => {
  const res = await api.get(`/reservas/mis-reservas/` + localStorage.getItem("userId"));

  const encontrada = res.data.find(r => r.id == id);
  reserva.value = encontrada;

  nuevaFecha.value = encontrada.fecha.split("T")[0];
  nuevaHoraInicio.value = encontrada.hora_inicio;
  nuevaHoraFin.value = encontrada.hora_fin;
});

// guardar
const guardar = async () => {
  const res = await api.put(`/reservas/${id}`, {
    fecha: nuevaFecha.value,
    hora_inicio: nuevaHoraInicio.value,
    hora_fin: nuevaHoraFin.value
  });

  if (res.data.success) {
    alert("Reserva reprogramada");
    router.back();
  } else {
    alert(res.data.message);
  }
};

// cancelar
const cancelar = async () => {
  await api.put(`/reservas/cancelar/${id}`);
  alert("Reserva cancelada");
  router.back();
};
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <BackButton />

        <h2>Reprogramar Reserva</h2>

        <div class="card">
          <h3>Reserva actual</h3>
          <p>📅 {{ formatearFecha(reserva.fecha) }}</p>
          <p>⏰ {{ reserva.hora_inicio }} - {{ reserva.hora_fin }}</p>
        </div>

        <BaseInput label="Nueva fecha" type="date" v-model="nuevaFecha" />
        <BaseInput label="Hora inicio" type="time" v-model="nuevaHoraInicio" />
        <BaseInput label="Hora fin" type="time" v-model="nuevaHoraFin" />

        <BaseButton @click="guardar">Guardar cambios</BaseButton>

        <button class="cancelar" @click="cancelar">
          Cancelar reserva
        </button>

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

.card {
  background: #1e1e1e;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.cancelar {
  margin-top: 10px;
  background: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
}
</style>