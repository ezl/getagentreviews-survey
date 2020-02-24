<template>
  <form enctype="multipart/form-data" @submit.prevent="addUser">
    {{ url }}
    {{ file }}
    <input
      placeholder="Enter Name"
      type="text"
      class="default-input"
      v-model="name"
    />
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
    <img v-if="url" :src="url.src" alt="" />
    <input
      placeholder="Your Google Review Link"
      type="text"
      class="default-input"
      v-model="googleLink"
    />
    <input
      placeholder="Your Other Link"
      type="text"
      class="default-input"
      v-model="anotherLink"
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
      url: '',
      description: '',
      email_description: '',
      googleLink: '',
      anotherLink: '',
      file: ''
    }
  },
  methods: {
    getURL(e) {
      const file = e.target.files[0]
      this.file = e.target.files[0]
      console.log(file)
      this.url = { imageObj: file, src: URL.createObjectURL(file) }
    },
    addUser() {
      console.log(this.batch)
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
          console.log(err)
        })
    }
  },
  computed: {
    links() {
      return {
        google: this.googleLink,
        anotherLink: this.anotherLink
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
