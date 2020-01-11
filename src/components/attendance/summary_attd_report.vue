<template>
  <div class="">

    <div class="">
      <div style="margin-bottom:.5em;margin-top:.5em;">

        <b-switch v-if="summaryAttndList && summaryAttndList.length>0" v-model="showAllColumn" size="is-small" @input="setStatusALL">Show ALL</b-switch>
        <b-switch v-model="record.statusOn" size="is-small" :key="indx" v-for="(record,indx) in summaryAttndList" >
          {{record.subjectId}}
        </b-switch>
      </div>


      <table v-if="summaryAttndList" class="table is-bordered is-fullwidth">
        <thead>
        <th class="has-background-grey has-text-white has-text-centered">Sr.</th>
        <th class="has-background-grey has-text-white has-text-centered">Enrollment</th>
        <th class="has-background-grey has-text-white has-text-centered">Student Name</th>
        <th v-if="record.statusOn" :key="indx" v-for="(record,indx) in summaryAttndList" class="has-text-centered has-background-grey has-text-white">
          {{record.subjectId}}
          <input min="0" max="100" type="number" class="input is-small" placeholder="<=" v-model="record.threshold"/>
        </th>
      </thead>
        <tr :key="name" v-for="(stuRecord,name,indx,ii) in summaryAttndList['0'].list">
          <td class="has-text-centered" width="50">{{indx+1}}</td>
          <td class="has-text-centered" width="140">{{name}}</td>
          <td>{{studentNameList[indx]}}</td>
          <td v-if="record.statusOn" width="110" v-for="(record,indx) in summaryAttndList"  class="has-text-centered">
            <p :class="calculatedPerc(record.list[name])<=record.threshold?'has-background-danger has-text-white':'' ">
              {{(typeof calculatedPerc(record.list[name])=='number')?calculatedPerc(record.list[name]).toFixed(1):calculatedPerc(record.list[name])}}
            </p>
          </td>
        </tr>
      </table>
      <p class="is-size-2 has-text-danger has-text-centered" v-else>Record Not Found</p>
    </div>
  </div>
</template>
<script>
import facultyMxn from '@/mixin/faculty'
import AttendanceDetail from '@/components/attendance/attendance_detail'
import {mapState} from 'vuex'
export default {
  name:"AttendanceReport",
  props: ['ayId',
  'threshold',
  'classId'],
  components: {
    AttendanceDetail
  },
  data(){
    return {
      showAllColumn:false
    }
  },
  mixins: [facultyMxn],
  watch:{
    ayId(value){
      this.loadSubjectList()
    },
    classId(value){
      this.loadSubjectList()
    }
},
  computed:{
   //....
    ...mapState({//....
      studentNameList:state=>state.attendanceStore.studentNameList
    }),
    summaryAttndList(){
      let result=this.$store.getters['attendanceStore/summaryAttndList']
      let total=[]
      if(result && result["0"]){
      let enrollmentList={enrollment:[]}
        Object.keys(result["0"].list).forEach(tt=>{
          enrollmentList.enrollment.push({stuEnroll:tt})
        })
        this.$store.dispatch('attendanceStore/getStuNameByEnrollment',enrollmentList)
        return result
      }
    },
    calculatedPerc(){
      return count=>count?(count.presentCount/(count.presentCount+count.absentCount))*100.0:"-"
    }
  },
  methods: {
    setStatusALL(vv)
    {
      this.summaryAttndList.map(rr=>{
        this.$set(rr,'statusOn',vv)
      })
    },
    getSummaryReport(){
      const ob={ayId:this.ayId,loadType:"Theory",classId:this.classId}
      this.showAllColumn=false
      this.$store.dispatch('attendanceStore/getSummaryAttandanceReport',ob)
    },
    loadSubjectList(){
      this.getSummaryReport()
    }
},
mounted() {
    this.loadSubjectList()
  }
}
</script>
<style lang="css" scoped>
.tt:hover{
    opacity:0.8;
    border:1px solid grey;
}
/* .test{
  padding:.2em;
  transform: rotate(-180.0deg);
}
table{
  overflow-x: auto;
}
thead th,
tr td{
  position: sticky;
}

thead th:last-child{
  background-color: rgb(220,241,255);
  border:1px solid grey;
}
table tr td:last-child{
  background-color: white;
  border:1px solid grey;
}
table thead th:last-child,
table tr td:last-child{
    top:auto;
    right:0;
}
table thead th:first-child{
  background-color: rgba(220,241,255);
  border:1px solid grey;
}
table tr td:first-child{
  background-color: white;
  border: 1px solid grey;
}
table thead th:first-child,
table tr td:first-child{
  left:0;
  z-index: 1;
} */
</style>
