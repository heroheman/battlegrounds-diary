import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'
import dataSummary from '@/data/summary.json'

import {
  placementEmoji, uuidv4, howMany,
  precise, encodeDiaryData, decodeDiaryData
} from '@/helper'

const state = {
  heroes: dataHeroes,
  tribes: dataTribes,
  summary: dataSummary,
  mmr: null,
  results: [],
  resultsBackup: []
}

const mutations = {
  ADD_RESULT: (state, payload) => {
    state.results.push(payload)
  },
  SET_MMR: (state, payload) => {
    state.mmr = payload
  },
  DELETE_RESULT: (state, id) => {
    const index = state.results.findIndex(result => result.id == id)
    state.results.splice(index, 1)
  },
  UPDATE_RESULT: () => {
  },
  SET_IMPORTED_RESULTS: (state, payload) => {
    state.results = []
    state.results = payload
  },
  SET_BACKUP_RESULTS: (state) => {
    const backupData = {
      id: uuidv4(),
      createdAt: new Date(),
      data: encodeDiaryData(state.results)
    }
    // autocleanup if more than 3
    if (state.resultsBackup.length > 2) {
      state.resultsBackup.shift()
    }
    state.resultsBackup.push(backupData)
  }
}

const actions = {
  addResult ({ commit }, data) {
    return new Promise(async (resolve, reject) => {
      data.id = uuidv4()
      commit('ADD_RESULT', data)
      resolve(true)
    })
  },
  setMmr ({ commit }, data) {
    commit('SET_MMR', data)
  },
  deleteResult ({ commit, state }, id) {
    commit('DELETE_RESULT', id)
    // reset mmr to last added result
    commit('SET_MMR', [...state.results].pop().mmr)
  },
  updateResult ({ commit }, data) {
    commit('UPDATE_RESULT', data)
  },
  setBackupResults ({ commit }, data) {
    return new Promise(async (resolve, reject) => {
      commit('SET_BACKUP_RESULTS')
    })
  },
  setImportedResults ({ commit, state }, data) {
    return new Promise(async (resolve, reject) => {
      const payload = decodeDiaryData(data)
      if (state.results.length > 0) {
        commit('SET_BACKUP_RESULTS')
      }
      commit('SET_IMPORTED_RESULTS', payload)
      commit('SET_MMR', [...state.results].pop().mmr)
      resolve(true)
    })
  }
}

const getters = {
  resultsJSON: state => encodeDiaryData(state.results),
  resultsTableData: state => {
    return state.results.map((res, index, arr) => {
      return {
        id: res.id,
        hero: state.heroes.find( h => res.hero === h.id ).name || '',
        tribe: state.tribes.find( t => t.id === res.tribe ).name || '',
        mmr: res.mmr,
        difference: res.difference,
        placement: `${res.placement} ${placementEmoji(res.placement)}`,
        summary: state.summary.find( s => s.id === res.summary ).titleShort || '',
        timestamp: res.timestamp,
        note: res.note,
        missed: res.missed,
        place: res.placement,
        last: arr.length - 1 === index ? true : false
      }
    })
  },
  mmrChartData: state => resultsLength => {
    let mmr = {
      labels: [],
      data: []
    }
    for (let result of state.results) {
      mmr.data.push(result.mmr)
      let hero = state.heroes.find( h => result.hero === h.id ).name
      let tribe = state.tribes.find( t => result.tribe === t.id ).name
      mmr.labels.push(`${hero} / ${tribe}`)
    }

    mmr.data = mmr.data.slice(resultsLength * -1)
    mmr.labels = mmr.labels.slice(resultsLength * -1)
    return mmr;
  },
  dayChartData: state => resultsLength => {
    let days = {
      labels: [],
      total: [], points: [],
      win: [], lose: [],
      top1: [], top2: [], top3: [], top4: [],
      top5: [], top6: [], top7: [], top8: [],
    }

    // this gives an object with dates as keys
    const groups = state.results.reduce((groups, game) => {
      const date = game.timestamp.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});

    // add it in the array format
    const groupArray = Object.keys(groups).map((date) => {
      return {
        date, games: groups[date]
      };
    });


    for (const day of groupArray) {
      let tmp = {
        win: 0, lose: 0,
      }
      tmp['1'] = 0
      tmp['2'] = 0
      tmp['3'] = 0
      tmp['4'] = 0
      tmp['5'] = 0
      tmp['6'] = 0
      tmp['7'] = 0
      tmp['8'] = 0

      for (const game of day.games) {
        tmp[game.placement] += 1
        game.placement < 5 ? tmp.win++ : tmp.lose++
      }

      days.labels.push(day.date)
      days.total.push(day.games.length)
      days.win.push(tmp.win)
      days.lose.push(tmp.lose)
      days.top1.push(tmp['1'])
      days.top2.push(tmp['2'])
      days.top3.push(tmp['3'])
      days.top4.push(tmp['4'])
      days.top5.push(tmp['5'])
      days.top6.push(tmp['6'])
      days.top7.push(tmp['7'])
      days.top8.push(tmp['8'])
    }

    days.labels = days.labels.slice(resultsLength * -1)
    days.total = days.total.slice(resultsLength * -1)
    days.win = days.win.slice(resultsLength * -1)
    days.lose = days.lose.slice(resultsLength * -1)
    days.top1 = days.top1.slice(resultsLength * -1)
    days.top2 = days.top2.slice(resultsLength * -1)
    days.top3 = days.top3.slice(resultsLength * -1)
    days.top4 = days.top4.slice(resultsLength * -1)
    days.top5 = days.top5.slice(resultsLength * -1)
    days.top6 = days.top6.slice(resultsLength * -1)
    days.top7 = days.top7.slice(resultsLength * -1)
    days.top8 = days.top8.slice(resultsLength * -1)

    return days;
  },
  heroesChartData: state => {
    let heroes = {
      labels: [],
      data: []
    }

    for (let res of state.heroes) {
      let games = howMany(state.results, 'hero')(res.id)
      if (games > 0) {
        heroes.labels.push(res.name)
        heroes.data.push(games)
      }
    }
    return heroes
  },
  heroesChartDataTable: state => {
    let heroesTable = []
    for (let res of state.heroes) {
      let games = howMany(state.results, 'hero')(res.id)
      if (games > 0) {
        heroesTable.push({
          hero: res.name,
          games: games
        })
      }
    }
    // sort desc
    heroesTable = heroesTable.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
    return heroesTable
  },
  tribeChartData: state => {
    let tribes = {
      labels: [],
      data: []
    }

    for (let res of state.tribes) {
      let wins = howMany(state.results, 'tribe')(res.id)
      if (wins > 0) {
        tribes.labels.push(res.name)
        tribes.data.push(wins)
      }
    }
    return tribes
  },
  tribeChartDataTable: state => {
    let arr = []
    for (let res of state.tribes) {
      let games = howMany(state.results, 'tribe')(res.id)
      if (games > 0) {
        arr.push({
          tribe: res.name,
          games: games
        })
      }
    }
    // sort desc
    arr = arr.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
    return arr
  },
  satisfactionChartData: state => {
    let satis = {
      labels: [],
      data: []
    }

    for (let sum of state.summary) {
      let summary = howMany(state.results, 'summary')(sum.id)
      if (summary > 0) {
        satis.labels.push(sum.titleShort)
        satis.data.push(summary)
      }
    }
    return satis
  },
  averageGainLose: state => {
    let ranks = 8
    let points = []
    for (let i = 0; i < ranks; i++) {
      let items = state.results.filter(res => parseInt(res.placement) === (i + 1)) || {}
      let gains = 0
      for (let item of items) {
        gains += parseInt(item.difference)
        // console.log(item.difference, gains)
      }
      const tmp = {
        place: i+1,
        matches: items.length,
        average: precise(gains / items.length)
      }
      points.push(tmp)
    }

    return points
  },
  leaderboardHeroes: state => {
    const leaderboard = []
    for (const hero of state.heroes) {
      let heroResults = state.results.filter( r => hero.id === r.hero )

      let data = {
        hero: hero.name,
        gamesPlayed: heroResults.length,
        points: 0,
        top1: 0,
        top4: 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
      }

      for (let hr of heroResults) {
        data[hr.placement] += 1
        data.points += parseInt(hr.difference)
        switch (hr.placement) {
          case '1':
            data.top1 +=1
            data.top4 +=1
            break
          case '2':
            data.top4 +=1
            break
          case '3':
            data.top4 +=1
            break
          case '4':
            data.top4 +=1
            break
          default:
            break
        }
      }

      data.pointsAverage = precise(data.points / data.gamesPlayed)

      if (
        !(data[1] === 0 &&
        data[2] === 0 &&
        data[3] === 0 &&
        data[4] === 0 &&
        data[5] === 0 &&
        data[6] === 0 &&
        data[7] === 0 &&
        data[8] === 0)
      ) {
        leaderboard.push(data)
      }
    }
    return leaderboard
  },
  leaderboardTribes: state => {
    const leaderboard = []
    for (const tribe of state.tribes) {
      let tribeResults = state.results.filter( r => tribe.id === r.tribe )

      let data = {
        tribe: tribe.name,
        gamesPlayed: tribeResults.length,
        pointsAverage: 0,
        points: 0,
        top1: 0,
        top4: 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
      }

      for (let tr of tribeResults) {
        data[tr.placement] += 1
        data.points += parseInt(tr.difference)
        switch (tr.placement) {
          case '1':
            data.top1 +=1
            data.top4 +=1
            break
          case '2':
            data.top4 +=1
            break
          case '3':
            data.top4 +=1
            break
          case '4':
            data.top4 +=1
            break
          default:
            break
        }
      }

      data.pointsAverage = precise(data.points / data.gamesPlayed)

      if (
        !(data[1] === 0 &&
        data[2] === 0 &&
        data[3] === 0 &&
        data[4] === 0 &&
        data[5] === 0 &&
        data[6] === 0 &&
        data[7] === 0 &&
        data[8] === 0)
      ) {
        leaderboard.push(data)
      }
    }
    return leaderboard
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
