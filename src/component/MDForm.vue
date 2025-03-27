<script setup>
const model = defineModel()
defineProps({
  formId: String,
  labelText: String,
  formType: String,
  autoComplete: String,
})
</script>
<template>
  <div class="form-wrapper">
    <label :for="formId">{{ labelText }}</label>
    <input
      v-model="model"
      :type="formType"
      :id="formId"
      :title="formId"
      :placeholder="labelText"
      :autocomplete="autoComplete"
    />
  </div>
</template>
<style scoped>
label {
  color: var(--md-on-surface);
  margin-left: 4px;
  font-size: 14px;
}

input {
  display: block;
  height: 40px;
  outline: 1px solid;
  outline-color: var(--md-outline);
  background-color: var(--md-surface);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 18px;
  border: none;
}

input:focus {
  outline-color: var(--md-primary);
  outline-width: 2px;
}

input::placeholder {
  color: var(--md-outline);
}
</style>
