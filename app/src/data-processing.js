import uniq from 'lodash/uniq'
import filter from 'lodash/filter'
import includes from 'lodash/includes'

function getOutcomes(outcomes) {
  let ret = outcomes.map(d => d.Outcome)
  return ret
}

function getInterventions(interventions) {
  let ret = interventions.map(d => d.Intervention)
  return ret
}

function getOutcomeLU(outcomes) {
  let lu = {}
  outcomes.forEach(d => {
    lu[d.Code] = d.Outcome
  })
  return lu
}

function getInterventionLU(interventions) {
  let lu = {}
  interventions.forEach(d => {
    lu[d.Code] = d.Intervention
  })
  return lu
}

function getStudies(ivs, ocs, data) {
  let studies = []
  let ivlu = getInterventionLU(ivs)
  let oclu = getOutcomeLU(ocs)

  data.forEach((d, i) => {
    let study = {
      id: i,
      title: d.Title,
      summary: d.Summary,
      orgsInvolved: d['Orgs involved'],
      date: d.Date,
      url: d.Link,

      // evidenceAgainst: d['Evidence against the intervention?'][0].toUpperCase() === 'Y',
      forAgainstEvidence: d['Evidence against the intervention?'][0].toUpperCase() === 'Y' ? 'against' : 'for',
      strengthOfEvidence: d['Strength of Evidence'].toLowerCase(),
      // internalExternal: d['Internal / External'].toUpperCase().slice(0,2) === 'IN' ? 'Internal' : d['Internal / External'].toUpperCase().slice(0,2) === 'EX' ? 'External' : 'Unknown',
      // studyType: d['Primary study / Review']
    }

    let population = d.Population.split(';')
    population = population.map(d => d.trim())
    study.population = population

    let countries = d.Country.split(';')
    countries = countries.map(d => d.trim())
    study.countries = countries

    let interventions = d.Interventions.split(';')
    interventions = interventions.map(d => ivlu[+d])
    study.interventions = interventions

    let outcomes = d.Outcomes.split(';')
    outcomes = outcomes.map(d => oclu[+d])
    study.outcomes = outcomes

    studies.push(study)
  })

  return studies
}

function getStudiesLU(studies) {
  let lu = []
  studies.forEach(d => {
    lu[d.id] = d
  })

  return lu
}

function getOutcomeInterventionLU(ivs, ocs, studies) {
  let lu = {}

  // Make LU structure
  ocs.forEach(outcome => {
    lu[outcome] = {}
    ivs.forEach(intervention => {
      lu[outcome][intervention] = {
        for: {
          low: [],
          moderate: [],
          high: []
        },
        against: {
          low: [],
          moderate: [],
          high: []
        }
      }
    })
  })

  // Fill it in!
  studies.forEach(d => {
    let evidenceAgainst = d.forAgainstEvidence === 'against'
    let strength = d.strengthOfEvidence

    d.outcomes.forEach(outcome => {
      d.interventions.forEach(intervention => {
        if(evidenceAgainst) {
          lu[outcome][intervention].against[strength].push(d.id)
        } else {
          lu[outcome][intervention].for[strength].push(d.id)
        }
      })
    })
  })

  // console.log('LU', lu)

  return lu
}

function getOutcomeGroups(outcomes) {
  let cats = outcomes.map(d => d.Category)
  cats = uniq(cats)

  let a = []

  cats.forEach(cat => {
    let group = {
      name: cat,
      items: []
    }

    let itemsInCategory = filter(outcomes, d => d.Category === cat)

    itemsInCategory.forEach(item => {
      group.items.push(item.Outcome)
    })

    group.size = group.items.length

    a.push(group)
  })
  return a
}

function getInterventionGroups(interventions) {
  let cats = interventions.map(d => d.Category)
  cats = uniq(cats)

  let a = []

  cats.forEach(cat => {
    let group = {
      name: cat,
      items: []
    }

    let itemsInCategory = filter(interventions, d => d.Category === cat)

    itemsInCategory.forEach(item => {
      group.items.push(item.Intervention)
    })

    group.size = group.items.length

    a.push(group)
  })
  return a
}

function getMaxStudies(ivs, ocs, lu) {
  let max = 0
  ocs.forEach(o => {
    ivs.forEach(i => {
      let d = lu[o][i]
      let m = Math.max(
        d.for.high.length,
        d.for.moderate.length,
        d.for.low.length,
        d.against.high.length,
        d.against.moderate.length,
        d.against.low.length
      )
      if(m > max) max = m
    })
  })
  return max
}

function getFilteredStudies(studies, filters) {
  // console.log('filter', filters)
  let filtered = filter(studies, study => {
    let include = true

    filters.filterIds.forEach(id => {
      if(filters[id] === 'All')
        return

      if(id === 'population' || id=== 'countries') {
        if(!includes(study[id], filters[id]))
          include = false
      } else {
        if(study[id] !== filters[id])
          include = false
      }
    })

    return include
  })

  return filtered
}

export {
  getOutcomes,
  getInterventions,
  getOutcomeGroups,
  getInterventionGroups,
  getStudies,
  getStudiesLU,
  getOutcomeInterventionLU,
  getMaxStudies,
  getFilteredStudies
}
