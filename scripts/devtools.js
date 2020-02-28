var vm = new Vue({
  el: '#project-body',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      // return this.message.split('').reverse().join('')
      return this.message
    }
  },
  methods: {
    toolTipPopup: function () {
      this.message = 'Goodbye'
    }
  }
})
