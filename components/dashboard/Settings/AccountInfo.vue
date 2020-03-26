<template>
  <v-container>
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form @submit.prevent="handleSubmit(updateProfile)">
        <div>
          <img
            v-if="imgPreview"
            :src="imgPreview"
            alt=""
          >
          <img
            v-if="user && user.profile.image && !imgPreview"
            :src="user && user.profile.image"
            :alt="`${user.name}'s profile image`"
          >
        </div>
        <label
          class="text-file-upload d-block"
          for="image"
        >
          <template v-if="user && !user.profile.image">Upload Image</template>
          <template v-else>Change Image</template>
          <input
            id="image"
            placeholder="Upload Image"
            type="file"
            name="image"
            @change="getURL"
          >
        </label>
        <label for="company">Company</label>
        <input
          v-model="company"
          placeholder="Company"
          type="text"
          class="default-input"
          name="company"
        >
        <label for="description">Description</label>

        <textarea
          v-model="description"
          placeholder="Description"
          type="text"
          class="default-input"
          name="description"
        />
        <ValidationProvider v-slot="{ errors }" rules="url">
          <ValidationInput
            v-model="googleLink"
            placeholder="Google Link"
            input-type="text"
            name="google-link"
            label="Google"
            :default-input-styling="false"
            input-classes="default-input"
            input-styles="width: 250px;"
          />
          <ValidationBox v-if="submitted && errors.length" message="Link is not valid." />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="url">
          <ValidationInput
            v-model="yelpLink"
            placeholder="Yelp Link"
            input-type="text"
            name="yelp-link"
            label="Yelp"
            :default-input-styling="false"
            input-classes="default-input"
            input-styles="width: 250px;"
          />
          <ValidationBox v-if="submitted && errors.length" message="Link is not valid." />
        </ValidationProvider>
        <!-- <button
          class="button mt-4"
          :class="loading || invalid ? 'button--disabled' : 'button--white'"
        >
          Cancel
        </button> -->
        <button
          class="button mt-4"
          :class="loading || invalid ? 'button--disabled' : 'button--purple'"
        >
          Save
        </button>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ValidationBox from '~/components/misc/ValidationBox'
import ValidationInput from '~/components/common/ValidationInput'
export default {
  components: {
    ValidationProvider,
    ValidationBox,
    ValidationObserver,
    ValidationInput
  },
  layout: 'authed',
  data () {
    return {
      company: '',
      imgPreview: '',
      description: '',
      email_description: '',
      googleLink: '',
      yelpLink: '',
      file: '',
      loading: false,
      submitted: false,
      copyOfUser: null
    }
  },
  computed: {
    links () {
      return {
        google: this.googleLink,
        yelp: this.yelpLink
      }
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  middleware: 'authed',
  mounted () {
    const userObj = this.$store.state.auth.user && this.$store.state.auth.user.profile
    if (userObj) {
      this.company = userObj.company
      this.description = userObj.description
      this.googleLink = userObj.links && userObj.links.google
      this.yelpLink = userObj.links && userObj.links.yelp
    }
    this.copyOfUser = this.$store.state.auth.user
  },
  methods: {
    updateProfile () {
      this.loading = true
      this.submitted = true
      const fd = new FormData()
      fd.append('company', this.company)
      fd.append('image', this.file)
      fd.append('description', this.description)
      fd.append('links', JSON.stringify(this.links))
      fd.append('id', this.user.id)
      this.$axios.post('/profile/update', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({ data }) => {
          alert('Your profile has been updated.')
          this.loading = false
          this.$store.commit('auth/setUserImage', this.imgPreview)
          this.$store.commit('auth/setUser', data.user)
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    getURL (e) {
      const fileList = Array.prototype.slice.call(e.target.files)
      fileList.forEach((f) => {
        if (!f.type.match('image.*')) {
          alert('Please upload an image.')
          return
        }

        const reader = new FileReader()
        const that = this

        reader.onload = function (e) {
          that.imgPreview = e.target.result
        }
        reader.readAsDataURL(f)
      })

      this.file = e.target.files[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
img {
  display: block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
input, textarea {
  width: 250px;
}
button {
    width: 150px;
}
form {
    @include small("down") {
        padding-bottom: 40px;
    }
}
</style>
