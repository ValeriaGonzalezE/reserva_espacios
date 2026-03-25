<template>
  <ion-page>
    <div class="container">
      <h2>Perfil</h2>
      <p v-if="user">Usuario: {{ user.nombre }}</p>
        <p v-else>No hay usuario</p>
    </div>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const user = userStore.user;
</script>

<style>
.container {
  background: #0f0f0f;
  color: white;
  height: 100vh;
  padding: 20px;
}
</style>
