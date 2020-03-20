<template>
  <div class="page-wrapper">
    <div class="article-content-wrapper">
      <article-block class="article-block" />
      <comments-block class="comments-block" />
    </div>
    <div class="aside-username-wrapper">
      <aside-username-block class="aside-username-block" />
    </div>
  </div>
</template>

<script>
import ArticleBlock from '@/components/blocks/ArticleBlock'
import CommentsBlock from '@/components/blocks/CommentsBlock'
import AsideUsernameBlock from '@/components/blocks/AsideUsernameBlock'

export default {
  components: {
    ArticleBlock,
    CommentsBlock,
    AsideUsernameBlock
  },
  props: [],
  data() {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  display: flex;
}

.article-content-wrapper {
  width: 100%;
  max-width: 880px;
  margin: auto;
  @media (min-width: $screen-xl) {
    width: 66.66666%;
  }
  .article-block {
    margin-bottom: 2rem;
    @media (min-width: $screen-xl) {
      margin: 0.5rem;
      margin-bottom: 2rem;
    }
  }
  .comments-block {
    @media (min-width: $screen-xl) {
      margin: 0.5rem;
    }
  }
}

.aside-username-wrapper {
  display: none;
  @media (min-width: $screen-xl) {
    display: block;
    width: 33.33333%;
  }
  position: relative;
  .aside-username-block {
    position: sticky;
    top: 1rem;
    margin: 0.5rem;
  }
}
</style>
