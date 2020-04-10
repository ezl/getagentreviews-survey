<template>
  <div class="profile d-flex justify-center align-center h-100">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form class="d-flex flex-column align-center align-content-center" @submit.prevent="handleSubmit(updateProfile)">
        <b class="d-block">
          {{ user && user.name }}
        </b>

        <label
          class="default-file-upload"
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
        <div class="text-center">
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
          <span
            v-if="imgPreview"
            style="cursor:pointer;"
            href="#"
            @click="imgPreview = '', file = ''"
          >Keep Old Image</span>
        </div>
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
            container-classes="text-center"
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
            container-classes="text-center"
          />
          <ValidationBox v-if="submitted && errors.length" message="Link is not valid." />
        </ValidationProvider>
        <button
          class="button mt-4"
          :class="loading || invalid ? 'button--disabled' : 'button--purple'"
        >
          Update
        </button>
      </form>
    </ValidationObserver>
    <v-snackbar v-model="saved">
      Your profile has been updated.
      <v-btn color="success">
        Ok
      </v-btn>
    </v-snackbar>
  </div>
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
      saved: false
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
          this.saved = true
          this.loading = false
          this.$store.commit('auth/setUserImage', this.imgPreview)
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
  margin: 3px auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.button--purple {
  @include small('down') {
    margin-bottom: 180px;
  }
}
input, textarea {
  width: 250px;
}
</style>
