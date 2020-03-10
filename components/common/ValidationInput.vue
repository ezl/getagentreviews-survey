<template>
  <div>
    <div :class="inputType === 'password' && 'form__password'">
      <label :for="name">
        {{ label }}
      </label>
      <span v-if="inputType === 'password'"><i
        class="fas fa-eye"
        @click="toggleShowPassword"
      /></span>
      <input
        :ref="inputType === 'password' && 'password'"
        :value="value"
        :placeholder="placeholder"
        :type="inputType"
        class="default-input"
        :name="name"
        data-vv-validate-on="submit"
        @input="$emit('input', $event.target.value)"
      >
      <template v-if="serverErrors && Array.isArray(serverErrors) && serverErrors[errorProperty]">
        <ValidationBox v-for="err in serverErrors[errorProperty]" :key="err" :message="err" />
      </template>
    </div>
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
      default: () => {}
    },
    errorProperty: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      passwordInput: false
    }
  },
  mounted () {
    if (this.inputType === 'password') {
      this.passwordInput = true
    }
  },
  methods: {
    toggleShowPassword () {
      this.showPass = !this.showPass
      if (this.showPass) {
        this.$refs.password.type = 'text'
      } else {
        this.$refs.password.type = 'password'
      }
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
