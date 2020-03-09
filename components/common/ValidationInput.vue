<template>
  <div>
    <label :for="name">
      {{ label }}
    </label>
    <input
      :value="value"
      :placeholder="placeholder"
      :type="inputType"
      class="default-input"
      :name="name"
      data-vv-validate-on="submit"
      @input="$emit('input', $event.target.value)"
    >

    <template v-if="serverErrors && Arra && serverErrors[errorProperty]">
      <ValidationBox v-for="err in serverErrors.email" :key="err" :message="err" />
    </template>
  </div>
</template>

<script>

export default {

  props: {
    submitted: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    serverErrors: {
type: Array,
default: []
    },
    errorProperty: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
input {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 280px;
}
</style>
