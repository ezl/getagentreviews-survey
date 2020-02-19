<template>
  <div class="ratings">
    <h3 class="text-purple text-center">
      Agent Reviews
    </h3>
    <Rating v-if="!$store.state.reviews.rated" />
    <LocalFeedBack v-else-if="$store.state.reviews.rated && !$store.state.reviews.leftFeedBackLocal" />
    <ExternalFeedBack v-else-if="$store.state.reviews.feedback && !$store.state.reviews.leftFeedBackExternal" />
    <ThankYou v-else />
  </div>
</template>

<script>
import Rating from './Rating'
import LocalFeedBack from './LocalFeedBack'
import ExternalFeedBack from './ExternalFeedback'
import ThankYou from './ThankYou'
export default {
  components: {
    Rating,
    LocalFeedBack,
    ExternalFeedBack,
    ThankYou
  },
  data() {
    return {
    }
  },
  methods: {
    
  }
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

</style>
