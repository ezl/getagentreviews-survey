<template>
  <form enctype="multipart/form-data" @submit.prevent="addUser">
    <input
      placeholder="Enter Name"
      type="text"
      class="default-input"
      v-model="name"
    />
    <div v-if="errors && errors.errors.name">
      <span :key="i" v-for="(err, i) in errors.errors.name">
        {{ err }}
      </span>
    </div>
    <input
      placeholder="Enter Email"
      type="text"
      class="default-input"
      v-model="email"
    />
    <input
      placeholder="Enter Description"
      type="text"
      class="default-input"
      v-model="description"
    />
    <input
      placeholder="Enter Email Description"
      type="text"
      class="default-input"
      v-model="email_description"
    />
    <label class="default-file-upload" for="image">
      Upload Image
      <input
        placeholder="Upload Image"
        @change="getURL"
        type="file"
        name="image"
        id="image"
      />
    </label>
    <img v-if="imgPreview" :src="imgPreview" alt="" />
    <input
      placeholder="Your Google Review Link"
      type="text"
      class="default-input"
      v-model="googleLink"
    />
    <input
      placeholder="Your Yelp Link"
      type="text"
      class="default-input"
      v-model="yelpLink"
    />
    <button class="button button--success">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      imgPreview: '',
      description: '',
      email_description: '',
      googleLink: '',
      yelpLink: '',
      file: '',
      atest: '',
      errors: null
    }
  },
  methods: {
    getURL(e) {
      let fileList = Array.prototype.slice.call(e.target.files)
      fileList.forEach(f => {
        if (!f.type.match('image.*')) {
          alert('Please upload an image.')
          return
        }

        let reader = new FileReader()
        let that = this

        reader.onload = function(e) {
          that.imgPreview = e.target.result
        }
        reader.readAsDataURL(f)
      })

      this.file = e.target.files[0]

    },
    addUser() {
      // return
      this.$axios
        .post('/users', this.batch, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
          this.errors = err.response.data
        })
    }
  },
  computed: {
    links() {
      return {
        google: this.googleLink,
        yelp: this.yelpLink
      }
    },
    batch() {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('email', this.email)
      fd.append('image', this.file)
      fd.append('description', this.description)
      fd.append('email_description', this.email_description)
      fd.append('links', JSON.stringify(this.links))
      return fd
    }
  }
}
</script>

<style></style>
