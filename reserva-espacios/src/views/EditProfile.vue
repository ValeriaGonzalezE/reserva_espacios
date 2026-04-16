<template>
  <ion-page>
    <ion-content>
      <div class="container">

        <div class="back-btn" @click="$router.back()"><</div>

        <h2>Editar Perfil</h2>

        <!-- FOTO -->
        <div class="foto">
          <img :src="imagen || defaultImg" class="avatar" />
          <input type="file" @change="cambiarImagen" />
        </div>

        <!-- DATOS -->
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="nombre" />
        </div>

        <div class="input-group">
          <label>Apellido</label>
          <input v-model="apellido" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" />
        </div>

        <div class="input-group">
          <label>Teléfono</label>
          <input v-model="telefono" />
        </div>

        <div class="input-group">
          <label>Contraseña (opcional)</label>
          <input type="password" v-model="password" />
        </div>

        <button @click="guardar">Guardar cambios</button>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import api from "@/services/api";
import { IonPage, IonContent } from '@ionic/vue'

const userStore = useUserStore();

const nombre = ref(userStore.user.nombre);
const apellido = ref(userStore.user.apellido);
const email = ref(userStore.user.email);
const telefono = ref(userStore.user.telefono || "");
const password = ref("");
const imagen = ref(userStore.user.imagen || "");

const defaultImg = "https://cdn-icons-png.flaticon.com/128/13464/13464146.png";

// CAMBIAR IMAGEN (base64 simple)
const cambiarImagen = (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    imagen.value = reader.result;
  };
  reader.readAsDataURL(file);
};

// GUARDAR
const guardar = async () => {
  try {
    const res = await api.put(`/usuario/${userStore.user.id}`, {
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      telefono: telefono.value,
      password: password.value,
      imagen: imagen.value
    });

    if (res.data.success) {
      alert("Cambios guardados correctamente");

      userStore.user = {
        ...userStore.user,
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        telefono: telefono.value,
        imagen: imagen.value
      };
    }

  } catch (error) {
    console.log(error);
    alert("Error al guardar");
  }
};

</script>

<style>
.container {
  padding: 20px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.foto {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  border-radius: 5px;
  border: none;
}

button {
  background: #ff2e63;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  width: 100%;
}
</style>
