<template>
  <ion-page>
    <ion-content>

      <div class="container">
        <div class="back-btn" @click="$router.back()"><</div>

            <h2>Mis Espacios</h2>

            <div v-for="e in espacios" :key="e.id" class="card">

              <!-- BOTÓN EDITAR -->
              <img src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"  class="edit-btn" style="filter: invert(1);"
                @click.stop="verEspacio(e.id)" />

              <!-- CLICK PARA VER RESERVAS -->
              <div @click="verReservas(e.id)">
                <img v-if="e.imagen" :src="e.imagen" class="img" />
                <h3>{{ e.nombre }}</h3>
                <p>{{ e.descripcion }}</p>
                <br>
                <p>Tipo de espacio: {{ e.tipo }}</p>
                <p>📍Ubicacion: {{ e.ubicacion }}</p>
                <p>👥 Capacidad: {{ e.capacidad }}</p>

                <p v-if="e.requiere_pago === 'si'">
                  💰Precio ${{ e.precio }}
                </p>
                <p v-else>🆓 Sin Precio</p>
                <br>
                <p :class="e.estado === 'activo' ? 'ok' : 'bad'">
                  {{ e.estado }}
                </p>

              </div>

            </div>


        </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/UserStore";
import { IonPage, IonContent } from '@ionic/vue'
import { useRouter } from "vue-router";

const router = useRouter();

const verReservas = (id) => {
  router.push(`/space-reservations/${id}`);
};

const verEspacio = (id) => {
  router.push(`/space-edit/${id}`);
};

const userStore = useUserStore();
const espacios = ref([]);

onMounted(async () => {
  const res = await api.get(`/mis-espacios/${userStore.user.id}`);
  espacios.value = res.data;
});
</script>

<style>
.container {
  padding: 20px;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
}

.back-btn {
  font-size: 25px;
  cursor: pointer;
  margin-bottom: 10px;
}

/* CARD */
.card {
  position: relative;
  background: #1e1e1e;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #ff2e63;
  border-radius: 8px;
}

/* BOTÓN EDITAR */
.edit-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #e1e0e0;
  width: 25px;
  height: 25px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit-btn img {
  width: 20px;
  height: 20px;
}


/* HOVER */
.edit-btn:hover {
  transform: scale(1.2);
}

/* ESTADOS */
.ok {
  color: #00ff9d;
}

.bad {
  color: #ff4d4d;
}

.img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
}

</style>
