export default async function ({ store, redirect, params }) {
  const token = localStorage.getItem('auth_token')
  if (token) {
    await store.dispatch('auth/getUser', token)
  }
  if (store.state.auth.user) {
    return redirect('/')
  } else {
    localStorage.removeItem('auth_token')
  }
}
