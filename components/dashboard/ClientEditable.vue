<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(() => {updateClient(updateField, updateData) })">
      <ValidationProvider :rules="rules">
        <ValidationInput
          v-model="updateData"
          :input-type="'text'"
          name="client-email-name"
          :default-input-styling="false"
          :input-classes="`w-100 ${classes}`"
          :input-styles="styles"
          :focus="true"
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
      updateData: ''
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
    }
  }
}
</script>

<style>

</style>
