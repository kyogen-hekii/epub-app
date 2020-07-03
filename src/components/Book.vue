<template>
<div class="box">
  {{title}}
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    title: String,
  },
};
</script>

<style lang='sass'>
.box
  margin: auto
  width: 15rem
  height: 15rem
  border: solid 3px #6091d3
  // background: linear-gradient(to bottom, #99ccff, #0059b3)
</style>
