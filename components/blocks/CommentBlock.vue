<template>
  <li class="comment" :class="level !== 0 && 'reply'">
    <div class="card">
      <div class="profile">
        <nuxt-link
          :to="{
            name: 'username',
            params: { username: comment.user.username }
          }"
          class="inner-link"
        >
          <img :src="comment.user.profile_image_90" :alt="comment.user.name" />
          <span>{{ comment.user.name }}</span>
        </nuxt-link>
        <a
          v-if="comment.user.twitter_username"
          :href="`https://twitter.com/${comment.user.twitter_username}`"
          target="_blank"
        >
          <twitter-icon />
        </a>
        <a
          v-if="comment.user.github_username"
          :href="`https://github.com/${comment.user.github_username}`"
          target="_blank"
        >
          <github-icon />
        </a>
        <a
          v-if="comment.user.website_url"
          :href="comment.user.website_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <external-link-icon />
        </a>
      </div>
      <!-- eslint-disable-next-line -->
      <div v-html="comment.body_html" class="html-content"></div>
    </div>
    <ul>
      <comment-block
        v-for="reply in comment.children"
        :key="reply.id_code"
        :comment="reply"
        :level="level + 1"
      />
    </ul>
  </li>
</template>

<script>
import CommentBlock from '@/components/blocks/CommentBlock'
import TwitterIcon from '~/assets/icons/twitter.svg?inline'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ExternalLinkIcon from '~/assets/icons/external-link.svg?inline'

export default {
  name: 'CommentBlock',
  components: {
    CommentBlock,
    TwitterIcon,
    GithubIcon,
    ExternalLinkIcon
  },
  props: {
    comment: {
      type: Object,
      default: null
    },
    level: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .card {
    background-color: white;
    border-radius: 0.5rem;
    margin: 1rem 0;
    padding: 1rem;
    .profile {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      a {
        margin: 0 0.5rem;
        letter-spacing: $-ls2;
        &:hover {
          color: $primary-color;
          svg {
            color: $primary-color;
          }
        }
      }
      .inner-link {
        display: flex;
        align-items: center;
        margin-left: 0;
        font-size: $text-lg;
        font-weight: $bold-body-font-weight;
        line-height: 1;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
      }
    }
  }
}
.reply {
  @media (min-width: $screen-md) {
    padding-left: 2rem;
  }
}

::v-deep .html-content {
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  h4 {
    font-size: $text-base;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  a {
    color: $primary-color;
  }
  p {
    font-size: $text-sm;
    margin-bottom: 1rem;
    line-height: 1.4;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
  }
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: numeral;
    margin-bottom: 1rem;
    li p {
      margin-bottom: 0;
    }
  }
  ol {
    margin-bottom: 1rem;
  }
}
</style>
