<template>
  <div class="page-wrapper">
    <template v-if="$fetchState.pending && !articles.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ error }}</p>
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <article-card-block
          v-for="(article, i) in articles"
          :key="article.id"
          v-observe-visibility="
            i === articles.length - 1 ? lazyLoadArticles : false
          "
          :article="article"
          class="article-card-block"
        />
      </div>
    </template>
    <template v-if="$fetchState.pending && articles.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
  </div>
</template>

<script>
import ArticleCardBlock from '@/components/blocks/ArticleCardBlock'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default {
  components: {
    ArticleCardBlock
  },
  async fetch() {
    const res = await fetch(
      // eslint-disable-next-line
      `https://dev.to/api/articles?tag=${this.$route.params.tag}&top=365&page=${this.currentPage}`
    )
    const parsedResponse = await res.json()
    // eslint-disable-next-line
    this.articles = [...this.articles, ...parsedResponse]
  },
  data() {
    return {
      currentPage: 1,
      articles: []
    }
  },
  methods: {
    lazyLoadArticles(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage++
          this.$fetch()
        }
      }
    }
  },
  head() {
    return {
      title:
        this.$route.params.tag &&
        `${capitalize(this.$route.params.tag)} articles`
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}
.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-lg) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}
</style>
