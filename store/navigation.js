const state = () => {
  return {
    drawer: false,
    guestRoutes: [
      { name: 'How it works', action: '/how', icon: 'fa fa-tools' },
      { name: 'Pricing', action: '/pricing', icon: 'fas fa-dollar-sign' },
      { name: 'Testimonials', action: '/testmonials', icon: 'fas fa-comments' },
      { name: 'Contact', action: '/contact', color: 'white', icon: 'fas fa-id-card-alt' },
      { name: 'Login', action: '/login', color: 'white', icon: 'fas fa-sign-in-alt' },
      { name: 'Sign Up', action: '/register', bgColor: 'white', rounded: true, icon: 'fas fa-user-plus' }
    ]
  }
}

const mutations = {
  setDrawer (state, to) {
    state.drawer = to
  }
}

export default {
  state, mutations
}
