import Modal from "@/components/Modal";
import SupportRecord from "@/components/SupportRecord";
import { mapState } from "vuex";
import iconMusicClose from "@/assets/images/guide/music-close.png";
import iconMusicOpen from "@/assets/images/guide/music-open.png";
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
            this.ruleVisible = !this.ruleVisible;
          },
        },
        {
          title: "游戏记录",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-record.png",
          func: (e) => {
            e.stopPropagation();
            this.visible = !this.visible;
          },
        },
        {
          title: "客服中心",
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/icon-service.png",
          func: (e) => {
            e.stopPropagation();
          },
        },
        {
          title: this.isOff ? "开启音效" : "游戏静音",
          icon: this.isOff ? iconMusicOpen : iconMusicClose,
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
        {/* 支持记录 */}
        <Modal v-model={this.visible}>
          <SupportRecord />
        </Modal>
        {/* 活动规则 */}
        <Modal className="ruleBg" v-model={this.ruleVisible}>
          <div class={styles.ruleContent}>
            活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则
          </div>
        </Modal>
      </div>
    );
  },
};
