import styles from "./index.module.less";
import { mapMutations } from "vuex";
export default {
  name: "AppFooter",
  data() {
    return {
      activeIndex: 0,
      data: [
        {
          amount: 50,
          className: "amount50",
        },
        {
          amount: 100,
          className: "amount100",
          style: {
            margin: "0 5px",
          },
        },
        {
          amount: 1000,
          className: "amount1000",
        },
      ],
    };
  },
  methods: {
    ...mapMutations({
      setBettingAmount: "SET_BETTING_AMOUNT",
    }),
    onTab(v, index) {
      this.activeIndex = index;
      this.setBettingAmount(v.amount);
    },
    onCancel() {},
  },
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.content}>
          <div class={styles.myGold}>
            <div class={styles.title}>我的金币</div>
            <div class={styles.text}>100000</div>
          </div>
          <div class={styles.btnGroup}>
            <ul>
              {this.data.map((v, index) => (
                <li
                  class={{
                    [styles.active]: this.activeIndex === index,
                  }}
                  style={v.style ? v.style : {}}
                  onClick={() => {
                    this.onTab(v, index);
                  }}
                >
                  <i></i>
                  <div class={styles[v.className]}></div>
                </li>
              ))}
            </ul>
          </div>
          <a
            href="javascript:"
            class={styles.btnCancel}
            onClick={this.onCancel}
          ></a>
        </div>
      </div>
    );
  },
};
