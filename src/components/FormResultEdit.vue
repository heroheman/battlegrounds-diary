<template>
  <b-row>
    <b-col cols="12" class="mb-2">
      <b-form-select v-model="result.hero" required @change="emitData">
        <option v-for="(h,index) in heroes" :key="index" :value="h.id">
        {{ h.name }}
        </option>
      </b-form-select>
    </b-col>
    <b-col cols="12" class="mb-2">
      <b-form-select v-model="result.tribe" required @change="emitData">
        <option v-for="(t,index) in tribes" :key="index" :value="t.id">
        {{ t.name }}
        </option>
      </b-form-select>
    </b-col>

    <b-col cols="12" class="mb-2">
      <b-form-select v-model="result.summary" required @change="emitData">
        <option v-for="(s,index) in summary" :key="index" :value="s.id">
        {{ s.titleShort }} {{ s.titleLong }}
        </option>
      </b-form-select>
    </b-col>

    <b-col cols="12" class="mb-2">
      <b-form-select v-model="result.placement" required @change="emitData">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="null">I don't wanna talk about this</option>
      </b-form-select>
    </b-col>

    <b-col cols="12" class="mb-2">
      <b-form-input v-model="result.mmr" required @input="emitData">
      </b-form-input>
    </b-col>

    <b-col cols="12" class="mb-2">
      <b-form-input v-model="result.difference" @input="emitData">
      </b-form-input>
    </b-col>

    <b-col cols="12" class="mb-2">
      <b-textarea v-model="result.note" @input="emitData"></b-textarea>
    </b-col>

    <b-col cols="12">
      <b-alert show variant="warning">
        <small>
        <strong>Note:</strong> Changing data is irreversible. Also it's not changing  gained/losed ranked points from follow-up data.
        </small>
      </b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'FormResultEdit',
  props: ['resultId'],
  data: () => ({
    result: {}
  }),
  computed: {
    ...mapState('history', [
      'heroes', 'tribes', 'summary'
    ]),
    ...mapGetters('history', [ 'resultById' ]),
    item () {
      return this.resultById(this.resultId)
    }
  },
  methods: {
    emitData(event) {
      this.$emit('editData', this.result)
    }
  },
  mounted () {
    this.result = {...this.item}
  }
}
</script>
