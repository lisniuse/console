<template>
  <div class="home">
    <app-header></app-header>
    <div class="main">
      <div class="left-layout">
        <div class="bar">
          <h2>JavaScript</h2>
          <div class="btn-group">
            <Button size="s" color="primary" @click="runCode()">run</Button>
            <Button size="s" color="primary">Clear</Button>
          </div>
        </div>
        <code-editor v-model="codeEditor.code" :height="'100%'" mode="javascript"></code-editor>
      </div>
      <div class="right-layout">
        <div class="bar">
          <h2>Console</h2>
          <Button size="s" color="primary">Clear</Button>
        </div>
        <console-container :logs="consoleContainer.logs"></console-container>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import appHeader from "@/components/app-header";
import codeEditor from "@/components/code-editor";
import consoleContainer from "@/components/console";
import { setTimeout, setInterval } from "timers";

export default {
  name: "home",
  components: {
    appHeader,
    codeEditor,
    consoleContainer
  },
  data() {
    return {
      codeEditor: {
        code: ""
      },
      consoleContainer: {
        logs: []
      }
    };
  },
  watch: {
    "consoleContainer.logs": function(val) {
      console.log(val);
    }
  },
  mounted() {
    Vue.config.errorHandler = (err, vm, info) => {
      this.consoleContainer.logs.push(err);
    }
  },
  methods: {
    runCode() {
      this.exec(this.codeEditor.code);
    },

    exec(code) {
      let frameEl = document.querySelector("#playground");
      if (!frameEl) {
        frameEl = document.createElement("iframe");
        frameEl.id = "playground";
        frameEl.style = "display:none";
        document.body.appendChild(frameEl);
      }
      let elDoc = frameEl.contentWindow.document;
      frameEl.contentWindow._vueApp = this;
      elDoc.write("");
      let _code = `<script>${this._package(code)}<\/script>`;
      elDoc.write(_code);
      elDoc.write("");
    },

    _package(code) {
      let playgroundCode = `
        window.addEventListener('error', function(e) {
          window._vueApp.consoleContainer.logs.push(e);
          return false;
        });
        var result = (${code});
        window._vueApp.consoleContainer.logs.push(result);
      `;
      return playgroundCode;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .main {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: calc(~"100vh - 50px");

    .bar {
      height: 40px;
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.09);
      position: relative;
      z-index: 10;

      h2 {
        font-size: 16px;
        font-weight: normal;
        color: #333333;
      }
    }

    .left-layout {
      width: 100%;
      height: calc(~"100% - 40px");
      border-right: 1px solid #e9e9e9;
    }

    .right-layout {
      width: 100%;
      height: calc(~"100% - 40px");
    }
  }
}
</style>
