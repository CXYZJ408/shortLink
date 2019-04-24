import velocity from 'velocity-animate/velocity.min.js'

export default (vm, inject) => {
  vm.$velocity = velocity
  inject('velocity', velocity)
}
