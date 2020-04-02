<template>
  <v-container>
    <div class="footer">
      <v-divider class="mx-4 mb-4" />
      <div class="d-flex justify-space-between">
        <div>
          <nuxt-link class="footer__link" to="/about">
            About us
          </nuxt-link>
          <nuxt-link class="footer__link" to="/faq">
            FAQ
          </nuxt-link>
          <nuxt-link class="footer__link" to="/terms">
            Terms & Conditions
          </nuxt-link>
          <nuxt-link class="footer__link" to="/privacy">
            Privacy
          </nuxt-link>
        </div>
        <div>
          <span>Copyright @Agent Reviews {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      links: ['About', 'Contact', 'Some other link']
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 100px;
}
.footer, .footer__link {
  color: rgb(156, 155, 155);
}
.footer__link, span {
  margin: 0 8px;
}
.footer__link {
  &:hover {
    text-decoration: underline;
  }
}
</style>
