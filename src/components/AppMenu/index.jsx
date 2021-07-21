import IconReciveGold from "./images/receive-gold.png";
import IconGoldExchange from "./images/gold-exchange.png";
import IconWelfareTask from "./images/welfare-task.png";
import IconMore from "./images/more.png";
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
          icon: IconReciveGold,
          func: () => {
            this.gameSign();
          },
          eventName: "recevieGold",
        },
        {
          icon: IconGoldExchange,
          func: () => {
            this.$router.push({
              name: "Exchange",
            });
          },
          eventName: "welfareTask",
        },
        {
          icon: IconWelfareTask,
          func: async () => {
            this.getGameMainInfo();
            this.fareTaskVisible = true;
          },
          eventName: "exchange",
        },
        {
          icon: IconMore,
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
