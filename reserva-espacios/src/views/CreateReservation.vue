<template>
  <ion-page>
    <div class="container">
      <h2>Crear Reserva</h2>

      <input v-model="fecha" type="date" />
      <input v-model="hora" type="time" />

      <button @click="crear">Reservar</button>
    </div>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { ref } from "vue";

const fecha = ref("");
const hora = ref("");

const crear = () => {
  alert(`Reserva creada: ${fecha.value} ${hora.value}`);
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
