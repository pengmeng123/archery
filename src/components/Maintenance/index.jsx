import styles from "./index.module.less";
import maintenanceImg from "@/assets/images/maintenance.png";
export default {
  name: "Maintenance",
  render() {
    return (
      <div class={styles.container}>
        <img class={styles.icon} src={maintenanceImg} alt="" />
        <div class={styles.title}>十分抱歉，系统维护中...</div>
      </div>
    );
  },
};
