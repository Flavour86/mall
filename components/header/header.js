Component({
  properties: {
    prop1: {
      type: Object,
      value: {},
    },
    prop2: {
      type: Boolean,
      value: false,
    }
  },
  data: {
  },
  methods: {
    test () {
      console.log(this.data, 'component')
    }
  }
})