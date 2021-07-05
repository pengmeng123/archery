import IconReciveGold from "./images/receive-gold.png";
import IconGoldExchange from "./images/gold-exchange.png";
import IconWelfareTask from "./images/welfare-task.png";
import IconMore from "./images/more.png";
import DropDownMore from "./dropdown-more";
import Modal from "@/components/Modal";
import FareTask from "../FareTask";
import DailyReceiveGold from "../DailyReceiveGold";
import styles from "./index.module.less";
export default {
  name: "AppMenu",
  data() {
    return {
      isDropDownMore: false,
      fareTaskVisible: false,
      receiveGoldVisible: false,
    };
  },
  computed: {
    menus() {
      return [
        {
          icon: IconReciveGold,
          func: () => {
            this.receiveGoldVisible = true;
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
          func: () => {
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
          <DailyReceiveGold />
        </Modal>
        {/* 福利任务 */}
        <Modal className="fareTask" v-model={this.fareTaskVisible}>
          <FareTask />
        </Modal>
      </div>
    );
  },
};
