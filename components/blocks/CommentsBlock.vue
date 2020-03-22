<template>
  <div>
    <ul>
      <comment-block
        v-for="comment in comments"
        :key="comment.id_code"
        :comment="comment"
        :level="0"
      />
    </ul>
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

<style lang="scss" scoped></style>
