<template>
    <div class="is-radiusless box" style="width:100%">

        <div class="">
            <b-field grouped>
                <b-field label="Academic Year" expanded>
                    <b-select v-model="dt.ayId" expanded>
                      <option v-for="ay in aYearList" :value="ay.ayId">{{ay.ayBatchYear}}</option>
                    </b-select>
                </b-field>
                <b-field label="Department" expanded>
                <b-select  @input="deptChanged" v-model="dt.fDeptId" expanded>

                      <option v-for="dd in departmentList" :value="dd.deptId">{{dd.deptName}}</option>
                    </b-select>
                </b-field>
                  <b-field  label="Class Name" expanded>
                    <b-select @input="classChanged"  v-model="dt.classId" expanded>
                      <option v-for="(cl, index) in classList" :key="index" :value="cl.classId">
                        {{cl.className}}
                      </option>
                    </b-select>
                </b-field>
        </b-field>        
        <!-- <b-field grouped>
          <div class="is-radiusless box has-text-centered" style="width:100%;">
            <b-radio @input="radioChanged" v-model="dt.loadType" name="LoadType" style="width:20%;" native-value="Theory">Theory</b-radio>
            <b-radio @input="radioChanged" v-model="dt.loadType" name="LoadType" style="width:20%;" native-value="Practical">Practical</b-radio>
            <b-radio @input="radioChanged" v-model="dt.loadType" name="LoadType" style="width:20%;" native-value="Tutorial">Tutorial</b-radio>
            <b-radio @input="radioChanged" v-model="dt.loadType" name="LoadType" style="width:20%;" native-value="Other">Other</b-radio>
          </div>
        </b-field>
        <b-field v-if="dt.loadType!='Theory' " grouped>
          <b-field label="Batch Name" expanded>
            <b-select v-model="dt.fBatchId" expanded>
                <option :key="indx" v-for="(batch, indx) in batchList" :value="batch.batchId">
                    {{ batch.batchName }}
                </option>
            </b-select>
          </b-field>
        </b-field> -->
        </div>
        <div v-if="dt && dt.classId && dt.ayId">
          <AttendanceReport :ayId="dt.ayId" :classId="dt.classId"/>
        </div>
    </div>
</template>
<script>
    import userMxn from '@/mixin/user'
    import config from "@/../static/test1.json";
    import { mapState} from 'vuex';
    import AttendanceReport from "@/components/attendance/summary_attd_report"
    export default {
        name: "SummaryAttndReport",
        data() {
            return {
                dt:{
                  ayId:this.currAcademicyearId?this.currAcademicyearId:'',
                  fDeptId:this.loggedInUser?this.loggedInUserdeptId:'',
                  loadType:'Theory',
                  fBatchId:-1
                }
            };
        },mixins: [userMxn],
        components: {
          AttendanceReport
        },
        computed: {
            ...mapState([//....
                    'departmentList',
                    'classList',
                    'courseList']
                    ),
            aYearList() {
              return this.$store.state.acadyearStore.acadyearList
            },
            subjectList() {
                return this.$store.state.subjectStore.subjectList;
            },
            batchList(){
              return this.$store.state.classStore.batchList
            },
            isAuthorized(){
              return this.isAuthorizedRoleList(['CMSADMIN','HOD'])
            }
        },
        watch: {
          currAcademicyearId(){
            this.dt.ayId=this.currAcademicyearId
          },
          loggedInUser(){
              this.dt.fDeptId=this.loggedInUser.deptId
              this.$store.dispatch('load_class_list_by_dept', this.dt.fDeptId)
          }
        },
        mounted() {
            this.$store.dispatch('acadyearStore/load_academicyear_list')
            this.$store.dispatch('load_course_list');
            this.$store.dispatch('load_dept_list');
            this.dt.ayId=this.currAcademicyearId
            this.dt.fDeptId=this.loggedInUser.deptId
            this.$store.dispatch('load_class_list_by_dept', this.dt.fDeptId);
        },
        methods: {
          radioChanged(value){
            if(value=='Theory')
              this.dt.fBatchId=-1
            else
              this.dt.fBatchId=''
          },
          deptChanged(){
            this.$store.dispatch('load_class_list_by_dept', this.dt.fDeptId)

            //
            // this.changeSubjectList()
          },
          classChanged(vv){
            //
            // this.$store.dispatch('classStore/load_batch_list_by_classid',vv)
          },
          changeSubjectList(){
            const ob={
              dept:this.dt.fDeptId,
              course:this.dt.fCourseId,
              sem:this.dt.ttSem
            }
            this.$store.dispatch("subjectStore/load_subject_for_ttable",ob)
          }
        }
};
</script>
<style>
</style>
