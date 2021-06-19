import styles from "./index.module.less";
import AppMenu from "@/components/AppMenu";
export default {
  name: "Home",
  components: {
    AppMenu,
  },
  render() {
    return (
      <div class={styles.container}>
        <app-menu />
      </div>
    );
  },
};
