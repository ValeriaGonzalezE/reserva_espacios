<template>
  <ion-page>
  <div class="page-center">
    <div class="wrapper register" :class="mode">

      <div class="info-text">
        RECUPERAR
      </div>

      <div class="form-box">
        <h2 style="color:white;">Recuperar contraseña</h2>

        <div class="input-box">
          <input v-model="email" placeholder="Correo electrónico" />
        </div>

        <button @click="send">Enviar</button>

        <div class="links">
          <router-link to="/login">Volver al login</router-link>
        </div>
      </div>

    </div>
  </div>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { ref } from "vue";
import api from "@/services/api";

const email = ref("");

const send = async () => {
  const res = await api.post("/forgot-password", {
    email: email.value
  });

  alert(res.data.message);
};
</script>
