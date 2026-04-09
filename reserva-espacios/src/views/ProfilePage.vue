<template>
  <ion-page>
    <div class="container">
      <div class="profile">

        <img src="https://i.imgur.com/6VBx3io.png" class="avatar" />

        <h2>{{ user?.nombre }}</h2>

        <p>📧 {{ user?.email }}</p>
        <p>🆔 {{ user?.codigo }}</p>
        <p>👤 {{ user?.rol }}</p>

      </div>
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

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.avatar {
  width: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
}

</style>
