import DropDownMore from "./dropdown-more";
import Modal from "@/components/Modal";
import FareTask from "../FareTask";
import DailyReceiveGold from "../DailyReceiveGold";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import { localStorage } from "@/utils/storage";
import { FARETASK_DOT } from "@/config/api";
import iconWelFare from "@/assets/images/guide/icon-welfare.png";
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
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/receive-gold.png",
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
          icon: iconWelFare,
          func: async () => {
            await this.getGameMainInfo();
            this.fareTaskVisible = true;
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
          this.receiveGoldVisible = true;
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
        {/* 每日领金币 */}
        <Modal className="dailyReceiveGold" v-model={this.receiveGoldVisible}>
          <DailyReceiveGold awardGoldNumber={this.awardGoldNumber} />
        </Modal>
        {/* 福利任务 */}
        <Modal className="fareTask" v-model={this.fareTaskVisible}>
          <FareTask
            visible={this.fareTaskVisible}
            onRefresh={this.getGameMainInfo}
            onClose={() => {
              this.fareTaskVisible = false;
            }}
          />
        </Modal>
      </div>
    );
  },
};
