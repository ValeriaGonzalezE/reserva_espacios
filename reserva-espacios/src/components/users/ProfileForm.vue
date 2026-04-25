<template>
  <div>

    <BaseInput v-model="form.nombre" placeholder="Nombre" />
    <BaseInput v-model="form.apellido" placeholder="Apellido" />
    <BaseInput v-model="form.email" placeholder="Email" />
    <BaseInput v-model="form.telefono" placeholder="Teléfono" />
    <BaseInput type="password" v-model="form.password" placeholder="Contraseña" />

    <BaseButton @click="$emit('submit', form)">
      Guardar cambios
    </BaseButton>

  </div>
</template>

<script setup>
import { reactive } from "vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps({
  user: Object
});

const form = reactive({ ...props.user, password: "" });
</script>