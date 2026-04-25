<template>
  <ion-page>
    <ion-content>

      <AuthLayout>

        <template #left>
          BIENVENIDO
        </template>

        <h2>Iniciar Sesión</h2>

        <AuthForm :fields="[
          { model: 'codigo', placeholder: 'Usuario o Email' },
          { model: 'password', type: 'password', placeholder: 'Contraseña' }
        ]" buttonText="Iniciar Sesión" @submit="login" />

        <div class="links">
          <router-link to="/forgot">¿Olvidaste tu contraseña?</router-link>
          <router-link to="/register">Crear cuenta</router-link>
        </div>

      </AuthLayout>
    </ion-content>
  </ion-page>
</template>

<script setup>
import AuthLayout from "@/components/users/AuthLayout.vue";
import AuthForm from "@/components/users/AuthForm.vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

const router = useRouter();
const userStore = useUserStore();

const login = async (form) => {
  const res = await api.post("/login", form);

  if (res.data.success) {
    userStore.setUser(res.data.user, res.data.token);
    router.push("/home");
  } else {
    alert("Credenciales incorrectas");
  }
};
</script>