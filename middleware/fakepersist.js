export default async function ({ store, redirect, params }) {
  // temporary
  if (!store.state.auth.user && localStorage.getItem('auth_token')) {
    store.dispatch('auth/getUser', localStorage.getItem('auth_token'))
  } else if (store.state.auth.user) {
  } else {
    console.log('user not logged in')
  }
}
