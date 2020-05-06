<template>
  <div id="testimonials" class="testimonials">
    <span class="d-block text-purple text-center">TESTIMONALS</span>
    <h2 class="text-center mb-7">
      What Clients Say About Us
    </h2>
    <v-container>
      <v-row justify="center">
        <TestimonialCard
          company-img="https://seeklogo.com/images/R/real-estate-badge-logo-CFCDE29881-seeklogo.com.png"
          name="Kip Collison"
          company="ROYALBUILDINGS"
          job="CEO and Manager"
          img="https://thispersondoesnotexist.com/image"
          quote="Above and beyond service, was nervous setting up reviews but found clients appreciate sharding knowledge and helping one another"
        />
        <TestimonialCard
          company-img="https://windermererefresh.com/wp-content/uploads/2018/04/ICON-Windermere-Real-Estate-1.png"
          name="Sibabalwe Rubusana"
          company="SalesHub"
          job="Owner"
          img="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg"
          quote="Easy to use with a fantastic set of features. Saved me using several apps install"
        />
        <TestimonialCard
          company-img="https://corbiandcompany.com/wp-content/uploads/2016/11/logo-horizontal.png"
          name="Stormie Hansford"
          company="Realhousingestate"
          job="CEO"
          img="https://ideapod.com/wp-content/uploads/2017/08/person-1.jpg"
          quote="Fair pricing. Great customer service. When I needed help, they were pretty quick to resolve for me. Would recommend over some other review websites that I have"
        />
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
