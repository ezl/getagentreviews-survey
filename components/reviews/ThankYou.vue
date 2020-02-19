<template>
  <div class="thank-you">
    <ReviewsContent :includeButton="false"> 
        <template slot="top-icon">
<i class="far fa-thumbs-up"></i>
        </template>
        <template slot="title">
            Thank you fo your feedback.
        </template>
        <template slot="subtitle">
            <span class="multi-line-body">I'll read what you've written and work to incorporate your feedback</span>
            <span>to provide better experiences in the future</span>
        </template>
        <template slot="extra-content">
            <br>
            Review: {{ $store.state.reviews.chosen }} <template v-if="$store.state.reviews.chosen === 1">star</template><template v-else>stars</template><br>
            Feedback: {{ $store.state.reviews.feedback }}<br>
            User: John Smith
        </template>
    </ReviewsContent>
  </div>
</template>

<script>
import ReviewsContent from './ReviewsContent'
export default {
    components: {
        ReviewsContent
    }
}
</script>

<style>

</style>
