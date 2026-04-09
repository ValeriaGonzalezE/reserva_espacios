<template>
  <ion-page>
    <div class="container">
      <h2>Crear Reserva</h2>

      <input type="date" v-model="fecha" @change="cargarDisponibles" />

        <select v-model="espacioSeleccionado">
          <option disabled value="">Seleccione espacio</option>
          <option v-for="e in espacios" :key="e.id" :value="e.id">
            {{ e.nombre }} - {{ e.tipo }}
          </option>
        </select>

      <input type="time" v-model="horaInicio" />
      <input type="time" v-model="horaFin" />

      <button @click="reservar">Reservar</button>

    </div>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";

import api from "@/services/api";

const userStore = useUserStore();

const espacios = ref([]);
const espacioSeleccionado = ref("");
const fecha = ref("");
const horaInicio = ref("");
const horaFin = ref("");

const cargarDisponibles = async () => {
  const res = await api.get(`/espacios-disponibilidad?fecha=${fecha.value}`);

  espacios.value = res.data.filter(e => e.estado === "Disponible");
};

const reservar = async () => {
  await api.post("/reservas", {
    usuario_id: userStore.user.id,
    espacio_id: espacioSeleccionado.value,
    fecha: fecha.value,
    hora_inicio: horaInicio.value,
    hora_fin: horaFin.value
  });

  alert("Reserva creada");
};
</script>

<style>
.container {
  background: #0f0f0f;
  color: white;
  height: 100vh;
  padding: 20px;
}
</style>
