<template>
  <div>
    <ul v-if="comments.length" id="comments">
      <comment-block
        v-for="comment in comments"
        :key="comment.id_code"
        :comment="comment"
        :level="0"
      />
    </ul>
    <a
      :href="
        `https://dev.to/${$route.params.username}/${$store.state.currentArticle.slug}`
      "
      target="_blank"
      rel="nofollow noopener noreferer"
      class="add-comment"
    >
      Add comment
    </a>
  </div>
</template>

<script>
import CommentBlock from '@/components/blocks/CommentBlock'

export default {
  components: {
    CommentBlock
  },
  props: [],
  async fetch() {
    const response = await fetch(
      // eslint-disable-next-line
      `https://dev.to/api/comments?a_id=${this.$route.params.article}`
    )
    const parsedResponse = await response.json()
    // eslint-disable-next-line
    this.comments = parsedResponse
  },
  fetchOnServer: false,
  data() {
    return {
      comments: []
    }
  }
}
</script>

<style lang="scss" scoped>
.add-comment {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: $small-shadow;
  text-transform: uppercase;
  text-align: center;
  font-weight: $display-font-weight;
  letter-spacing: $-ls2;
  margin-bottom: 1rem;
  &:hover {
    background: $hovered-surface-color;
  }
  &:active {
    background: transparent;
    box-shadow: $small-inner-shadow;
  }
}
</style>
