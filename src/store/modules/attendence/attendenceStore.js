import apiObject from '@/dataserve/student_serve.js'
import _ from 'lodash'

const state = {
  studentNameList:null
};
const getters = {
};
const mutations = {
    SET_STUDENT_NAME_LIST:(state,dt)=>{
      state.studentNameList=dt
    }

};
const actions = {
classScheduleExist:({commit},ob)=>{
  ob.csDateConducted=new Date( ob.csDateConducted.getTime() + Math.abs(ob.csDateConducted.getTimezoneOffset()*60000) )
  const temp={where:ob}
    const url1='/DdClassSchedules?filter='+JSON.stringify(temp)
    return new Promise((resolve, reject)=>{
      apiObject.get(url1)
        .then(rr=>{
          if(rr.data && rr.data.length>0)
            resolve({'recordExist':true})
          else
            resolve({'recordExist':false})
        })
        .catch(error=>{
          console.log('****',error)
          reject(error)
        })
    });
},
getAttdnReport:({commit},id)=>{
      const url1 = '/TimetableRecordInfos/getAttendanceList/'+id;
      return new Promise((resolve,reject)=>{
        apiObject.get(url1)
          .then(rr=>{
            if(rr.data){
              resolve(rr.data.attndList)
            }
          })
            .catch(error=>{
              console.log('****',error);
              reject(error)
            })
      })
},
getStuNameByEnrollment({commit},enrollmentList){
  const url1="StudentInfos/getNameByEnrollment";
  apiObject.post(url1,enrollmentList)
    .then(rr=>{
      commit("SET_STUDENT_NAME_LIST",rr.data.studentNameList)
    })
    .catch(error=>{
      console.log('****',error);
    })
},
save_attendance:({commit},dt)=>{
      const url1 = '/DdClassSchedules/';
      return new Promise((resolve,reject)=>{
        apiObject.post(url1,dt.classSchedule)
      .then(rr=>{
        if(rr.data){
          const tempurl=url1+rr.data.csId+'/attndanceInfos/'
          console.log(dt.studentList);
          apiObject.post(tempurl,dt.studentList)
            .then(response=>{
              resolve(response.data)
            })
            .catch(error=>{
              apiObject.delete(url1+rr.data.csId)
              console.log('****',error);
              reject(error)
            })
        }
      })
      .catch(error=>{
        console.log('****',error);
        reject(error)
      });
    });
},
load_attendance:({commit},dt)=>{
      const url1 = '/DdClassSchedules/'
      const ob={
          where:{
          csDateConducted:dt.csDateConducted
        }}
      return new Promise((resolve,reject)=>{
            apiObject.get(url1)
            .then(rr=>{
                if(rr.data){
                    console.log('++++',JSON.stringify(rr.data))
//                  const tempurl=url1+rr.data.csId+'/attndanceInfos/'
//                  console.log(dt.studentList);
//                  apiObject.post(tempurl,dt.studentList)
//                    .then(response=>{
//                      resolve(response.data)
//                    })
//                    .catch(error=>{
//                      apiObject.delete(url1+rr.data.csId)
//                      console.log('****',error);
//                      reject(error)
//                    })
                }
      })
      .catch(error=>{
        console.log('****',error);
        reject(error)
      });

    });
},

getAttdByForClasswiseReport:({commit},input)=>{
      const url1 = 'TimeTableInfos/getAttdByForClasswiseReport'
      return new Promise((resolve,reject)=>{
        apiObject.post(url1,{loadDetail:input})
          .then(rr=>{
            if(rr.data){
              resolve(rr.data.attndList)
            }
          })
            .catch(error=>{
              console.log('****',error);
              reject(error)
            })
      })
},
getStudentAttdnReportBySubject:({commit},input)=>{







      const url1 = '/TimeTableInfos/getStudentAttdBySubjectId'
      return new Promise((resolve,reject)=>{
        apiObject.post(url1,{inputOb:input})
          .then(rr=>{
            if(rr.data){
              resolve(rr.data.attndList)
            }
          })
          .catch(error=>{
            console.log('****',error);
            reject(error)
          })
      })
}
}
export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
