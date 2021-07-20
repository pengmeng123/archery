import styles from "./index.module.less";
// 0：火车票优惠券
// 1：话费
// 2:国内机票
// 3:京东卡
// 4:国内酒店
export default {
  name: "CreditCard",
  functional: true,
  render(h, { props }) {
    return (
      <div
        class={{
          [styles.container]: true,
          [styles.fareTaskImg]: props.task,
          [styles.trainTicket]: props.type === 0,
          [styles.phoneBill]: props.type === 1,
          [styles.planeTicket]: props.type === 2,
          [styles.jdCard]: props.type === 3,
          [styles.hotel]: props.type === 4,
        }}
      >
        <div class={styles.amountContainer}>
          <em>¥</em>
          <span class={styles.amount}>{props.amount}</span>
        </div>
      </div>
    );
  },
};
