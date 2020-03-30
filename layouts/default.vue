<template>
  <div>
    <github-banner />
    <the-header />
    <nuxt keep-alive />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import GithubBanner from '@/components/GithubBanner'

export default {
  components: {
    TheHeader,
    TheFooter,
    GithubBanner
  }
}
</script>

<style></style>
