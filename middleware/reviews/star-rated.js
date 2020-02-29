// export default async function ({ store, redirect, params }) {
//   console.log(location.search.split('rating='))
//   console.log(params)
//   await store.dispatch('reviews/getReview', 1)
//   console.log(store.state.reviews.reviewRequest)
//   if (store.state.reviews.reviewRequest.star_rating_completed) {
//     return redirect('/localfeedback' + store.state.reviews.reviewRequest.id)
//   }
// }
