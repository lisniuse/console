<template>
  <div class="app-header">
    <div class="logo">
      <span class="text">CONSOLE</span>
    </div>
    <div class="btns">
      <button class="button" @click="fitExample">example</button>
      <button class="button">new console</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exampleCode: `import 'https://cdn.bootcss.com/lodash.js/4.17.12-pre/lodash.min.js'

_.every([true, 1, null, 'yes'], Boolean);
// => false
 
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
// The '_.matches' iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false
 
// The '_.matchesProperty' iteratee shorthand.
_.every(users, ['active', false]);
// => true
 
// The '_.property' iteratee shorthand.
_.every(users, 'active');
// => false
`
    };
  },
  methods: {
    fitExample() {
      this.$parent.codeEditor.code = this.exampleCode;
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #45b984;

.app-header {
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
  width: 100%;
  background-color: @mainColor;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 30px;
    font-weight: bold;

    .text {
      color: #ffffff;
    }
  }

  .btns {
    .button {
      border-radius: 15px;
      margin-left: 10px;
      height: 30px;
      padding-left: 15px;
      padding-right: 15px;
      background-color: @mainColor;
      border: 1px solid #ffffff;
      color: #ffffff;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-color: #ffffff;
        border: 1px solid #ffffff;
        color: @mainColor;
      }
    }
  }
}
</style>
