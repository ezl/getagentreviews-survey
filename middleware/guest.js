export default function ({ store, redirect, params }) {
  if (store.state.auth.user) {
    return redirect('/dashboard')
  }
}
