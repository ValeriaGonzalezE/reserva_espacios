<template>
  <ion-page>
    <ion-content>

      <div class="page">

        <BackButton class="back-floating" />

        <PageHeader titulo="MI PERFIL" />

        <div class="container">

          <ProfileCard :user="user" />

          <div class="actions">

            <BaseButton @click="irEditar">
              Editar perfil
            </BaseButton>

            <button
              class="logout-btn"
              @click="logout"
            >
              Cerrar sesión
            </button>

          </div>

        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import ProfileCard from "@/components/users/ProfileCard.vue";

import BackButton from "@/components/ui/BackButton.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PageHeader from "@/components/ui/PageHeader.vue";

import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const user = userStore.user;

const router = useRouter();

const irEditar = () => {
  router.push("/edit-profile");
};

const logout = () => {

  userStore.logout();

  router.replace("/login");

};
</script>

<style scoped>

.page {
  min-height: 100vh;
  background:
    linear-gradient(135deg, #0f0f0f, #1a0005);
  color: white;
}

.back-floating {
  position: absolute;
  top: 32px;
  left: 35px;
  z-index: 10;
}

.container {
  padding: 20px;
  padding-top: 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logout-btn {
  background: transparent;
  border: 1px solid #ff4d4d;
  color: #ff4d4d;
  padding: 14px;
  border-radius: 14px;
  font-weight: bold;
}

</style>
