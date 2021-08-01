import { mapActions, mapMutations } from "vuex";
// import helper from "@/utils/helper";
import { userObj } from "@/config/user";
import { localStorage } from "@/utils/storage";
import { TC_ARCHERY_USER_INFO } from "@/config/api";
import bgMusic from "@/assets/images/mp3/bg.mp3";
import targetMusic from "@/assets/images/mp3/arrow.mp3";
import applauseMusic from "@/assets/images/mp3/applause.mp3";
import MusicMixin from "@/mixins/music";
import { GUIDE_STEP } from "@/config/api";
import _ from "lodash";
export default {
  name: "App",
  mixins: [MusicMixin],
  data() {
    return {
      loading: true,
      muted: true,
    };
  },
  created() {
    const id = this.$route.query.id;
    if (!_.isNil(id)) {
      localStorage.set(TC_ARCHERY_USER_INFO, userObj[id]);
    }
    this.loading = false;

    this.getGuideStepInfo();
  },
  mounted() {
    // const newUrl = decodeURIComponent(
    //   "https://wx.17u.cn/hcpzt/20210512sendCouponRCtest/index?imgurl=https://thirdwx.qlogo.cn/mmopen/vi_32/EccamU2gEQEnPd6DqVnC9kRwPIwiaFxR8vRvia5aKy7NBasfZjQLBoxlAhnjMZ5BA2Xc3hJ3KpuSroUCD9cWWBsg/132&nickname=%e7%81%ab%e8%bd%a6%e7%a5%a8%e8%bf%90%e8%90%a5%e5%ae%89%e5%8d%93%e6%9c%ba&openid=oOCyauM-dRXoiu1jxJyQJibK5yxY&token=47_I-kGxjTfKz7eg_Bsk6xZNTM2r9QM-tL78yIP7LqKi1qhiwlJVG-25760ZG6VeTskIg3XRjMuc_7gZ7pMlQlY3A&unionid=ohmdTt59JqKGJTy4tSpzunpeZwD"
    // );
    // // const r1 = this.getRequest(newUrl);
    // console.log("ss--", helper.getArgByUrl(newUrl, "imgurl"));
    // let nick = helper.getUrlArg("nickname") || "同程用户";
    // const headimg =
    //   helper.getUrlArg("imgurl") ||
    //   "https://file.40017.cn/huochepiao/activity/20200521supplies/img/defaultImg-fs8.png";
    // const openid = helper.getUrlArg("openid") || helper.getUrlArg("code");
    // if (openid) {
    //   console.log("nick---", nick);
    //   console.log("headering--", headimg);
    //   console.log("openid--", openid);
    // } else {
    //   // 如果拿到url参与
    //   const authUrl = helper.getLocalAuthUrl([], true);
    //   // console.log("authUrl999s--", authUrl);
    //   console.log(decodeURIComponent(authUrl));
    //   // const q = this.getRequest(authUrl);
    //   // console.log("appid11---", q.state);
    //   // location.replace(authUrl);
    // }
    // console.log("authUrl---", authUrl);
    // location.replace(authUrl)
  },
  beforeDestroy() {
    this.closeMusicTimerout();
  },
  methods: {
    ...mapMutations({
      setGuideStep: "SET_GUIDE_STEP",
    }),
    ...mapActions({
      getGameInfo: "getGameInfo",
    }),
    getGuideStepInfo() {
      // 引导流
      const step = localStorage.get(GUIDE_STEP);
      if (step === 0) {
        this.setGuideStep(5);
      }
    },
  },
  render() {
    if (this.loading) {
      return null;
    }
    return (
      <div id="app" style="height:100%">
        {/* <div
          style="width:30px;height:30px;background:red;"
          onClick={() => {
            this.audioAutoPlay1(false);
          }}
        >
          toggle me
        </div> */}
        {/* 背景音乐 */}
        <audio preload="auto" controls ref="audioBg" hidden="true" volume={0}>
          <source src={bgMusic} />
        </audio>
        {/* 中靶 */}
        <audio controls ref="audioTarget" hidden="true">
          <source src={targetMusic} />
        </audio>
        {/* 鼓掌 */}
        <audio controls ref="audioApplause" hidden="true">
          <source src={applauseMusic} />
        </audio>

        <router-view />
      </div>
    );
  },
};
