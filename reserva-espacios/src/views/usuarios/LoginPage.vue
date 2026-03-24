<template>
  <ion-page>
  <div class="page-center">
    <div class="wrapper login">
    
      <!-- LADO IZQUIERDO -->
      <div class="info-text">
        BIENVENIDO
      </div>

      <!-- LADO DERECHO -->
      <div class="form-box">
        <h2 style="color:white;">Iniciar Sesión</h2>

        <div class="input-box">
          <input v-model="codigo" placeholder="Usuario o Email" />
        </div>

        <div class="input-box">
          <input type="password" v-model="password" placeholder="Contraseña" />
        </div>

        <button @click="login">Iniciar Sesión</button>

        <div class="links">
          <router-link to="/forgot">¿Olvidaste tu contraseña?</router-link>
          <br />
          <router-link to="/register">Crear cuenta</router-link>
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
import { useUserStore } from "@/stores/UserStore";

const codigo = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  try {
    const res = await api.post("/login", {
      codigo: codigo.value,
      password: password.value
    });

    if (res.data.success) {
      userStore.setUser(res.data.user, res.data.token);

      document.activeElement.blur();

      router.push("/home");
    } else {
      alert(res.data.message || "Credenciales incorrectas");
    }

  } catch (error) {
    console.error(error);
    alert("Error al conectar con el servidor");
  }
};

</script>
