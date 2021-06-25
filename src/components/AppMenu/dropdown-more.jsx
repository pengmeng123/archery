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
      visible: true,
    };
  },
  computed: {
    menus() {
      return [
        {
          title: "活动规则",
          icon: IconRule,
          func: () => {
            this.visible = !this.visible;
            console.log(this.visible);
          },
        },
        {
          title: "游戏记录",
          icon: IconRecord,
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
      </div>
    );
  },
};
