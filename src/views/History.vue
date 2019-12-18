<template>
  <div>

    <b-row>
      <b-col>
        <b-card header="Add your data">
          <b-form>
            <b-row class="mb-4">
              <b-col>
                <!-- HERO SELECTION -->
                <b-form-select v-model="results.hero" :options="heroOptions">
                  <template v-slot:first>
                    <option :value="null" disabled>-- Please select a hero --</option>
                  </template>
                </b-form-select>
              </b-col>

              <b-col>
                <!-- PLACE SELECTION -->
                <b-form-select v-model="results.placement">
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
                <b-form-select v-model="results.tribe" :options="tribeOptions">
                  <template v-slot:first>
                    <option :value="null" disabled>-- Select tribe --</option>
                  </template>
                </b-form-select>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-input type="number" placeholder="New MMR" />
              </b-col>

              <b-col>
                <!-- PLACE SELECTION -->
                <b-form-select v-model="results.summary">
                  <template v-slot:first>
                    <option :value="null" disabled>-- How are feeling about this? --</option>

                    <option value="1">1 - Totally my fault. Meh.</option>
                    <option value="2">2 - Stupid RNG. F%$# this s#@% game</option>
                    <option value="3">3 - It was ok and a reasonable result</option>
                    <option value="4">4 - Thank you RNGesus! Love you!</option>
                    <option value="5">5 - Steamrolled them, Kripp - come at me!</option>
                  </template>
                </b-form-select>
              </b-col>

              <b-col>
                <b-form-checkbox
                  v-model="results.missed"
                  name="checkbox-1"
                  value=true
                  unchecked-value=false
                >
                  I did not track a few games since the last time.
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "History",
  data: () => ({
    results: {
      hero: null,
      placement: null,
      tribe: null,
      summary: null,
      missed: "false"
    }
  }),
  computed: {
    ...mapState('history', [
      'heroes', 'tribes'
    ]),
    heroOptions () {
      return this.heroes.map( hero => {
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
    }
  }
}
</script>
