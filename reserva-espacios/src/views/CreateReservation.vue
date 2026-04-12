<template>
  <ion-page>
    <div class="container">

      <div class="back-btn" @click="$router.back()"><</div>

        <h2>Crear Reserva</h2>

        <!-- FECHA -->
        <div class="input-group">
          <br>
          <label>Fecha: </label>
          <input type="date" v-model="fecha" @change="cargarDisponibles" />
        </div>

        <!-- ESPACIO -->
        <div class="input-group">
          <br>
          <label>Espacio disponible: </label>
          <select v-model="espacioSeleccionado">
            <option disabled value=""> Seleccione </option>
            <option v-for="e in espacios" :key="e.id" :value="e.id">
              {{ e.nombre }} ({{ e.tipo }})
            </option>
          </select>
      </div>

        <!-- HORAS -->
        <div class="horas">
          <br>
          <div class="input-group">
            <label>Hora inicio: </label>
            <input type="time" v-model="horaInicio" />
          </div>
          <br>
          <div class="input-group">
            <label>Hora fin: </label>
            <input type="time" v-model="horaFin" />
          </div>

        </div>

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
  padding: 20px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.back-btn {
  color: white;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 25px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
}

input, select {
  padding: 8px;
  border-radius: 5px;
  border: none;
}

.horas {
  display: flex;
  gap: 10px;
}

</style>
