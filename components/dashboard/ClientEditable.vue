<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <form v-click-outside="submit" @submit.prevent="handleSubmit(() => {updateClient(updateField, updateData) })">
      <ValidationProvider :rules="rules">
        <ValidationInput
          v-model="updateData"
          :input-type="'text'"
          name="client-email-name"
          :default-input-styling="false"
          :input-classes="`${classes}`"
          :input-styles="styles"
          :focus="invalid && true"
        />
      </ValidationProvider>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ValidationInput from '~/components/common/ValidationInput'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ValidationInput
  },
  props: {
    updateField: {
      type: String,
      default: ''
    },
    updateItem: {
      type: String,
      default: ''
    },
    initialData: {
      type: String,
      default: ''
    },
    client: {
      type: Object,
      default: () => {}
    },
    inputType: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    styles: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      updateData: '',
      invalid: true
    }
  },
  mounted () {
    this.updateData = this.initialData
  },
  methods: {
    updateClient (item, data) {
      if (this.updateData === this.initialData) {
        this.$store.commit('clients/fieldAction', { action: 'remove', item: this.updateItem, data: this.client[this.updateField] })
        return
      }
      this.$store.dispatch('clients/updateClient', {
        current: this.client,
        item,
        data
      })
    },
    submit () {
      this.invalid = false
      this.$refs.form.validate()
        .then((success) => {
          if (this.updateField === 'email') {
            if (this.updateData === this.initialData) {
              this.$store.commit('clients/fieldAction', { action: 'remove', item: this.updateItem, data: this.client[this.updateField] })
              return
            }
            const exists = this.$store.state.clients.all.find(client => client.email === this.updateData)
            if (exists) {
              success = false
              alert('That email already exists.')
            }
          }
          if (!success) {
            this.invalid = true
            return
          }
          this.updateClient(this.updateField, this.updateData)
        })
    }
  }
}
</script>

<style>

</style>
