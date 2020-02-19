<template>
  <div class="ratings">
    <h3 class="text-purple text-center">
      Agent Reviews
    </h3>
    <RatingsContent button-title="Save Review" :button-cta="saveReview">
      <template slot="title">
        How was your experience with <b>John Smith</b>?
      </template>
      <template slot="subtitle">
        We won't publish your responses until after you confirm his review here.
      </template>
      <template slot="body">
        <RatingsStars />
      </template>
    </RatingsContent>
  </div>
</template>

<script>
import RatingsStars from './RatingStars'
import RatingsContent from './RatingsContent'
export default {
  components: {
    RatingsStars,
    RatingsContent
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

.ratings {
  font-size: 17px;
}
.ratings__stars {
  justify-content: space-between;
  width: 95%;
  height: 150px;
}
.ratings__star {
  i {
    font-size: 50px;
    color: $purple;
    cursor: pointer;
  }
}
.fas {
  transition: transform $default-timing;
  &:hover {
    transform: translateY(-5px);
  }
}
.ratings__star-text {
  font-size: 16px;
  color: rgb(173, 170, 170);
}
.ratings__star-is-chosen {
  opacity: 0.9;
  &:hover {
    opacity: 1;
    transform: translateY(0);
  }
}
.button--purple {
  width: 60%;
  border-radius: 50px;
}
</style>
