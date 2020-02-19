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
            <span class="d-block">I'll read what you've written and work to incorporate your feedback</span>
            <span>to provide better experiences in the future</span>
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
.d-block {
    margin-bottom: 10px;
}
</style>
