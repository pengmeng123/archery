import { mapState } from "vuex";
const Music = {
  data() {
    return {
      isOff: true,
      isFirstClick: true,
      musicTimer: null,
      isStartingMusic: false,
    };
  },
  computed: {
    ...mapState(["animationStep"]),
  },
  watch: {
    animationStep(newVal) {
      if (newVal === 4) {
        this.$refs.audioTarget.muted = this.isOff;
        this.$refs.audioTarget.currentTime = 0;
        this.$refs.audioTarget.play();
        this.closeMusicTimerout();
        this.musicTimer = setTimeout(() => {
          this.$refs.audioApplause.muted = this.isOff;
          this.$refs.audioApplause.currentTime = 0;
          this.$refs.audioApplause.play();
        }, 500);
      }
    },
  },
  methods: {
    closeMusicTimerout() {
      this.musicTimer && clearTimeout(this.musicTimer);
    },
    changeOn(checkedStatus = true) {
      if (this.isOff) {
        this.$refs.audioBg.play(); //让音频文件开始播放
      } else {
        this.$refs.audioBg.pause(); //让音频文件暂停播放
      }
      // 中靶部分
      this.$refs.audioTarget.muted = true;
      this.$refs.audioTarget.play();
      // 鼓掌
      this.$refs.audioApplause.muted = true;
      this.$refs.audioApplause.play();
      if (checkedStatus) {
        this.isOff = !this.isOff;
      }
    },
    startMute() {
      this.$refs.audioBg.pause();
      this.$refs.audioTarget.muted = true;
      this.$refs.audioApplause.muted = true;
    },
    endMute() {
      if (!this.isOff) {
        this.$refs.audioBg && this.$refs.audioBg.play();
      }
    },
    startMusic(status) {
      if (!status || this.isFirstClick) {
        this.changeOn();
      }
      this.isFirstClick = false;
    },
  },
  mounted() {
    // 自动播放音乐效果，解决微信自动播放问题
    this.$nextTick(() => {
      // document.addEventListener("touchstart", this.startMusic, false);
      document.addEventListener("visibilitychange", () => {
        //浏览器切换事件
        if (document.visibilityState == "hidden") {
          this.startMute();
          //状态判断
        } else {
          this.endMute();
        }
      });
    });
  },
};
export default Music;
