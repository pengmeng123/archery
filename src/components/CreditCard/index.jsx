import styles from "./index.module.less";
export default {
  name: "CreditCard",
  functional: true,
  render(h, { props }) {
    return (
      <div
        class={{
          [styles.container]: true,
          [styles.planeTicket]: props.type === 1,
          [styles.phoneBill]: props.type === 2,
          [styles.trainTicket]: props.type === 3,
          [styles.jdCard]: props.type === 4,
          [styles.hotel]: props.type === 5,
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
