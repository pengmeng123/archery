const Music = {
  data() {
    return {
      isOff: true,
    };
  },
  methods: {
    changeOn() {
      let oAudio = this.$refs.audioBg;
      if (this.isOff) {
        oAudio.play(); //让音频文件开始播放
      } else {
        oAudio.pause(); //让音频文件暂停播放
      }
      // this.$refs.audio.muted = !this.isOff;
      this.isOff = !this.isOff;
      this.handlePlayVideo();
    },
    audioAutoPlay() {
      if (!this.$refs.audioBg) {
        return;
      }
      try {
        this.isOff = false;
        this.$refs.audioBg.volume = 0.2;
        this.$refs.audioBg.play();
        // this.$refs.audio.muted = false;
        document.removeEventListener("touchstart", this.audioAutoPlay);
        // eslint-disable-next-line no-empty
      } catch {}
    },
  },
  mounted() {
    // 自动播放音乐效果，解决微信自动播放问题
    this.$nextTick(() => {
      document.addEventListener("touchstart", this.audioAutoPlay, false);
      // document.addEventListener(
      //   "WeixinJSBridgeReady",
      //   this.audioAutoPlay,
      //   false
      // );
      let oAudio = this.$refs.audioBg;
      oAudio.onended = () => {
        //播放完毕，重新循环播放
        oAudio && oAudio.load();
        oAudio && oAudio.play();
        // this.$refs.audio.muted = true;
      };
    });
  },
};
export default Music;
