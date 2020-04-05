<template>
  <div id="testimonials" class="testimonials">
    <span class="d-block text-purple text-center">TESTIMONALS</span>
    <h2 class="text-center mb-7">
      What Clients Say About Us
    </h2>
    <v-container>
      <v-row justify="center">
          <TestimonialCard name="Kip Collison" company="ROYALBUILDINGS" job="CEO and Manager" img="https://loremflickr.com/640/360" quote="Above and beyond service, was nervous setting up reviews but found clients appreciate sharding knowledge and helping one another" />
          <TestimonialCard name="Sibabalwe Rubusana" company="SalesHub" job="Owner" img="https://loremflickr.com/640/360" quote="Easy to use with a fantastic set of features. Saved me using several apps install" />
          <TestimonialCard name="Stormie Hansford" company="Realhousingestate" job="CEO" img="https://loremflickr.com/640/360" quote="Fair pricing. Great customer service. When I needed help, they were pretty quick to resolve for me. Would recommend over some other review websites that I have" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TestimonialCard from './Testimonials/TestimonialCard'
export default {
  components: {
    TestimonialCard
  }
}
</script>

<style>

</style>
