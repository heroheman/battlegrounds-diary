<template>
  <b-card header="Add your data">
    <b-form @submit="submitResult" @reset="resetForm">
      <b-row class="mb-4">
        <b-col>
          <!-- HERO SELECTION -->
          <b-form-select required v-model="result.hero" :options="heroOptions">
            <template v-slot:first>
              <option :value="null" disabled>-- Please select a hero --</option>
            </template>
          </b-form-select>
        </b-col>

        <b-col>
          <!-- PLACE SELECTION -->
          <b-form-select required v-model="result.placement">
            <template v-slot:first>
              <option :value="null" disabled>-- Results --</option>
            </template>
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

        <b-col>
          <!-- PLACE SELECTION -->
          <b-form-select required v-model="result.tribe" :options="tribeOptions">
            <template v-slot:first>
              <option :value="null" disabled>-- Select tribe --</option>
            </template>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col>
          <b-form-input required v-model="result.mmr" type="number" placeholder="New MMR" />
        </b-col>

        <b-col>
          <!-- PLACE SELECTION -->
          <b-form-select required v-model="result.summary" :options="summaryOptions">
            <template v-slot:first>
              <option :value="null" disabled>-- How are feeling about this? --</option>
            </template>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-textarea
            id="note"
            class="mb-3"
            v-model="result.note"
            size="sm"
            placeholder="Optional match notes e.g. Could not find Rock Hunter"
            rows="2"
            max-rows="6"
          />
        </b-col>
      </b-row>

      <b-row>

      </b-row>

      <b-row class="mb-4">
        <b-col>
          <b-form-checkbox
            v-model="result.missed"
            name="checkbox-1"
            value=true
            unchecked-value=false
            switch
            >
            Only set MMR
          </b-form-checkbox>
          <b-form-text class="mb-3">If you have not tracked some games since the last time</b-form-text>
        </b-col>
        <b-col class="text-right">
          <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "FormResult",
  data: () => ({
    result: {
      hero: null,
      placement: null,
      tribe: null,
      mmr: null,
      summary: null,
      missed: "false",
      note: null,
      timestamp: null
    }
  }),
  computed: {
    ...mapState('history', [
      'heroes', 'tribes', 'summary', 'mmr'
    ]),
    heroOptions () {
      return this.heroes.filter(h => h.active === true).map( hero => {
        let newObj = {}
        newObj['value'] = hero.id
        newObj['text'] = hero.name
        return newObj
      })
    },
    tribeOptions () {
      return this.tribes.map( tribe => {
        let newObj = {}
        newObj['value'] = tribe.id
        newObj['text'] = tribe.name
        return newObj
      })
    },
    summaryOptions () {
      return this.summary.map( sum => {
        let newObj = {}
        newObj['value'] = sum.id
        newObj['text'] = `${sum.titleShort} - ${sum.titleLong}`
        return newObj
      })
    }
  },
  methods: {
    ...mapActions('history', [
      'addResult', 'setMmr'
    ]),
    submitResult(e) {
      e.preventDefault();
      this.result.timestamp = new Date()
      this.result.difference = this.result.mmr - this.mmr
      let temp = {...this.result}
      this.addResult(temp)

      this.$nextTick(() => {
        this.setMmr(this.result.mmr)
      });
    },
    resetForm (e) {
      e.preventDefault();
      this.result.hero = null
      this.result.placement = null
      this.result.tribe = null
      this.result.mmr = null
      this.result.note = null
      this.result.summary = null
      this.result.missed = null
      this.result.timestamp = null
      this.result.difference = null
    }
  }
}
</script>
