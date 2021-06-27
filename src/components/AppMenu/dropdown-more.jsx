import IconRule from "@/assets/images/icon-rule.png";
import IconRecord from "@/assets/images/icon-record.png";
import IconService from "@/assets/images/icon-service.png";
import Modal from "@/components/Modal";
import SupportRecord from "@/components/SupportRecord";
import styles from "./dropdown-more.module.less";
export default {
  name: "DropDownMore",
  data() {
    return {
      visible: false,
      ruleVisible: false,
    };
  },
  computed: {
    menus() {
      return [
        {
          title: "活动规则",
          icon: IconRule,
          func: () => {
            this.ruleVisible = !this.ruleVisible;
          },
        },
        {
          title: "游戏记录",
          icon: IconRecord,
          func: () => {
            this.visible = !this.visible;
          },
        },
        {
          title: "客服中心",
          icon: IconService,
        },
      ];
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  render() {
    const { menus } = this;
    return (
      <div class={styles.container}>
        <div class={styles.dropDownMore}>
          <ul>
            {menus.map((v) => (
              <li
                onClick={() => {
                  v.func && v.func();
                }}
              >
                <img src={v.icon} />
                {v.title}
              </li>
            ))}
          </ul>
        </div>
        <Modal v-model={this.visible}>
          <SupportRecord />
        </Modal>
        <Modal className="ruleBg" v-model={this.ruleVisible}>
          <div class={styles.ruleContent}>
            活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则
          </div>
        </Modal>
      </div>
    );
  },
};
