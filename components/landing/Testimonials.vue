<template>
  <div class="testimonials">
    <span class="d-block text-purple text-center">TESTIMONALS</span>
    <h2 class="text-center mb-7">
      What Clients Say About Us
    </h2>
    <div class="d-flex justify-center">
      <TestimonialCard quote="Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating." />
      <TestimonialCard quote="Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating." />
      <TestimonialCard quote="Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating." />
    </div>
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
