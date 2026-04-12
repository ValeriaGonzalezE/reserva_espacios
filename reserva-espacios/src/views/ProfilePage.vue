<template>
  <ion-page>
    <div class="container">
      <div class="back-btn" @click="$router.back()"><</div>
      <div class="profile">

        <img src="https://cdn-icons-png.flaticon.com/128/13464/13464146.png" class="avatar" />

        <h2>👤 {{ user?.rol }}:   {{ user?.nombre }}</h2>

        <p>📧 {{ user?.email }}</p>

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

.back-btn {
  color: white;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 25px;
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
  background-color: white;
}

</style>
