import DropDownMore from "./dropdown-more";
import Modal from "@/components/Modal";
import FareTask from "../FareTask";
import DailyReceiveGold from "../DailyReceiveGold";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import { imgsPreloader } from "@/utils/img-preloader";
import { animationList } from "@/config/img-preloader-list";
import styles from "./index.module.less";
export default {
  name: "AppMenu",
  data() {
    return {
      isDropDownMore: false,
      fareTaskVisible: false,
      receiveGoldVisible: false,
      awardGoldNumber: 0,
    };
  },
  async mounted() {
    await imgsPreloader(animationList);
  },
  watch: {
    startMatch(newVal) {
      if (newVal) {
        this.isDropDownMore = false;
        this.fareTaskVisible = false;
        this.receiveGoldVisible = false;
      }
    },
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
        },
        {
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/welfare-task.png",
          func: async () => {
            await this.getGameMainInfo();
            this.fareTaskVisible = true;
          },
          eventName: "exchange",
        },
        {
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/gold-exchange.png",
          func: () => {
            this.$router.push({
              name: "Exchange",
            });
          },
          eventName: "welfareTask",
        },

        {
          icon: "https://file.40017.cn/huochepiao/activity/arrowtest/static/more.png",
          className: "dropDownMoreContainer",
          func: () => {
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
                [styles.eventName]: true,
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
