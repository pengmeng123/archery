import { mapActions, mapMutations } from "vuex";
import helper from "@/utils/helper";
import { userObj } from "@/config/user";
import { localStorage } from "@/utils/storage";
import { TC_ARCHERY_USER_INFO } from "@/config/api";
import bgMusic from "@/assets/images/mp3/bg.mp3";
import targetMusic from "@/assets/images/mp3/arrow.mp3";
import applauseMusic from "@/assets/images/mp3/applause.mp3";
import MusicMixin from "@/mixins/music";
import { GUIDE_STEP } from "@/config/api";
import Loading from "@/components/Loading";
import _ from "lodash";
export default {
  name: "App",
  mixins: [MusicMixin],
  data() {
    return {
      loading: true,
      muted: true,
      isAppPage: true,
    };
  },
  created() {
    if (!this.$route.query.authorization) {
      const id = this.$route.query.id;
      if (!_.isNil(id)) {
        localStorage.set(TC_ARCHERY_USER_INFO, userObj[id]);
      }
      this.loading = false;
      this.getGuideStepInfo();
    }
  },
  mounted() {
    if (this.$route.query.authorization) {
      const user = localStorage.get(TC_ARCHERY_USER_INFO) || {};
      if (!_.get(user, "idenid")) {
        this.handleAuth();
      } else {
        this.loading = false;
      }
      this.getGuideStepInfo();
    }
  },
  beforeDestroy() {
    this.closeMusicTimerout();
  },
  methods: {
    ...mapMutations({
      setGuideStep: "SET_GUIDE_STEP",
      setAttemptPlay: "SET_ATTEMPLT_PLAY",
    }),
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
    handleAuth() {
      let nick = helper.getUrlArg("nickname") || "同程用户";
      const headimg =
        helper.getUrlArg("imgurl") ||
        "https://file.40017.cn/huochepiao/activity/20200521supplies/img/defaultImg-fs8.png";
      const openid = helper.getUrlArg("openid") || helper.getUrlArg("code");
      if (openid) {
        console.log("nick---", nick);
        console.log("headering--", headimg);
        console.log("openid--", openid);
        localStorage.set(TC_ARCHERY_USER_INFO, {
          nick,
          idenid: openid,
          icon: headimg,
        });
        this.loading = false;
      } else {
        // 如果拿到url参与
        const authUrl = helper.getLocalAuthUrl([], true);
        console.log(decodeURIComponent(authUrl));
        location.replace(authUrl);
      }
    },
    getGuideStepInfo() {
      // 引导流
      const step = localStorage.get(GUIDE_STEP);
      if (step === 0 || step === 4 || step === 5) {
        this.setGuideStep(6);
      }
      // 判断当前是否是新人引导流
      const status = localStorage.get(GUIDE_STEP) !== -1;
      this.setAttemptPlay(status);
    },
    renderLoading() {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      );
    },
  },
  render() {
    if (this.loading) {
      return this.renderLoading();
    }
    return (
      <div id="app" style="height:100%">
        {/* 背景音乐 */}
        <audio
          id="audioBg"
          preload="auto"
          controls
          ref="audioBg"
          hidden="true"
          loop
        >
          <source src={bgMusic} />
        </audio>
        {/* 中靶 */}
        <audio id="audioTarget" controls ref="audioTarget" hidden="true">
          <source src={targetMusic} />
        </audio>
        {/* 鼓掌 */}
        <audio id="audioApplause" controls ref="audioApplause" hidden="true">
          <source src={applauseMusic} />
        </audio>

        <router-view />
      </div>
    );
  },
};
