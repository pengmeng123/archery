import styles from "./index.module.less";
import AppMenu from "@/components/AppMenu";
import AppHeader from "@/components/AppHeader";
import AppStake from "@/components/AppStake";
import AppChild from "@/components/AppChild";
import AppGamePlayer from "@/components/AppGamePlayer";
import AppFooter from "@/components/AppFooter";
export default {
  name: "Home",
  components: {
    AppMenu,
    AppHeader,
    AppStake,
    AppChild,
    AppGamePlayer,
    AppFooter,
  },
  render() {
    return (
      <div class={styles.container}>
        <app-menu />
        <app-header />
        <app-stake />
        <app-child />
        <app-game-player />
        <app-footer />
      </div>
    );
  },
};
