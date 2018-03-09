<template>
  <div id="app">
    <c-header/>
    <router-view/>
    <c-footer/>
  </div>
</template>

<script>
import CHeader from './components/CHeader';
import CFooter from './components/CFooter';

export default {
  components: { CHeader, CFooter }
};
</script>

<style lang="scss">
</style>
