import { mapState, mapMutations, mapGetters } from "vuex";
import _ from "lodash";
const Music = {
  data() {
    return {
      isFirstClick: true,
      musicTimer: null,
      isStartingMusic: false,
    };
  },
  computed: {
    ...mapState(["animationStep", "startMatch", "isOff", "times"]),
    ...mapGetters(["gameResult"]),
  },
  watch: {
    animationStep(newVal) {
      if (newVal === 4) {
        const audioTarget = document.getElementById("audioTarget");
        const audioApplause = document.getElementById("audioApplause");
        audioTarget.muted = this.isOff;
        if (!this.isOff) {
          audioTarget.currentTime = 0;
          audioTarget.play();
        }
        this.closeMusicTimerout();
        this.musicTimer = setTimeout(() => {
          audioApplause.muted = this.isOff;
          const ttRingNumber = _.get(this.gameResult, "ttRingNumber");
          const ccRingNumber = _.get(this.gameResult, "ccRingNumber");
          if (
            !this.isOff &&
            ((ttRingNumber >= 7 && this.times === 0) ||
              (ccRingNumber >= 7 && this.times === 1))
          ) {
            audioApplause.currentTime = 0;
            audioApplause.play();
          }
        }, 500);
      }
    },
    startMatch(newVal) {
      if (newVal) {
        this.$refs.audioBg && this.$refs.audioBg.pause();
      } else {
        this.endMute();
      }
    },

    $route: function (newVal) {
      if (newVal.name !== "Home") {
        this.startMute();
      } else {
        this.endMute();
      }
    },
  },
  methods: {
    ...mapMutations({
      setInvoice: "SET_INVOICE",
    }),
    closeMusicTimerout() {
      this.musicTimer && clearTimeout(this.musicTimer);
    },
    changeOn(checkedStatus = true) {
      if (!(this.$route.name === "Home")) {
        return;
      }
      const audioBg = document.getElementById("audioBg");
      const audioTarget = document.getElementById("audioTarget");
      const audioApplause = document.getElementById("audioApplause");

      if (this.isOff) {
        audioBg && audioBg.play(); //让音频文件开始播放
      } else {
        audioBg && audioBg.pause(); //让音频文件暂停播放
      }
      // 中靶部分
      audioTarget.muted = true;
      audioTarget.play();
      // 鼓掌
      audioApplause.muted = true;
      audioApplause.play();
      if (checkedStatus) {
        this.setInvoice(!this.isOff);
      }
    },
    startMute() {
      document.getElementById("audioBg").pause();
      document.getElementById("audioTarget").muted = true;
      document.getElementById("audioApplause").muted = true;
    },
    endMute() {
      if (!this.isOff) {
        document.getElementById("audioBg").play();
      }
    },
    startMusic() {
      if (this.isFirstClick) {
        this.changeOn();
      }
      this.isFirstClick = false;
    },
  },
  mounted() {
    // 自动播放音乐效果，解决微信自动播放问题
    if (this.isAppPage) {
      this.$nextTick(() => {
        try {
          document.addEventListener("touchstart", this.startMusic, false);
          document.addEventListener("visibilitychange", () => {
            //浏览器切换事件
            if (document.visibilityState == "hidden") {
              this.startMute();
              //状态判断
            } else {
              this.endMute();
            }
          });
          // eslint-disable-next-line no-empty
        } catch {}
      });
    }
  },
};
export default Music;
