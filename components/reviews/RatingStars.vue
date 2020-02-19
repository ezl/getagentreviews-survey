<template>
   <div class="ratings__stars d-flex">
          <span
            class="ratings__star text-center"
            v-for="(star, index) in ratings"
            :key="star.rating"
          >
            <i
              @mouseout="hovered = hovered.filter(each => each !== index)"
              @mouseover="hovered = [...hovered, index]"
              @click="$store.commit('reviews/setChosen', star.rating)"
              :class="[
                hovered.includes(index) ||
                $store.state.reviews.chosen >= star.rating
                  ? 'fas fa-star'
                  : 'far fa-star',
                $store.state.reviews.chosen >= star.rating
                  ? 'ratings__star-is-chosen'
                  : ''
              ]"
              class="d-block"
            ></i>
            <span :class="$store.state.reviews.chosen === star.rating && 'bold text-purple'" class="text-center ratings__star-text">{{ star.text }}</span>
          </span>
        </div>
</template>

<script>
export default {
data () {
    return {
           ratings: [
        { rating: 1, text: 'Awful' },
        { rating: 2, text: 'Not great' },
        { rating: 3, text: 'Okey' },
        { rating: 4, text: 'Preety good' },
        { rating: 5, text: 'Fantastic!' }
      ],
      hovered: []
    }
}
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

.ratings__stars {
.text-purple {
    color: $purple;
}
}
</style>