<template>
  <ion-page>
  <div class="page-center">
    <div class="wrapper register" :class="mode">

      <div class="info-text">
        REGÍSTRATE
      </div>

      <div class="form-box">
        <h2 style="color:white;">Crear Cuenta</h2>

        <div class="input-box">
          <input v-model="nombre" placeholder="Nombre" />
        </div>

        <div class="input-box">
          <input v-model="email" placeholder="Email" />
        </div>

        <div class="input-box">
          <input type="password" v-model="password" placeholder="Contraseña" />
        </div>

        <button @click="register">Registrarse</button>

        <div class="links">
          <router-link to="/login">Ya tengo cuenta</router-link>
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
import { useRouter } from "vue-router";

const nombre = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  await api.post("/register", {
    nombre: nombre.value,
    apellido: "",
    email: email.value,
    codigo: email.value,
    password: password.value
  });

  alert("Usuario creado");
  router.push("/login");

  
document.activeElement.blur();
};
</script>
