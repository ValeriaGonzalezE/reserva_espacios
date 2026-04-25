<template>
  <div>

    <BaseInput v-for="f in fields"
      :key="f.model"
      v-model="form[f.model]"
      :type="f.type || 'text'"
      :placeholder="f.placeholder"
    />

    <BaseButton @click="$emit('submit', form)">
      {{ buttonText }}
    </BaseButton>

  </div>
</template>

<script setup>
import { reactive } from "vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps({
  fields: Array,
  buttonText: String
});

const form = reactive({});
</script>