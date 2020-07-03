<script src="../dist/epub.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
<template>
  <div class="epub-viewer">
    <div id="area"/>
    <div class="epub-mask" @click="onClickMask"/>
  </div>
</template>

<script>
import ePub from '@/../node_modules/epubjs/dist/epub.min.js';

export default {
  methods:{
    async dispfile(id){
      const {data} = await this.$axios.get(`epubs/${id}`,{responseType: 'blob'})
      const file = new Blob([ data ], { type: data.type });
      const book = ePub(file);
      this.rendition = book.renderTo("area", {
        method: 'default',
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const displayed = this.rendition.display();
    },
    onClickMask(e) {
      const offsetX = e.offsetX;
      const width = window.innerWidth;
      if (offsetX > 0 && offsetX < width * 0.3) this.prevPage();
      else if (offsetX > 0 && offsetX > width * 0.7) this.nextPage();
    },
    prevPage(){
      if(this.rendition){
        this.rendition.prev();
      }
    },
    nextPage(){
      if(this.rendition){
          this.rendition.next();
      }
    },
  },
  async mounted() {
    const {id} = this.$route.params;
    this.dispfile(id);
  },
  data() {
    return {
      rendition: '',
    };
  },

};
</script>

<style lang="sass">
.epub-viewer
  position: relative
  .epub-mask
    display: flex
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
</style>
