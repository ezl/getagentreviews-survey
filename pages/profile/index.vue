<template>
  <div class="profile d-flex justify-center align-center h-100">
    <div v-if="user" class="d-flex flex-column align-center align-content-center">
      <b class="d-block">
        {{ user.name }}
      </b>

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
  layout: 'authed',
  data () {
    return {
      company: '',
      imgPreview: '',
      description: '',
      email_description: '',
      googleLink: '',
      yelpLink: '',
      file: ''
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
  middleware: 'fakepersist',
  mounted () {
    // temporary
    const userObj = this.$store.state.auth.user && this.$store.state.auth.user.profile
    if (!userObj && localStorage.getItem('auth_token')) {
      this.$store.dispatch('auth/getUser', localStorage.getItem('auth_token'))
    } else if (userObj) {
      this.company = userObj.company
      this.description = userObj.description
      this.googleLink = userObj.links && userObj.links.google
      this.yelpLink = userObj.links && userObj.links.yelp
    } else {
      this.$router.push('/login')
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
img {
  display: block;
  max-width: 60%;
  margin: 3px auto;
}
.button--purple {
  @include small('down') {
    margin-bottom: 180px;
  }
}
</style>
