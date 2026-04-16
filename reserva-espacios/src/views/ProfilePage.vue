<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <div class="back-btn" @click="$router.back()"><</div>

            <!-- BOTÓN EDITAR -->
            <div class="edit-btn" @click="irEditar">
              <img src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png" />
            </div>

            <div class="profile-card">

              <img :src="user?.imagen || 'https://cdn-icons-png.flaticon.com/128/13464/13464146.png'" class="avatar" />

              <h2>{{ user?.nombre }} {{ user?.apellido }}</h2>
              <p class="rol">{{ user?.rol }}</p>

              <div class="info">
                <p>📧 {{ user?.email }}</p>
                <p>📱 {{ user?.telefono || "Sin teléfono" }}</p>
              </div>

            </div>

        </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";
import { IonPage, IonContent } from '@ionic/vue'

const router = useRouter();

const irEditar = () => {
  router.push("/edit-profile");
};

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

.profile-card {
  background: #1e1e1e;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  margin-top: 30px;

  box-shadow: 
    0 0 10px #ff004044,
    0 0 25px #ff0241,
    inset 0 0 10px #ffffff05;
}

.avatar {
  width: 110px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #fd003fb9;
  margin-bottom: 10px;
}

.rol {
  color: #ff2e63;
  margin-bottom: 15px;
}

.info p {
  margin: 5px 0;
}

.edit-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  background: #1e1e1e; 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit-btn img {
  width: 22px;
  height: 22px;
  filter: invert(1);
}

</style>
