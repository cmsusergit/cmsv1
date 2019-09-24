<template>
    <div style="height:100%" class="dashboard is-radiusless box boxbg">

        <div class="level">
            <h1 class="level-left is-size-4 title">LoadCalculation Report</h1>
        </div>
        <div class="box is-radiusless" style="width:100%">
          <b-field grouped>
            <b-field label="Academic Year" expanded>
                <b-select :disabled="!isAuthorizedRoleList(['CMSADMIN','HOD'])" v-model="loadCalcOb.ayId" expanded>
                    <option v-for="ay in aYearList" :value="ay.ayId">{{ay.ayBatchYear}}</option>
                </b-select>
            </b-field>
              <b-field label="Department" expanded>
                  <b-select :disabled="!isAuthorizedRoleList(['CMSADMIN','HOD'])" v-model='loadCalcOb.deptId' @input="optionChanged" expanded>
                    <option v-for="dp in departmentList" :value="dp.deptId">{{dp.deptName}}</option>
                  </b-select>
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field label="Course" expanded>
                <b-select @input="optionChanged" v-model="loadCalcOb.courseId" expanded>
              <option v-for="course in courseList" :value="course.courseId">{{course.courseAlias}}</option>
              </b-select>
            </b-field>
            <b-field label="Sem" expanded>
            <b-Select  @input="optionChanged" v-model="loadCalcOb.semId" expanded>
                <option v-for="cl in 10">{{cl}}</option>
            </b-select>
            </b-field>
          </b-field>
          <div v-if="loadCalculation">
            <div>
              <b-field  grouped expanded>
              <b-field label="Select Subject" expanded>
                <select class="is-size-5" style="width:100%" v-model="currSubject" :size="5" expanded>
                  <option v-for="(subject, index) in subjectList" :key="index" :value="subject">
                    {{subject.subName}}
                  </option>
                </select>
              </b-field>
              <b-field label="Completed Subject" expanded>
              <select disabled class="is-size-5" style="width:100%" v-if="completedSubjectList && completedSubjectList.length>0"  :size="5" expanded>
                <option v-for="(subject, index) in completedSubjectList" :key="index" :value="subject">
                  {{subject.subName}}
                </option>
              </select>
            </b-field>
          </b-field>
          <LoadItemCalc v-if="currSubject" :subjectInfo='currSubject' :deptId="loadCalcOb.deptId" @addToTable='addToTableDt'></LoadItemCalc>
          <div class="is-clearfix">
          </div>
          <!-- <b-tabs v-model="activeTabIndx" type="is-toggle" expanded>
           <b-tab-item v-for="(subject, index) in subjectList" :key="index" :label="subject.subName">
             <LoadItemCalc :subjectInfo='subject' @addToTable='addToTableDt'></LoadItemCalc>
           </b-tab-item>
         </b-tabs> -->
        </div>
        <div>
          <table class="table is-fullwidth" bordered>
            <thead>
              <th>Sr.</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th style="width:50px">Lect(Hrs.)*Number Of Classes</th>
              <th style="width:50px">Lab(Hrs.)*Number Of Batches</th>
              <th style="width:50px">Tutorial(Hrs.)*Number Of Batches</th>
              <th style="width:50px">Total Subject Load</th>
              <th></th>
            </thead>
            <tr v-for="(dt, index) in deptLoadList" :key="index">
              <td>{{index+1}}</td>
              <td>{{dt.subject.subCode}}</td>
              <td>{{dt.subject.subName}}</td>
              <td>{{dt.subject.subjectTheory*dt.nclasses}}</td>
              <td>{{dt.subject.subjectPractical*dt.nbatches}}</td>
              <td>{{dt.subject.subjectTutorial*dt.nbatches}}</td>
              <td>{{dt.subject.subjectTheory*dt.nclasses+
                    dt.subject.subjectPractical*dt.nbatches+
                    dt.subject.subjectTutorial*dt.nbatches}}</td>
                    <td>
                      <button @click="removeLoad(index)" class="button is-danger">X</button>
                    </td>
            </tr>
            <tr>
              <th colspan="6">Total Load(Hrs.)</th>
              <th colspan="1">{{totalLoad}}</th>
            </tr>
          </table>
            <p class="has-text-grey is-size-4">Load By Other Dept.</p>
            <table class="table is-fullwidth" bordered>
              <thead>
                <th>Sr.</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th style="width:50px">Lect(Hrs.)*Number Of Classes</th>
                <th style="width:50px">Lab(Hrs.)*Number Of Batches</th>
                <th style="width:50px">Tutorial(Hrs.)*Number Of Batches</th>
                <th style="width:50px">Total Subject Load</th>
                <th style="width:100px">Other Department</th>
                <th></th>
              </thead>
            <tr v-for="(dt, index) in otherDeptLoadList" :key="index">
              <td>{{index+1}}</td>
              <td>{{dt.subject.subCode}}</td>
              <td>{{dt.subject.subName}}</td>
              <td>{{dt.subject.subjectTheory*dt.nclasses}}</td>
              <td>{{dt.subject.subjectPractical*dt.nbatches}}</td>
              <td>{{dt.subject.subjectTutorial*dt.nbatches}}</td>
              <td>{{dt.subject.subjectTheory*dt.nclasses+
                    dt.subject.subjectPractical*dt.nbatches+
                    dt.subject.subjectTutorial*dt.nbatches}}</td>
              <td>{{dt.otherDeptName}}</td>
              <td @click="removeFromOtherList(index)" class="button is-danger">X</td>
            </tr>
            <tr>
              <th colspan="7">Total Load By Other Dept.(Hrs.)</th>
              <th colspan="1">{{totalLoadByOtherDept}}</th>
            </tr>
          </table>
          </div>
          <div style="margin-top:1em" class="is-clearfix">
              <button class="button is-danger is-pulled-right">Delete Loadcalculation</button>
          </div>
        </div>
      <div v-else class="is-clearfix">
          <button @click="addLoadCalculation" class="button is-pulled-right is-info">Add LoadCalculation</button>
      </div>
    </div>
    </div>
</template>
<script>
import _ from 'lodash'
import userMxn from '@/mixin/user'
import {mapState} from 'vuex'
import LoadItemCalc from "@/components/LoadCalculation/load_item_cal"
export default{
    name: 'LoadCalculation',
    data() {
        return {
          loadCalcOb:{
            ayId:1,
            deptId:1,
            courseId:1,
            semId:1
          },
          activeTabIndx:0,
          deptLoadList:[],
          otherDeptLoadList:[],
          currSubject:null,
          loadCalculation:null,
          completedSubjectList:[]
        };
    },
    components: {
      LoadItemCalc
    },
    mixins: [userMxn],
    computed:{
      ...mapState([//....
              'departmentList', 'classList', 'courseList'
      ]),
      aYearList() {
          return this.$store.state.acadyearStore.acadyearList
      },
      subjectList() {
          return this.$store.state.subjectStore.subjectList;
      },
      totalLoad(){
        let total=0;
        this.deptLoadList.map(dt=>{
          total+=dt.subject.subjectTheory*dt.nclasses+dt.subject.subjectPractical*dt.nbatches+dt.subject.subjectTutorial*dt.nbatches;
        })
        return total;
      },
      totalLoadByOtherDept(){
        let total=0;
        this.otherDeptLoadList.map(dt=>{
          total+=dt.subject.subjectTheory*dt.nclasses+dt.subject.subjectPractical*dt.nbatches+dt.subject.subjectTutorial*dt.nbatches;
        })
        return total;
      }
    },
    watch:{
      currAcademicyearId(){
        this.loadCalcOb.ayId=this.currAcademicyearId
      },
      loggedInUser(){
        this.loadCalcOb.deptId=this.loggedInUser.deptId
      }
    },
    methods: {
      addLoadCalculation(){
        this.loadCalcOb.lcId=0
        this.$store.dispatch('loadCalcStore/add_load_calculation',this.loadCalcOb)
          .then(rr=>{
            this.loadCalculation=rr
          })
          .catch(error=>{
            this.loadCalculation=null
          })
      },
      optionChanged(){
        this.$store.dispatch("subjectStore/load_subject_for_loadcalc", {
          sem:this.loadCalcOb.semId,
          course:this.loadCalcOb.courseId,
          dept:this.loadCalcOb.deptId
        });
        this.load_calculation()
      },
      removeFromOtherList(index){
        this.otherDeptLoadList.splice(index,1)
      },
      removeLoad(index){
        this.deptLoadList.splice(index,1)
      },
      addToTableDt(dt){
        const ob={
          subId:dt.subject.subId,
          subthHrs:dt.subject.subjectTheory,
          subprHrs:dt.subject.subjectPractical,
          subtutHrs:dt.subject.subjectTutorial,

          totClass:dt.nclasses,
          totBatches:dt.nbatches,
          assignDeptId:dt.otherDeptName,
          lcId:this.loadCalculation.lcId
        }
        this.$store.dispatch('loadCalcStore/add_load_calc_detail',ob)
          .then(rr=>{
            this.currSubject=null
            if(!dt.otherDept){
              this.deptLoadList.push(dt)
            }
            else {
                this.otherDeptLoadList.push(dt)
            }
            this.completedSubjectList.push(dt.subject)
            _.remove(this.subjectList,{subId:dt.subject.subId})
          })
          .catch(error=>{
            console.log('****',error);
          })
      },
      load_calculation(){
          this.$store.dispatch('loadCalcStore/load_load_calculation',this.loadCalcOb)
            .then(rr=>{
              this.loadCalculation=rr
              this.$store.dispatch('loadCalcStore/load_load_Calc_detail',rr.lcId)
                .then(response=>{
                  this.loadDeptLoadList(response)
                })
                .catch(error=>{
                  console.log('****',error);
                })
            })
            .catch(error=>{
              this.loadCalculation=null
            })
      },
      loadDeptLoadList(loadDetailList){
         this.deptLoadList=new Array()
         this.otherDeptLoadList=new Array()
         this.completedSubjectList=new Array()
         loadDetailList.map(ob=>{
            this.$store.dispatch('subjectStore/getSubjectById',ob.subId)
              .then(dt=>{
                    let otherDept=true
                    let otherDeptName=ob.assignDeptId
                    if(this.loadCalcOb.deptId==ob.assignDeptId){
                      otherDept=false
                      otherDeptName:ob.deptId
                    }
                    const temp={
                      subject: dt,
                      nclasses: ob.totClass,
                      nbatches: ob.totBatches,
                      otherDept: otherDept,
                      otherDeptName:otherDeptName
                    }
                    if(this.loadCalcOb.deptId!=ob.assignDeptId){
                        this.otherDeptLoadList.push(temp);
                    }
                    else {
                      this.deptLoadList.push(temp);
                    }
                    this.completedSubjectList.push(dt)
                    _.remove(this.subjectList,dt)
              })
              .catch(error=>{
                console.log('****',error);
              })
          })
      }
    },
    created(){
      this.$store.dispatch('acadyearStore/load_academicyear_list')
      this.$store.dispatch('load_dept_list')
      this.$store.dispatch('load_course_list')
    }
}
</script>
<style scoped>
    .boxbg{
        background-color: white;
        color:white;
    }
    .tablebox{
        width:80vw;
        border:2px solid lightgrey;
        /*        border:1px solid white;
                overflow-y: auto;
                overflow-x: auto;
                height:  120vh;*/
    }
</style>
