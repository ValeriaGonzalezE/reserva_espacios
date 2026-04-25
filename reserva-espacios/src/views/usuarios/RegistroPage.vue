<template>
  <ion-page>
    <ion-content>

      <AuthLayout>

        <template #left>
          REGÍSTRATE
        </template>

        <h2>Crear Cuenta</h2>

        <AuthForm :fields="[
          { model: 'nombre', placeholder: 'Nombre' },
          { model: 'email', placeholder: 'Email' },
          { model: 'password', type: 'password', placeholder: 'Contraseña' }
        ]" buttonText="Registrarse" @submit="register" />

        <router-link to="/login">Ya tengo cuenta</router-link>

      </AuthLayout>
    </ion-content>
  </ion-page>
</template>

<script setup>
import AuthLayout from "@/components/users/AuthLayout.vue";
import AuthForm from "@/components/users/AuthForm.vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

const router = useRouter();

const register = async (form) => {
  await api.post("/register", {
    ...form,
    apellido: "",
    codigo: form.email
  });

  alert("Usuario creado");
  router.push("/login");
};
</script>
