<template>
  <div>
    <label class="default-file-upload" for="image">
      Upload Image
      <input
        id="image"
        placeholder="Upload Image"
        type="file"
        name="image"
        @change="getURL"
      >
    </label>
    -->
    <img v-if="imgPreview" :src="imgPreview" alt="">
    <input
      v-model="googleLink"
      placeholder="Your Google Review Link"
      type="text"
      class="default-input"
    >
    <input
      v-model="yelpLink"
      placeholder="Your Yelp Link"
      type="text"
      class="default-input"
    >
  </div>
</template>

<script>
export default {
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
    }
  },
  methods: {
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

<style></style>
