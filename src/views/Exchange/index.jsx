import styles from "./index.module.less";
import GoldImg from "@/assets/images/gold.png";
import AwardImg from "@/assets/images/award.png";
import Modal from "@/components/Modal";
import ExchangeModal from "@/components/Exchange/modal";
import ExchangeRecord from "@/components/Exchange/record";
import PhoneBill from "@/components/PhoneBill";
import CreditCard from "../../components/CreditCard";
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "Exchange",
  data() {
    return {
      data: [],
      currentRecord: {},
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
  mounted() {
    this.fetchGameExchange();
  },
  computed: {
    ...mapState(["gameInfo"]),
    account() {
      return _.get(this.gameInfo, "account") || 0;
    },
  },
  methods: {
    fetchGameExchange() {
      this.$service.user.gameExchange().then((r) => {
        this.data = _.get(r, "data.result") || [];
      });
    },
    onExchange(v) {
      if (v.cost > this.account) {
        this.isGoldNotEnoughVisible = true;
        return;
      }
      this.currentRecord = v;
      if (v.type === 1) {
        this.isExchangePhoneBill = true;
      } else {
        this.isExchange = true;
      }
    },
    goBack() {
      this.$router.push("/");
    },
    async onCheckRecord() {
      try {
        await this.fetchGameExchange();
        this.isExchangeRecord = true;
        // eslint-disable-next-line no-empty
      } catch {}
    },
  },
  render() {
    const awardList = _.get(this.data, "awardList") || [];
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <div class={styles.goldInfo}>
            <a href="javascript:" class={styles.back} onClick={this.goBack}></a>
            <div class={styles.goldNumber}>
              <img src={GoldImg} alt="" />
              {_.get(this.gameInfo, "account") || 0}
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
            {awardList.map((v) => (
              <li>
                <div class={styles.pic}>
                  <CreditCard type={v.type} amount={v.amount} />
                </div>
                <div class={styles.awardName}>{v.title}</div>
                <div class={styles.amount}>
                  <img src={GoldImg} alt="" />
                  {v.cost}
                </div>
                <a
                  href="javascript:"
                  class={styles.btn}
                  onClick={() => {
                    this.onExchange(v);
                  }}
                >
                  兑换
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* 确认兑换 */}
        <Modal className="exchange" v-model={this.isExchange}>
          <ExchangeModal
            record={this.currentRecord}
            onClose={() => {
              this.isExchange = false;
            }}
            onCheckRecord={this.onCheckRecord}
          />
        </Modal>
        {/* 金币不足 */}
        <Modal className="exchange" v-model={this.isGoldNotEnoughVisible}>
          <ExchangeModal
            goldNotEnough={true}
            onClose={() => {
              this.isGoldNotEnoughVisible = false;
            }}
          />
        </Modal>
        {/* 兑换记录 */}
        <Modal className="exchange-record" v-model={this.isExchangeRecord}>
          <ExchangeRecord
            visible={this.isExchangeRecord}
            data={_.get(this.data, "awardRecordList")}
          />
        </Modal>
        {/* 话费兑换 */}
        <Modal
          className="exchange-phone-bill"
          v-model={this.isExchangePhoneBill}
        >
          <PhoneBill
            record={this.currentRecord}
            visible={this.isExchangePhoneBill}
          />
        </Modal>
      </div>
    );
  },
};
