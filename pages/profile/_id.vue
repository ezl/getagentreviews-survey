<template>
  <div class="profile d-flex justify-center align-center h-100">
    <div v-if="user" class="d-flex flex-column align-center">
      <span class="d-block">
        {{ user.name }}
        {{ this.$route.params }}
      </span>

      <label
        class="default-file-upload"
        for="image"
      >
        <template v-if="!user.profile.image">Upload Image</template>
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
          v-if="user.profile.image && !imgPreview"
          :src="user.profile.image"
          :alt="`${user.name}'s profile image`"
        >
        <span v-if="imgPreview" style="cursor:pointer;" href="#" @click="imgPreview = '', file = ''">Keep Old Image</span>
        </span>
      </div>
      <label for="company">Company</label>
      <input
        v-model="company"
        placeholder="Your Company"
        type="text"
        class="default-input"
        name="company"
      >
      <label for="description">Description</label>
      <input
        v-model="description"
        placeholder="Your Description"
        type="text"
        class="default-input"
        name="description"
      >
      <label for="google">Google</label>
      <input
        v-model="googleLink"
        placeholder="Your Google Review Link"
        type="text"
        class="default-input"
        name="google"
      >
      <label for="yelp">Yelp</label>
      <input
        v-model="yelpLink"
        placeholder="Your Yelp Link"
        type="text"
        class="default-input"
        name="yelp"
      >
      <button class="button button--purple mt-4" @click="updateProfile">
        Update
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      company: '',
      imgPreview: '',
      description: '',
      email_description: '',
      googleLink: '',
      yelpLink: '',
      file: '',
      user: ''
    }
  },
  computed: {
    links () {
      return {
        google: this.googleLink,
        yelp: this.yelpLink
      }
    }
  },
  mounted () {
    this.getTestUser()
  },
  methods: {
    updateProfile () {
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
          console.log(data)
          alert('Your profile has been updated.')
        })
        .catch((err) => {
          console.log(err)
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
    },
    async getTestUser () {
      const res = await this.$axios.get(`/users/${this.$route.params.id}`)
      console.log(res.data)
      this.user = res.data
      this.company = this.user.profile.company
      this.description = this.user.profile.description
      this.googleLink = this.user.profile.links.google
      this.yelpLink = this.user.profile.links.yelp
    }
  }
}
</script>

<style scoped>
img {
  display: block;
  max-width: 60%;
  margin: 3px auto;
}
</style>
