import DropDownMore from "./dropdown-more";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import { localStorage } from "@/utils/storage";
import { FARETASK_DOT } from "@/config/api";
import receiveGoldImg from "@/assets/images/guide/receive-gold.png";
import styles from "./index.module.less";
const $ = window.$;
export default {
  name: "AppMenu",
  data() {
    return {
      isDropDownMore: false,
      fareTaskVisible: false,
      receiveGoldVisible: false,
      awardGoldNumber: 0,
      isFareTaskDot: false,
    };
  },
  mounted() {
    this.isFareTaskDot = localStorage.get(FARETASK_DOT);
    this.$nextTick(() => {
      $("body").click(() => {
        this.isDropDownMore = false;
      });
    });
  },

  computed: {
    ...mapState(["mainInfo", "startMatch"]),
    menus() {
      return [
        {
          icon: receiveGoldImg,
          func: () => {
            this.gameSign();
          },
          eventName: "recevieGold",
          dot: () => {
            if (
              !_.get(this.mainInfo, "signStaus") ||
              _.get(this.mainInfo, "signStaus") === 2
            ) {
              return null;
            }
            return <em class={styles.dot}></em>;
          },
        },
        {
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/0806/icon-welfare.png",
          func: async () => {
            await this.getGameMainInfo();
            this.$emit("openFareTask");
            localStorage.set(FARETASK_DOT, true);
            this.isFareTaskDot = true;
          },
          eventName: "welfareTask",
          dot: () => {
            if (this.isFareTaskDot) {
              return null;
            }
            return <em class={styles.dot}></em>;
          },
        },
        {
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/gold-exchange.png",
          func: () => {
            this.$router.push({
              name: "Exchange",
            });
          },
          eventName: "exchange",
        },

        {
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/more.png",
          className: "dropDownMoreContainer",
          func: (e) => {
            e.stopPropagation();
            this.isDropDownMore = !this.isDropDownMore;
          },
          eventName: "more",
          component: () => {
            return (
              <DropDownMore
                vShow={this.isDropDownMore}
                onClose={() => {
                  this.isDropDownMore = false;
                }}
                onOpenRule={() => {
                  this.$emit("openRule");
                }}
                onOpenGameRecord={() => {
                  this.$emit("openGameRecord");
                }}
              />
            );
          },
        },
      ];
    },
  },
  methods: {
    ...mapMutations({
      setMainInfo: "SET_MAIN_INFO",
    }),
    gameSign() {
      this.$service.user.gameSign().then((r) => {
        if (_.get(r, "data.code") === 1000) {
          this.awardGoldNumber = _.get(r, "data.result");
          this.$emit("openSignModal", this.awardGoldNumber);
          this.getGameMainInfo();
        } else {
          this.$toast(_.get(r, "data.message"));
        }
      });
    },
    getGameMainInfo() {
      return this.$service.user.gameMainInfo().then((r) => {
        const o = _.get(r, "data.result") || {};
        this.setMainInfo(o);
      });
    },
  },
  render() {
    const { menus } = this;

    return (
      <div class={styles.container}>
        <div class={styles.group}>
          {menus.map((v) => (
            <div
              class={{
                [styles.groupItem]: true,
                [styles[v.eventName]]: true,
              }}
            >
              <img
                class={styles.groupItemIcon}
                src={v.icon}
                onClick={v.func && v.func.bind(this)}
              />
              {v.component ? (
                <div class={styles[v.className]}>{v.component()}</div>
              ) : null}
              {v.dot && v.dot()}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
