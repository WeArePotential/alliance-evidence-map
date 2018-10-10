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

function getStudiesLU(studies) {
  let lu = {}
  studies.forEach(d => {
    lu[d.id] = d
  })
  return lu
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
  // Only really needed for getting the outcome groups, so this can be simplified
  // Make similar to getInterventionCategoryGroups
  let a = []

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
    })

    a.push(group)
  })

  // console.log('array', a)
  return a
}

// function getCategoryGroups(items, cats) {
//     let a = []
//
//     cats.forEach(cat => {
//       let group = {
//         name: cat,
//         items: []
//       }
//
//       let itemsInCategory = items.filter(d => d.Category === cat)
//
//       itemsInCategory.forEach(item => {
//         group.items.push()
//       })
//     })
//
//
// }

function getInterventionCategoryGroups(interventions, iCats) {
  let a = []

  iCats.forEach(iCat => {
    let group = {
      name: iCat,
      interventions: []
    }

    let interventionsInCategory = interventions.filter(d => d.Category === iCat)

    interventionsInCategory.forEach(intervention => {
      group.interventions.push(intervention.Intervention)
    })

    a.push(group)
  })

  // console.log('interventionCategories', a)
  return a
}

function getMaxStudies(outcomeGroups) {
  let max = 0
  outcomeGroups.forEach(g => {
    g.outcomes.forEach(o => {
      o.interventions.forEach(i => {
        let m = Math.max(
          i.data.for.high.length,
          i.data.for.moderate.length,
          i.data.for.low.length,
          i.data.against.high.length,
          i.data.against.moderate.length,
          i.data.against.low.length
        )
        if(m > max) max = m
      })
    })
  })
  return max
}

export {getStudies, getStudiesLU, getCategories, getOutcomeInterventionLU, getOutcomeInterventionArray, getInterventionCategoryGroups, getMaxStudies}
