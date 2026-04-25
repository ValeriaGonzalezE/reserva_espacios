<template>
  <ion-page>
    <ion-content>

      <BackButton />

      <ProfileCard :user="user" />

      <BaseButton @click="irEditar">
        Editar perfil
      </BaseButton>

    </ion-content>
  </ion-page>
</template>

<script setup>
import ProfileCard from "@/components/users/ProfileCard.vue";
import BackButton from "@/components/ui/BackButton.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const user = useUserStore().user;
const router = useRouter();

const irEditar = () => {
  router.push("/edit-profile");
};
</script>
