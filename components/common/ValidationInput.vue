<template>
  <div>
    <div :class="containerBinds()">
      <label
        v-if="includeLabel"
        :for="name"
      >
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
        :style="inputStyles && inputStyles"
        :class="inputClasses && inputClasses"
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
    },
    inputStyles: {
      type: String,
      default: ''
    },
    inputClasses: {
      type: String,
      default: ''
    },
    containerStyles: {
      type: String,
      default: ''
    },
    containerClasses: {
      type: String,
      default: ''
    },
    includeLabel: {
      type: Boolean,
      default: true
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
    },
    containerBinds () {
      let classes = []
      if (this.inputType === 'password') {
        classes = [...classes, 'form__password']
      }
      if (this.containerClasses) {
        classes = [...classes, this.containerClasses]
      }
      return classes.join(' ')
    }
  }
}
</script>

<style scoped>
input {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 300px;
}
</style>
