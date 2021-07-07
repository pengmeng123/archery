const CountDownMixin = {
  methods: {
    runCount(t) {
      this.timer && clearTimeout(this.timer);
      if (t > 0) {
        this.setCount(t);
        t--;
        this.timer = setTimeout(() => {
          this.runCount(t);
        }, 1000);
      } else {
        this.setCount(0);
        this.setStartMatchStatus(true);
        setTimeout(() => {
          this.setAnimationStep(1);
        }, 500);
      }
    },
  },
};
export default CountDownMixin;
