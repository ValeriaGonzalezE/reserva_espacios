<template>
  <ion-page>
    <ion-content>

      <BackButton />

      <h2>Editar Perfil</h2>

      <ProfileForm :user="user" @submit="guardar" />

    </ion-content>
  </ion-page>
</template>

<script setup>
import ProfileForm from "@/components/users/ProfileForm.vue";
import BackButton from "@/components/ui/BackButton.vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const user = userStore.user;

const guardar = async (form) => {
  const res = await api.put(`/usuario/${user.id}`, form);

  if (res.data.success) {
    alert("Actualizado");
    userStore.user = { ...userStore.user, ...form };
  }
};
</script>