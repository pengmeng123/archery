import IconReciveGold from "./images/receive-gold.png";
import IconGoldExchange from "./images/gold-exchange.png";
import IconWelfareTask from "./images/welfare-task.png";
import IconMore from "./images/more.png";
import DropDownMore from "./dropdown-more";
import Modal from "@/components/Modal";
import FareTask from "../FareTask";
import styles from "./index.module.less";
export default {
  name: "AppMenu",
  data() {
    return {
      isDropDownMore: false,
      fareTaskVisible: true,
    };
  },
  computed: {
    menus() {
      return [
        {
          icon: IconReciveGold,
          func: () => {
            console.log("1111");
          },
          eventName: "recevieGold",
        },
        {
          icon: IconGoldExchange,
          func: () => {
            console.log("2222");
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
        {/* 福利任务 */}
        <Modal className="fareTask" v-model={this.fareTaskVisible}>
          <FareTask />
        </Modal>
      </div>
    );
  },
};
