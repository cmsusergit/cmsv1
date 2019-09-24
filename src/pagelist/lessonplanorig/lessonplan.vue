<template>
  <div class="section is-radiusless box" style="width:100%">

    <h1 class="title is-size-4">Prepare Lessonplan</h1>
    <p hidden>{{loggedInUser}}</p>
    <div class="is-radiusless box">
        <b-field grouped>
            <b-field label="Academic Year" expanded>
                <b-select v-model="lpRecord.ayId" expanded>
                    <option v-for="ay in aYearList" :value="ay.ayId">{{ay.ayBatchYear}}</option>
                </b-select>
            </b-field>

            <b-field label="Faculty Department" expanded>
                <b-select :disabled="!isAuthorizedRoleList(['CMSADMIN'])" @input="facultyDeptChanged" v-model="facultyDeptId" expanded>
                    <option v-for="dd in departmentList" :value="dd.deptId">{{dd.deptName}}({{dd.deptAlias}})</option>
                </b-select>
            </b-field>
        </b-field>
        <b-field grouped>
          <b-field label="Faculty Name" expanded>
              <b-select :disabled="!isAuthorizedRoleList(['CMSADMIN'])" v-model="lpRecord.facultyId" expanded>
                  <option :value="faculty.empId" v-for="faculty in facultyList">
                    {{faculty.title}} {{faculty.firstName}} {{faculty.middleName}} {{faculty.lastName}}
                  </option>
              </b-select>
          </b-field>
        <b-field label="Course" >
          <b-select @input="optionChanged" v-model="lpRecord.courseId" expanded>
            <option v-for="course in courseList" :value="course.courseId">{{course.courseName}}({{course.courseAlias}})</option>
        </b-select>
        </b-field>
        <b-field label="Department" expanded>
            <b-select @input="optionChanged" v-model="lpRecord.deptId" expanded>
                <option v-for="dd in departmentList" :value="dd.deptId">{{dd.deptName}}({{dd.deptAlias}})</option>
            </b-select>
        </b-field>
        <b-field label="Class" >
            <b-select @input="optionChanged" v-model="lpRecord.classId" expanded>
                <option :key="indx" v-for="(cl, indx) in classList" :value="cl.classId">
                    {{cl.className}}
                </option>
            </b-select>
        </b-field>
      <b-field label="Semester">
      <b-Select @input="optionChanged" v-model="lpRecord.semId" expanded>
          <option v-for="cl in 10">{{cl}}</option>
      </b-select>
      </b-field>
      </b-field>
      <b-field label="Select Subject" >
        <b-select @input='optionChanged' v-model="lpRecord.subId" expanded>
          <option v-for="subject in subjectList" :value="subject.subId">{{subject.subName}}</option>
      </b-select>
    </b-field>
      <b-field label='Reference Books'>
          <b-input v-model="lpRecord.refBook" type='textarea'/>
      </b-field>
      <!--
      <b-field label='Course Objectives'>
          <b-input  type='textarea'/>
      </b-field> -->
      <div v-if="!lessonPlan" class="is-radiusless box is-clearfix">
        <button @click="addLessonPlan" class="is-pulled-right is-radiusless button is-info">Add LessonPlan</button>
      </div>
    </div>
    <div v-if="lessonPlan">
      <div v-for="(lpUnit, index) in lpUnitList" :key="index" class="">
            <button v-if="index!=lpUnitList.length-1" @click='removeUnit(lpUnit,index)' style="margin:.5em" class="button is-radiusless is-pulled-right is-danger">Remove</button>
            <LPUnit @addUnit="addUnit" :lpUnit='lpUnit'/>
    </div>
    <button v-if="lpUnitList && lpUnitList.length>0" style="margin-top:.5em" @click='addUnit' class="button is-radiusless is-pulled-right is-primary">Add Unit</button>
  </div>
  </div>
</template>
<script>
import LPUnit from '@/components/lessonplan/lpunit'
import userMxn from '@/mixin/user'
import {mapState} from 'vuex'
import config from "@/../static/test1.json";
export default {
  name:"LessonPlan",
  components: {
    LPUnit
  },mixins: [userMxn],
  data(){
    return {
      facultyDeptId:'',
      deptId:'',
      lpRecord:{lpId:0,facultyId:0,deptId:0,courseId:1,subId:0},
      lessonPlan:'',
      lpUnitList:null
    }
  },
  computed: {
      ...mapState([//....
        'courseList',
        'classList',
        'departmentList']),
        subjectList() {
            return this.$store.state.subjectStore.subjectList;
        },
        aYearList() {
            return this.$store.state.acadyearStore.acadyearList
        },
        facultyList(){
          return this.$store.state.employeeStore.facultyList
        }
  },
  watch: {
    currAcademicyearId(){
      this.lpRecord.ayId=this.currAcademicyearId
    },

    loggedInUser(){
      this.facultyDeptId=this.loggedInUser.deptId
      this.lpRecord.deptId=this.loggedInUser.deptId
      this.lpRecord.facultyId=this.loggedInUser.empId
    }
  },
  mounted() {
      this.$store.dispatch('load_dept_list');
      this.$store.dispatch('acadyearStore/load_academicyear_list')
      this.$store.dispatch('load_course_list')
      if(this.facultyDeptId){
          this.$store.dispatch('employeeStore/load_facultylist_by_dept',this.facultyDeptId)
      }
      if(this.lpRecord.deptId){
          this.$store.dispatch('load_class_list_by_dept', this.lpRecord.deptId);
          const ob={
            dept:this.lpRecord.deptId,
            course:this.lpRecord.courseId,
            sem:this.lpRecord.semId
          }
          this.$store.dispatch("subjectStore/load_subject_for_ttable",ob)
      }
  },
  methods: {
    loadLessonPlan(){
      if(!this.lpRecord.courseId || !this.lpRecord.subId ||!this.lpRecord.semId || !this.lpRecord.classId)
        return;
      const ob={
        facultyId: this.lpRecord.facultyId,
        deptId: this.lpRecord.deptId,
        courseId: this.lpRecord.courseId,
        subId: this.lpRecord.subId,
        ayId: this.lpRecord.ayId,
        semId: this.lpRecord.semId,
        classId: this.lpRecord.classId
      }
      this.$store.dispatch('lessonPlanStore/load_lessonplan',ob)
      .then(rr=>{
        this.lessonPlan=rr
        if(this.lessonPlan){
            this.lpUnitList=[{
              lpId:this.lessonPlan.lpId
            }]
            this.$store.dispatch('lessonPlanStore/load_lessonplan_unit',this.lessonPlan.lpId)
              .then(response=>{
                if(response && response.length!=0)
                {
                  this.lpUnitList=response
                  this.lpUnitList.push({lpId:this.lessonPlan.lpId})
                }
              })
              .catch(error=>{
                this.$toast.open({
                            duration: 5500,
                            message: error.response.data.error.message,
                            position: 'is-top',
                            type: 'is-danger'
                        })
              })
        }
      })
      .catch(error=>{
        this.lessonPlan=null
        this.$toast.open({
                    duration: 5500,
                    message: error.response.data.error.message,
                    position: 'is-top',
                    type: 'is-danger'
        })
      })
    },
    facultyDeptChanged(){
      this.$store.dispatch('employeeStore/load_facultylist_by_dept',this.facultyDeptId)
    },
    deptChanged(){
      this.$store.dispatch('employeeStore/load_facultylist_by_dept',this.lpRecord.deptId)
      this.$store.dispatch('load_class_list_by_dept', this.lpRecord.deptId)
    },
    optionChanged(){
      this.$store.dispatch('load_class_list_by_dept', this.lpRecord.deptId)
      const ob={
        dept:this.lpRecord.deptId,
        course:this.lpRecord.courseId,
        sem:this.lpRecord.semId
      }
      this.$store.dispatch("subjectStore/load_subject_for_ttable",ob)
      this.loadLessonPlan()
    },
    addLessonPlan() {
      this.lpRecord.lpId=0
      this.$store.dispatch('lessonPlanStore/add_lessonplan',this.lpRecord)
        .then(rr=>{
          this.$toast.open({
              duration: 5500,
              message: "LessonPlan Added",
              position: 'is-top',
              type: 'is-success'
          })
          this.loadLessonPlan()
        })
        .catch(error=>{
          this.$toast.open({
                      duration: 5500,
                      message: error.response.data.error.message,
                      position: 'is-top',
                      type: 'is-danger'
                  })
        })
    },
    addUnit(){
        let ob=this.lpUnitList[this.lpUnitList.length-1];
        ob.lpId=this.lessonPlan.lpId
        this.$store.dispatch('lessonPlanStore/add_lessonplan_unit',ob)
          .then(response=>{
              this.lpUnitList[this.lpUnitList.length-1]=response
              this.lpUnitList.push({lpId:this.lessonPlan.lpId})
          })
          .catch(error=>{
            this.$toast.open({
                        duration: 5500,
                        message: error.response.data.error.message,
                        position: 'is-top',
                        type: 'is-danger'
                      })
          })
    },

    removeUnit(lpUnit,indx){
      this.$store.dispatch('lessonPlanStore/remove_lessonplan_unit',lpUnit.unitId)
        .then(rr=>{
          this.lpUnitList.splice(indx,1)
        })
        .catch(error=>{
          this.$toast.open({
                    duration: 5500,
                    message: error.response.data.error.message,
                    position: 'is-top',
                    type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
