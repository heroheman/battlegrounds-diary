<template>
  <b-card header="Add your data">
    <b-form @submit="submitResult" @reset="handleReset">
      <b-row>
        <b-col sm="12" md="4" class="mb-4">
          <!-- HERO SELECTION -->
          <b-form-select required v-model="result.hero">
            <template v-slot:first>
              <option :value="null" disabled>-- Please select a hero --</option>
            </template>
            <option v-for="(h,index) in heroOptions" :key="index" :value="h.value" :class="h.class">
              {{ h.text }}
            </option>
          </b-form-select>
        </b-col>

        <b-col sm="12" md="4" class="mb-4">
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

        <b-col sm="12" md="4" class="mb-4">
          <!-- PLACE SELECTION -->
          <b-form-select required v-model="result.tribe" :options="tribeOptions">
            <template v-slot:first>
              <option :value="null" disabled>-- Select tribe --</option>
            </template>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col sm="12" md="4" class="mb-4">
          <b-form-input required v-model="result.mmr" type="number" placeholder="New Rating" />
        </b-col>

        <b-col sm="12" md="4" class="mb-4">
          <!-- PLACE SELECTION -->
          <b-form-select required v-model="result.summary" :options="summaryOptions">
            <template v-slot:first>
              <option :value="null" disabled>-- How are feeling about this? --</option>
            </template>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="12" class="mb-4">
          <b-form-textarea
            id="note"
            class="mb-3"
            v-model="result.note"
            size="sm"
            placeholder="Optional match notes e.g. 'Could not find Rock Hunter'"
            rows="2"
            max-rows="6"
          />
        </b-col>
      </b-row>

      <b-row>

      </b-row>

      <b-row class="mb-4">
        <b-col sm="12" md="6">
          <b-form-checkbox
            v-model="result.missed"
            name="checkbox-1"
            value=true
            unchecked-value=false
            switch
            >
            Unlink from previous tracked games.
          </b-form-checkbox>
          <b-form-text class="mb-3">No point difference. Useful if you have not tracked some games</b-form-text>
        </b-col>
        <b-col class="text-right" sm="12" md="6">
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
      'heroes', 'tribes', 'summary', 'mmr', 'results'
    ]),
    heroOptions () {
      let heroes = []
      let active = this.heroes.filter(h => h.active === true).map( hero => {
        let newObj = {}
        newObj['value'] = hero.id
        newObj['text'] = `${hero.name}`
        newObj['class'] = ''
        return newObj
      })
      let inactive = this.heroes.filter(h => h.active === false).map( hero => {
        let newObj = {}
        newObj['value'] = hero.id
        newObj['text'] = `${hero.name} - retired`
        newObj['class'] = 'text-cursive'
        return newObj
      })

      heroes = [...active, ...inactive]

      return heroes
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
      this.result.timestamp = new Date().toISOString()
      if (this.result.missed === 'true' || !this.results.length) {
        this.result.difference = 0
      } else {
        this.result.difference = this.result.mmr - this.mmr
      }
      let temp = {...this.result}
      this.addResult(temp)
        .then(() => {
          this.setMmr(this.result.mmr)
          this.resetForm()
        })
        .then(() => {
          this.toast(true)
        })
    },
    handleReset(e) {
      e.preventDefault()
      this.resetForm()
    },
    resetForm () {
      this.result.hero = null
      this.result.placement = null
      this.result.tribe = null
      this.result.mmr = null
      this.result.note = null
      this.result.summary = null
      this.result.missed = null
      this.result.timestamp = null
      this.result.difference = null
    },
    toast(append = false) {
      this.counter++
      this.$bvToast.toast('Result added', {
        toaster: 'b-toaster-bottom-center',
        solid: true,
        variant:'success',
        appendToast: append
      })
    }
  }
}
</script>

<style>
.text-cursive {
  font-weight: italic;
}
</style>
