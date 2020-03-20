<template>
  <header>
    <nuxt-link to="/" class="logo-wrapper">
      <nuxt-icon />
    </nuxt-link>
    <nav>
      <ul>
        <li v-for="link in links" :key="link.slug">
          <nuxt-link :to="{ name: link.slug }">
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import NuxtIcon from '@/assets/icons/nuxt.svg?inline'

export default {
  components: {
    NuxtIcon
  },
  props: [],
  data() {
    return {
      links: [
        {
          name: 'New',
          slug: 'index'
        },
        {
          name: 'Top',
          slug: 'top'
        }
      ]
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
header {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem 2rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo-wrapper {
    margin: 0 1rem;
    svg {
      width: 3rem;
      height: 100%;
    }
  }
  nav {
    // font-size: $text-xl;
    letter-spacing: $-ls2;
    font-weight: $display-font-weight;
    text-transform: uppercase;
    ul {
      display: flex;
      li {
        margin: 0 0.5rem;
        a {
          box-shadow: $small-shadow;
          padding: 0.25rem 1rem;
          border-radius: 0.5rem;
          &.nuxt-link-exact-active {
            box-shadow: $small-inner-shadow;
          }
        }
      }
    }
  }
}
</style>
