import IconReciveGold from "./images/receive-gold.png";
import IconGoldExchange from "./images/gold-exchange.png";
import IconWelfareTask from "./images/welfare-task.png";
import IconMore from "./images/more.png";
import styles from "./index.module.less";
export default {
  name: "AppMenu",
  computed: {
    menus() {
      return [
        {
          icon: IconReciveGold,
          func: () => {
            console.log("1111");
          },
        },
        {
          icon: IconGoldExchange,
          func: () => {
            console.log("2222");
          },
        },
        {
          icon: IconWelfareTask,
          func: () => {
            console.log("3333");
          },
        },
        {
          icon: IconMore,
          func: () => {
            console.log("4444");
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
            <div class={styles.groupItem}>
              <img src={v.icon} onClick={v.func && v.func.bind(this)} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
