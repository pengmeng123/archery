import styles from "./index.module.less";
import GoldImg from "@/assets/images/gold.png";
import AwardImg from "@/assets/images/award.png";
import Modal from "@/components/Modal";
import ExchangeModal from "@/components/Exchange/modal";

export default {
  name: "Exchange",
  data() {
    return {
      data: [
        {
          awardName: "火车票立减券",
          pic: AwardImg,
          amount: 200,
        },
        {
          awardName: "火车票立减券",
          pic: AwardImg,
          amount: 200,
        },
        {
          awardName: "火车票立减券",
          pic: AwardImg,
          amount: 200,
        },
        {
          awardName: "火车票立减券",
          pic: AwardImg,
          amount: 200,
        },
        {
          awardName: "火车票立减券",
          pic: AwardImg,
          amount: 200,
        },
      ],
      isExchange: false,
      isGoldNotEnoughVisible: false,
    };
  },
  methods: {
    onExchange() {
      console.log(123);
      this.isExchange = true;
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <div class={styles.goldInfo}>
            <a href="javascript:" class={styles.back}></a>
            <div class={styles.goldNumber}>
              <img src={GoldImg} alt="" />
              8888
            </div>
          </div>
          <a href="javascript:" class={styles.record}>
            兑换记录{">"}
          </a>
        </div>
        <div class={styles.exchangeText}>
          多种兑换<em></em>超值福利
        </div>
        <div class={styles.list}>
          <ul>
            {this.data.map((v) => (
              <li>
                <img src={AwardImg} alt="" class={styles.pic} />
                <div class={styles.awardName}>{v.awardName}</div>
                <div class={styles.amount}>
                  <img src={GoldImg} alt="" />
                  200
                </div>
                <a
                  href="javascript:"
                  class={styles.btn}
                  onClick={this.onExchange}
                >
                  兑换
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* 确认兑换 */}
        <Modal className="exchange" v-model={this.isExchange}>
          <ExchangeModal />
        </Modal>
        {/* 金币不足 */}
        <Modal className="exchange" v-model={this.isGoldNotEnoughVisible}>
          <ExchangeModal goldNotEnough={true} />
        </Modal>
      </div>
    );
  },
};
