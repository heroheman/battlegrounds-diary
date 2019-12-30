<template>
  <div class="text-right">
    <b-button variant="outline-info" @click="downloadAsImage()" size="sm">
      <unicon class="download-icon" name="image-download" fill="currentColor" width="13" height="13"></unicon>

      Download as PNG
    </b-button>
  </div>
</template>

<script>
export default {
  props: ['filename', 'canvas'],
  methods: {
    downloadAsImage() {
        const d = new Date();
        const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
              d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + "-" + ("0" + d.getMinutes()).slice(-2);

        let canvas = this.canvas.toDataURL('image/png')
        let link = document.createElement('a')
        link.download = `chart-${this.filename}-${datestring}`
        link.href = canvas
        link.click()
    }
  }
}
</script>

<style scoped>
.download-icon {
  position: relative;
  top: -2px;
}
</style>
