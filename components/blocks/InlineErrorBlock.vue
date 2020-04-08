<template>
  <div class="error-block">
    <warning-icon />
    <h2>{{ error.message }}</h2>
  </div>
</template>

<script>
import WarningIcon from '@/assets/icons/warning.svg?inline'

export default {
  components: {
    WarningIcon
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.error-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
svg {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  opacity: 0.75;
}
h2 {
  font-size: $text-2xl;
  text-align: center;
}
</style>
