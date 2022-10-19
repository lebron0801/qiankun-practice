// import 'zone.js'; // for angular subapp
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState,
} from "qiankun";
import "./index.less";

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from "./render/ReactRender";
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: "ees",
      entry: "//localhost:3000",
      container: "#subapp-viewport",
      loader,
      activeRule: "/ees",
    },
    {
      name: "workflow",
      entry: "//localhost:8080",
      container: "#subapp-viewport",
      loader,
      activeRule: "/workflow",
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("加载之前", app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log("挂载之前", app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log("卸载之后", app.name);
      },
    ],
  }
);

// 初始化全局状态
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: "qiankun",
});

// 监听全局状态改变
onGlobalStateChange((value, prev) =>
  console.log("[onGlobalStateChange - master]:", value, prev)
);

// 更新全局状态
setGlobalState({
  ignore: "master",
  user: {
    name: "master",
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp("/ees");

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});
