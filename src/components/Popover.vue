<template>
  <b-button pill variant="light" size="sm" v-b-popover.hover="text" :title="title">
    {{ label }}
  </b-button>
</template>

<script>
export default {
  name: "PopoverButton",
  props: [ 'label', 'title', 'text']
}
</script>
