const state = () => {
  return {
    drawer: false,
    guestRoutes: [
      { name: 'How it works', action: '#how-it-works', icon: 'fa fa-tools' },
      { name: 'Pricing', action: '#pricing', icon: 'fas fa-dollar-sign' },
      { name: 'Testimonials', action: '#testimonials', icon: 'fas fa-comments' },
      {
        name: 'Contact',
        action: '#contact',
        color: 'white',
        icon: 'fas fa-id-card-alt'
      },
      {
        name: 'Login',
        action: '/login',
        color: 'white',
        icon: 'fas fa-sign-in-alt'
      },
      {
        name: 'Sign Up',
        action: '/register',
        bgColor: 'white',
        rounded: true,
        icon: 'fas fa-user-plus'
      }
    ],
    authedRoutes: [
      { name: 'How it works', action: '#how-it-works', icon: 'fa fa-tools' },
      { name: 'Pricing', action: '#pricing', icon: 'fas fa-dollar-sign' },
      { name: 'Testimonials', action: '#testimonials', icon: 'fas fa-comments' },
      {
        name: 'Contact',
        action: '#contact',
        color: 'white',
        icon: 'fas fa-id-card-alt'
      },
      {
        name: 'Logout',
        color: 'white',
        icon: 'fas fa-sign-in-alt'
      },
      {
        name: 'Dashboard',
        action: '/dashboard',
        bgColor: 'white',
        rounded: true,
        icon: 'fas fa-user-plus'
      }
    ],
    dashboardRoutes: [
      { name: 'People', action: '/dashboard/people', icon: 'mdi-account' },
      { name: 'Reviews', action: '/dashboard/reviews', icon: 'mdi-account' },
      { name: 'Feedback', action: '/dashboard/feedback', icon: 'mdi-account' },
      { name: 'Settings', action: '/dashboard/settings', icon: 'mdi-account' },
      { name: 'Sign Out', icon: 'mdi-account' }
    ]
  }
}

const mutations = {
  setDrawer (state, to) {
    state.drawer = to
  }
}

const getters = {
  routes: (state, getters, rootState, rootGetters) => {
    if (rootState.auth.user) {
      return state.authedRoutes
    }
    return state.guestRoutes
  }
}

export default {
  state, mutations, getters
}
