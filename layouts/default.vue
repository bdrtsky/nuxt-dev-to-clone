<template>
  <div>
    <the-header />
    <nuxt keep-alive />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter,
    TheFork
  }
}
</script>

<style></style>
