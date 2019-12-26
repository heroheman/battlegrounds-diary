<template>
  <div>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      @change="loadCodeFromFile"
      drop-placeholder="Drop file here...">
    </b-form-file>
    <!-- <input type="file" @change="loadCodeFromFile"> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    file: null,
  }),
  methods: {
    loadCodeFromFile(ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = e => this.$emit("load", e.target.result)
      reader.readAsText(file)
    },
  }
}
</script>
