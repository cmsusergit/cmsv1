import apiObject from '@/dataserve/student_serve.js'
import _ from 'lodash'

const state = {
  loadCalc:null,
  loadCalcDetail:[]
};
const getters = {
  getLoadCalculation:(state)=>{
    return state.loadCalc
  },
  getLoadCalcDetail:(state)=>{

    return state.loadCalcDetail
  }
};
const mutations = {
SET_LOADCALC:(state,dt)=>{
  state.loadCalc=dt;
},
SET_LOADCALC_DETAIL:(state,dt)=>{
  state.loadCalcDetail=dt;
},
};
const actions = {
  add_load_calculation:({commit},dt)=>{
  const url1='/Loadcalcs/'
  return new Promise(function(resolve, reject) {
      apiObject.post(url1,dt)
        .then(rr=>{
          commit('SET_LOADCALC',rr.data)
          resolve(rr.data)
        })
        .catch(error=>{
          console.log('****',error);
          reject(error)
        })
      });
    },
    load_load_Calc_detail({commit},dt){
      const url1=`/Loadcalcs/${dt}/loadcalcDepts`
      console.log('----',url1);
      return new Promise(function(resolve, reject) {
          apiObject.get(url1,dt)
            .then(rr=>{
              commit('SET_LOADCALC_DETAIL',rr.data)
              resolve(rr.data)
            })
            .catch(error=>{
              console.log('****',error);
              reject(error)
            })
          });
    },
  add_load_calc_detail:({commit},dt)=>{
    const url1=`/Loadcalcs/${dt.lcId}/loadcalcDepts`
    console.log('----',JSON.stringify(dt));
    console.log('----',url1);
    return new Promise(function(resolve, reject) {
        apiObject.post(url1,dt)
          .then(rr=>{
            commit('SET_LOADCALC_DETAIL',rr.data)
            resolve(rr.data)
          })
          .catch(error=>{
            console.log('****',error);
            reject(error)
          })
        });
      },
load_load_calculation:({commit},dt)=>{
    const ob={
      where:dt
    }
    const url1 = '/Loadcalcs?filter='+JSON.stringify(ob);
    console.log(url1);
    return new Promise((resolve,reject)=>{
      return apiObject.get(url1).then(response=>{
        commit('SET_LOADCALC',response.data)
        resolve(response.data[0])
    }).catch(error=>{
      console.log(error);
      reject(error)
    })
  });
}
}
export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
