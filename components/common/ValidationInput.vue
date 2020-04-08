<template>
  <div>
    <div :ref="focus && 'focus'" :class="containerBinds()">
      <label
        v-if="includeLabel"
        :for="name"
      >
        {{ label }}
      </label>
      <template v-if="inputType === 'password'">
        <span v-if="!showPass" class="show-pass" @click="toggleShowPassword"><p>SHOW</p></span>
        <span v-if="showPass" class="show-pass" @click="toggleShowPassword"><p>HIDE</p></span>
      </template>
      <input
        :ref="inputType === 'password' && 'password'"
        :value="value"
        :placeholder="placeholder"
        :type="inputType"
        :name="name"
        :style="inputStyles && inputStyles"
        :class="classBinds()"
        @input="$emit('input', $event.target.value)"
      >
      <template v-if="serverErrors && serverErrors.errors && serverErrors.errors[errorProperty]">
        <ValidationBox v-for="err in serverErrors.errors[errorProperty]" :key="err" :message="err" />
      </template>
    </div>
  </div>
</template>

<script>
import ValidationBox from '~/components/misc/ValidationBox'
export default {
  components: {
    ValidationBox
  },
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
    },
    focus: {
      type: Boolean,
      default: false
    },
    defaultInputStyling: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      passwordInput: false,
      showPass: false
    }
  },
  computed: {
    serverErrors () {
      return this.$store.state.auth.serverErrors
    }
  },
  watch: {
    focus (newFocus, oldFocus) {
      if (newFocus === true) {
        this.focusInput()
      }
    }
  },
  mounted () {
    if (this.inputType === 'password') {
      this.passwordInput = true
    }
    if (this.focus) {
      this.$refs.focus.children[1].focus()
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
    },
    focusInput () {
      this.$nextTick(() => {
        this.$refs.focus.children[1].focus()
      })
    },
    classBinds () {
      let classes = []
      if (this.defaultInputStyling) {
        classes = [...classes, 'default-input']
      }
      if (this.inputClasses) {
        classes = [...classes, this.inputClasses]
      }
      return classes
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
