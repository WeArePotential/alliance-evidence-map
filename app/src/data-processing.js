import uniq from 'lodash/uniq'
import filter from 'lodash/filter'

function getStudies(data) {
  let ret = data.map((d, i) => {
    d.id = i
    d.outcomes = d.Outcomes.split(';').map(d => d.trim())
    d.interventions = d.Interventions.split(';').map(d => d.trim())

    d.outcomes = filter(d.outcomes, d => d !== '')
    d.interventions = filter(d.interventions, d => d !== '')

    // TEMP: capitalise first character
    d.outcomes = d.outcomes.map(d => {
      return d[0].toUpperCase() + d.slice(1)
    })
    d.interventions = d.interventions.map(d => {
      return d[0].toUpperCase() + d.slice(1)
    })

    delete d.Outcomes
    delete d.Interventions
    return d
  })
  return ret
}

function getCategories(data) {
  return uniq(data.map(d => d.Category))
}

function getOutcomeInterventionLU(outcomes, interventions, studies) {
  let lu = {}

  // Make LU structure
  outcomes.forEach(outcome => {
    lu[outcome.Outcome] = {}
    interventions.forEach(intervention => {
      lu[outcome.Outcome][intervention.Intervention] = {
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
    let id = d.id
    let evidenceAgainst = d['Evidence against the intervention?'][0].toUpperCase() === 'Y'
    let strength = d['Strength of Evidence'].toLowerCase()

    d.outcomes.forEach(outcome => {
      d.interventions.forEach(intervention => {
        if(lu[outcome] === undefined) {
          // console.log('no outcome for', outcome, 'from', d)
          return
        }
        if(lu[outcome][intervention] === undefined) {
          // console.log('no intervention for', intervention, 'from', d)
          return
        }
        if(evidenceAgainst) {
          lu[outcome][intervention].against[strength].push(d.id)
        } else {
          lu[outcome][intervention].for[strength].push(d.id)
        }
      })
    })
  })

  return lu
}

function getOutcomeInterventionArray(lu, outcomes, interventions, oCats, iCats) {
  let a = []

  console.log(oCats, iCats)

  oCats.forEach(oCat => {
    let group = {
      name: oCat,
      outcomes: []
    }

    let outcomesInCategory = outcomes.filter(d => d.Category === oCat)

    outcomesInCategory.forEach(outcome => {
      let interventionList = interventions.map(intervention => {
        let data = lu[outcome.Outcome][intervention.Intervention]

        return {
          intervention: intervention.Intervention,
          data: data
        }
      })

      group.outcomes.push({
        outcome: outcome.Outcome,
        interventions: interventionList
      })
      // console.log(outcome.Outcome)
      // group.outcomes.push(lu[outcome.Outcome])
    })

    a.push(group)
  })

  console.log('array', a)
  return a
}

export {getStudies, getCategories, getOutcomeInterventionLU, getOutcomeInterventionArray}
