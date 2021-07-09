const CountDownMixin = {
  data() {
    return {
      timerCount: null,
    };
  },
  methods: {
    runCount(t) {
      this.timerCount && clearTimeout(this.timerCount);
      if (t > 0) {
        this.setCount(t);
        t--;
        this.timerCount = setTimeout(() => {
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
