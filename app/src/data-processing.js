import uniq from 'lodash/uniq'
import filter from 'lodash/filter'

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
      country: d.Country,
      population: d.Population,

      evidenceAgainst: d['Evidence against the intervention?'][0].toUpperCase() === 'Y',
      strengthOfEvidence: d['Strength of Evidence'].toLowerCase()
    }

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
    let id = d.id
    let evidenceAgainst = d.evidenceAgainst
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


// function getStudies(data) {
//   let ret = data.map((d, i) => {
//     d.id = i
//     d.outcomes = d.Outcomes.split(';').map(d => d.trim())
//     d.interventions = d.Interventions.split(';').map(d => d.trim())
//
//     d.outcomes = filter(d.outcomes, d => d !== '')
//     d.interventions = filter(d.interventions, d => d !== '')
//
//     // TEMP: capitalise first character
//     d.outcomes = d.outcomes.map(d => {
//       return d[0].toUpperCase() + d.slice(1)
//     })
//     d.interventions = d.interventions.map(d => {
//       return d[0].toUpperCase() + d.slice(1)
//     })
//
//     delete d.Outcomes
//     delete d.Interventions
//     return d
//   })
//   return ret
// }
//
// function getStudiesLU(studies) {
//   let lu = {}
//   studies.forEach(d => {
//     lu[d.id] = d
//   })
//   return lu
// }
//
// function getCategories(data) {
//   return uniq(data.map(d => d.Category))
// }
//
// function getOutcomeInterventionArray(lu, outcomes, interventions, oCats, iCats) {
//   // Only really needed for getting the outcome groups, so this can be simplified
//   // Make similar to getInterventionCategoryGroups
//   let a = []
//
//   oCats.forEach(oCat => {
//     let group = {
//       name: oCat,
//       outcomes: []
//     }
//
//     let outcomesInCategory = outcomes.filter(d => d.Category === oCat)
//
//     outcomesInCategory.forEach(outcome => {
//       let interventionList = interventions.map(intervention => {
//         let data = lu[outcome.Outcome][intervention.Intervention]
//
//         return {
//           intervention: intervention.Intervention,
//           data: data
//         }
//       })
//
//       group.outcomes.push({
//         outcome: outcome.Outcome,
//         interventions: interventionList
//       })
//     })
//
//     a.push(group)
//   })
//
//   // console.log('array', a)
//   return a
// }
//


// // function getCategoryGroups(items, cats) {
// //     let a = []
// //
// //     cats.forEach(cat => {
// //       let group = {
// //         name: cat,
// //         items: []
// //       }
// //
// //       let itemsInCategory = items.filter(d => d.Category === cat)
// //
// //       itemsInCategory.forEach(item => {
// //         group.items.push()
// //       })
// //     })
// //
// //
// // }
//
// function getInterventionCategoryGroups(interventions, iCats) {
//   let a = []
//
//   iCats.forEach(iCat => {
//     let group = {
//       name: iCat,
//       interventions: []
//     }
//
//     let interventionsInCategory = interventions.filter(d => d.Category === iCat)
//
//     interventionsInCategory.forEach(intervention => {
//       group.interventions.push(intervention.Intervention)
//     })
//
//     a.push(group)
//   })
//
//   // console.log('interventionCategories', a)
//   return a
// }
//
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


export {getOutcomes, getInterventions, getOutcomeGroups, getInterventionGroups, getStudies, getStudiesLU, getOutcomeInterventionLU, getMaxStudies}
