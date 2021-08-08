import { mapState } from "vuex";
import MusicMixin from "@/mixins/music";
import styles from "./dropdown-more.module.less";
export default {
  name: "DropDownMore",
  mixins: [MusicMixin],
  data() {
    return {
      visible: false,
      ruleVisible: false,
      isOpenMusic: false,
    };
  },

  computed: {
    ...mapState(["startMatch"]),
    menus() {
      return [
        {
          title: "活动规则",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-rule.png",
          func: (e) => {
            e.stopPropagation();
            this.$emit("openRule");
          },
        },
        {
          title: "游戏记录",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-record.png",
          func: (e) => {
            e.stopPropagation();
            this.$emit("openGameRecord");
          },
        },
        {
          title: "客服中心",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-service.png",
          func: (e) => {
            e.stopPropagation();
            window.location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=https%3a%2f%2fwx.17u.cn%2fwxinfo%2fWxMember%2fRedirectBind%3furl%3dhttps%253A%252F%252Fwx.17u.cn%252Fselfservice%252F%2523%252F%26hasCode%3dfalse&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
          },
        },
        {
          title: this.isOff ? "开启音效" : "游戏静音",
          icon: this.isOff
            ? "https://file.40017.cn/huochepiao/activity/arrowtest/static/0806/music-open.png"
            : "https://file.40017.cn/huochepiao/activity/arrowtest/static/0806/music-close.png",
          func: (e) => {
            e.stopPropagation();
            this.changeOn && this.changeOn();
          },
        },
      ];
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  render() {
    const { menus } = this;
    return (
      <div class={styles.container}>
        <div class={styles.dropDownMore}>
          <ul>
            {menus.map((v) => (
              <li
                onClick={(e) => {
                  v.func && v.func(e);
                }}
              >
                <img src={v.icon} />
                {v.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};
