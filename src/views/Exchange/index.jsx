import styles from "./index.module.less";
import GoldImg from "@/assets/images/gold.png";
import AwardImg from "@/assets/images/award.png";
import Modal from "@/components/Modal";
import ExchangeModal from "@/components/Exchange/modal";
import ExchangeRecord from "@/components/Exchange/record";
import PhoneBill from "@/components/PhoneBill";
import CreditCard from "../../components/CreditCard";

export default {
  name: "Exchange",
  data() {
    return {
      awardList: [
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
      isExchangeRecord: false,
      isExchangePhoneBill: false,
    };
  },
  methods: {
    onExchange() {
      this.isExchange = true;
    },
    goBack() {
      this.$router.push("/");
    },
  },
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <div class={styles.goldInfo}>
            <a href="javascript:" class={styles.back} onClick={this.goBack}></a>
            <div class={styles.goldNumber}>
              <img src={GoldImg} alt="" />
              8888
            </div>
          </div>
          <a
            href="javascript:"
            class={styles.record}
            onClick={() => {
              this.isExchangeRecord = true;
            }}
          >
            兑换记录{">"}
          </a>
        </div>
        <div class={styles.exchangeText}>
          多种兑换<em></em>超值福利
        </div>
        <div class={styles.list}>
          <ul>
            {this.awardList.map((v) => (
              <li>
                <div class={styles.pic}>
                  <CreditCard type={4} amount={10} />
                </div>
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
        {/* 兑换记录 */}
        <Modal className="exchange-record" v-model={this.isExchangeRecord}>
          <ExchangeRecord />
        </Modal>
        {/* 话费兑换 */}
        <Modal
          className="exchange-phone-bill"
          v-model={this.isExchangePhoneBill}
        >
          <PhoneBill visible={this.isExchangePhoneBill} />
        </Modal>
      </div>
    );
  },
};
