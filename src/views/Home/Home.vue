<template>
  <div>
    <!-- header -->
    <div class="flex header">
      <div class="flex--center">
        <span class="logo">EPubs</span>
      </div>
    </div>

    <!-- main -->
    <div>
      <div class="flex">
        <div class="arrow touchable flex flex--grown0" @click="onPrevCategoryClick">＜</div>
        <ul class="flex flex--grown1">
          <li v-for="c in categories" :key="c.id">
            <span
              class="category touchable mr10"
              :class="{active: activeId === c.id}"
              @click="onCategoryClick(c.id)">
              {{c.title}}
            </span>
          </li>
        </ul>
        <div class="arrow touchable flex flex--grown0" @click="onNextCategoryClick">＞</div>
      </div>

      <ul class="flex flex--wrap">
        <li v-for="b in categoryBooks" :key="b.id">
          <div class="m5 left flex flex--column">
            <router-link :to="{name: 'Viewer', params: { id: b.id }}" >
              <img :src="`${apiUrl}images/${b.id}`"
                :alt="`${b.title}`" width="150rem" height="200rem">
            </router-link>
            <span>{{b.title}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  beforeMount() {
    // imgで使用するため
    this.apiUrl = process.env.VUE_APP_API_URL;
  },
  mounted() {
    this.$axios.get('books').then((res) => {
      const { data } = res.data;
      this.books = data;
    });
    this.$axios.get('categories').then((res) => {
      const { data } = res.data;
      this.categories = data;
    });
  },
  data() {
    return {
      categories: [],
      books: [],
      activeId: 1,
      apiUrl: '',
    };
  },
  methods: {
    onCategoryClick(categoryId) {
      this.activeId = categoryId;
    },
    onPrevCategoryClick() {
      const maybeId = this.activeId - 1;
      const categoryIds = this.categories.map((c) => c.id);
      this.activeId = categoryIds
        .some((cid) => cid === maybeId) ? maybeId : categoryIds.reduce((a, c) => (a > c ? a : c));
    },
    onNextCategoryClick() {
      const maybeId = this.activeId + 1;
      const categoryIds = this.categories.map((c) => c.id);
      this.activeId = categoryIds
        .some((cid) => cid === maybeId) ? maybeId : categoryIds.reduce((a, c) => (a < c ? a : c));
    },
  },
  computed: {
    categoryBooks() {
      return this.books
        .filter((b) => b.category_primary_id === this.activeId);
    },
  },
};
</script>

<style scoped lang="sass">
.logo
  font-size: 1.8rem
  font-weight: 900
.arrow
  font-size: 1.4rem
  font-weight: 900
.category
  font-size: 1.2rem
  font-weight: 700
.active
  color: #fd4700
  border-bottom: medium solid
.left
  text-align: left
.flex
  display: flex
  &.header
    margin: 2rem
    justify-content: space-between
  &--center
    display: flex
    align-items: center
  &--grown0
    display: flex
    flex-grow: 0
    flex-basis: 20px
  &--grown1
    display: flex
    flex-grow: 1
  &--wrap
    flex-wrap: wrap
  &--column
    flex-direction: column
input
  width: 70vh;
</style>
