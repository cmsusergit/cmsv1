<template>
    <div style="padding:.5em;">
        <aside class="menu">
          <router-link :to="{ path: '/'}">
            <p class="menu-label">
                Dashboard
              </p>
          </router-link>
            <ul class="menu-list">
              <!--
                <li v-if="isAuthorizedRoleList(['CMSADMIN','PRINCIPAL','DIRECTOR'])">
                  <a>Oraganization</a>

                </li> -->
                <li v-if="isAuthorizedRoleList(['CMSADMIN','PRINCIPAL','DIRECTOR','EMPLOYEE','STUDENT'])">
                  <router-link class="textcolor" :to="{ name: 'Circular'}">All Circulars</router-link>
                </li>
                <!--
                <li><a >MessageBox</a></li> -->
                <li v-if="isAuthorized('CMSADMIN')">
                  <router-link class="textcolor" to='/useraccount'>
                    User Account Management
                  </router-link>
                </li>
            </ul>
            <p v-if="isAuthorized('CMSADMIN')" class="menu-label">
                Academic
            </p>
            <ul v-if="isAuthorized('CMSADMIN')" class="menu-list">
              <li>
                <router-link class="textcolor" to='/academicyear' >
                    Acadamic Year
                </router-link>
                <router-link class="textcolor" to='/designation' >
                    Designation
                </router-link></li>
                <li>  <router-link class="textcolor" to='/department' >
                      Department
                  </router-link></li>
                <li><router-link class="textcolor" to='/course' >
                      Course
                  </router-link></li>
                <li>
                  <router-link class="textcolor" to='/subject' >
                    Subject
                </router-link><!-- StudentManagement Page-->
                </li>
                <li>
                  <router-link class="textcolor" :to="{ name: 'ClassName'}">
                    Class List
                  </router-link></li>
                <li>
                  <router-link class="textcolor" :to="{ name: 'BatchName'}">Batch List</router-link>
                </li>
                  <li><router-link class="textcolor" to="/location">Location Configuration</router-link></li>
            </ul>
            <template v-if="isAuthorizedRoleList(['CMSADMIN','HOD','STUDENT_COORD','DIRECTOR','PRINCIPAL','FACULTY'])">
            <p class="menu-label" >
                Student
            </p>
            <ul class="menu-list">
                <li>
                    <router-link class="textcolor" to='/studentmanagement' ><!-- StudentManagement Page-->
                        Student Management
                    </router-link><!-- StudentManagement Page-->
                <li>
                  <li>
                     <router-link class="textcolor" to='/studentallocation' ><!-- StudentManagement Page-->
                         Student Allocation
                     </router-link>
                   </li>
                  <router-link class="textcolor" :to="{ name: 'AttendanceDashboard' }">Student Attendance</router-link>
                    <li>
                    <router-link class="textcolor" :to="{ name: 'MainAttdReport'}">Attendance Report</router-link>
                  </li>
                </li>
            </ul>
          </template>
          <template v-if="isAuthorizedRoleList(['CMSADMIN','HOD','DIRECTOR','PRINCIPAL','EMPLOYEE'])">
            <p class="menu-label">
                Employee
            </p>
            <ul class="menu-list">
                <li><router-link class="textcolor" to='/employeemanagement' >Employee Profile</router-link></li>
            </ul>
          </template>

          <p v-if="!isAuthorizedRoleList(['STUDENT'])" class="menu-label">
              Load Adjustment
          </p>
            <ul v-if="isAuthorizedRoleList(['CMSADMIN','TT_COORD','HOD','DIRECTOR','PRINCIPAL','FACULTY'])" class="menu-list">
                <li>
                  <router-link class="textcolor" :to="{ name: 'ProxyDetail'}">
                      Proxy Assignment
                  </router-link>
                </li>
                <li>

                  <router-link class="textcolor" :to="{ name: 'ProxyReport'}">
                      Proxy Report
                  </router-link>
                </li>
                <li v-if="isAuthorizedRoleList(['CMSADMIN','HOD'])">
                  <router-link class="textcolor" :to="{ name: 'ProxyApprove' }">Approve Proxy</router-link>
                </li>
              </ul>
          <p v-if="!isAuthorizedRoleList(['STUDENT'])" class="menu-label">
              Time Table
          </p>
            <ul v-if="isAuthorizedRoleList(['CMSADMIN','TT_COORD','HOD','DIRECTOR','PRINCIPAL'])" class="menu-list">
                <li>
                  <li><router-link class="textcolor" to="/loadcal">Load Calculation</router-link></li>
                  <li><router-link class="textcolor" to="/loadcalreport">Load Calculation Report</router-link></li>
                <li>
                  <router-link class="textcolor" to='/timetable' >
                    TimeTable Management(Faculty wise)
                  </router-link>
                  </li>
                </ul>
                <ul v-if="isAuthorizedRoleList(['CMSADMIN','TT_COORD','HOD','DIRECTOR','PRINCIPAL','FACULTY'])" class="menu-list">
                      <li>
                        <router-link class="textcolor" :to="{ name: 'TimeTableReport'}">TimeTables</router-link>
                      </li>
                    </ul>
                <template v-if="isAuthorizedRoleList(['CMSADMIN','TT_COORD','HOD','DIRECTOR','PRINCIPAL','FACULTY'])">
                  <ul class="menu-list">
                    <li>
                    <router-link class="textcolor" to="/lessonplan">
                      Lesson Plan
                    </router-link>
                  </li></ul>
                      <!-- <li>
                        <router-link class="textcolor" :to="{ name: 'LessonplanReport'}">
                          View
                        </router-link>
                      </li> -->
            </ul>
          </template>
          <template v-if="isAuthorizedRoleList(['CMSADMIN','EMPLOYEE'])">
            <p class="menu-label">
              APPRAISAL
            </p>
            <ul class="menu-list">
                <li><a class="textcolor" :href="appraisalTF">Parameters and Policy (TF)</a></li>
                <li><a class="textcolor" :href="appraisalNTF">Parameters and Policy (NTF)</a></li>
                <li><router-link class="textcolor" to="/selfappraisaltf">Appraisal Entry Form</router-link></li>
                <li><router-link class="textcolor" to="/selfappraisalreport">Appraisal Report</router-link></li>
            </ul>
          </template>
          <template v-if="isAuthorizedRoleList(['CMSADMIN','STUDENT_COORD','HOD','DIRECTOR','PRINCIPAL'])">
            <p class="menu-label">
                Student Messaging
            </p>
             <ul class="menu-list">
                <li><router-link class="textcolor" to="/composemessage">Compose Message</router-link></li>
                <li>
                  <a class="textcolor">Messaging Report</a>
                </li>
            </ul>
          </template>
        </aside>
    </div>
</template>
<script>

import config from '@/../static/test1.json'
import {mapState} from 'vuex'
export default {
  name:"SideBar",
  data(){
    return {
      loggedInUser:''
    }
  },
  computed:{
    appraisalTF(){
      return config.db_configuration.baseURL+'/apicontainers/policy/download/AppraisalTF.pdf'
    },
    appraisalNTF(){
      return config.db_configuration.baseURL+'/apicontainers/policy/download/AppraisalNTF.pdf'
    }
  },
  components: {
  },
  methods: {
    openUserProfile(){
      if(this.loggedInUser.empId)
        this.$router.push({name: 'EmployeeDetail', params: {id: this.loggedInUser.empId}})
      else if(this.loggedInUser.stuId)
        this.$router.push({name: 'StudentDetail', params: {id: this.loggedInUser.stuId}})
    },
    getUser(){
      const id=this.$store.getters['loginStore/getLoggedInUserId']
      this.$store.dispatch('userAccountStore/getUserAccountById',id)
      .then(rr=>{
        const user=rr
        if(user.userType==0)
          return;
        else if (user.userType==2) {
          this.$store.dispatch('studentStore/get_student_by_code',user.username)
          .then(rr=>{
            this.loggedInUser=rr
          })
          .catch(error=>{
            console.log('****',error);
          })
        }
        else {
          this.$store.dispatch('employeeStore/get_employee_by_code',user.username)
            .then(rr=>{
              this.loggedInUser=rr
              console.log('++++',this.loggedInUser);
            })
            .catch(error=>{
              console.log('****',error);
            })
        }
      })
      .catch(error=>{
        console.log('****',error);
      })
    },
    isAuthorizedRoleList(roleNameList){
      return this.$store.getters['loginStore/isAuthorizedRoleList'](roleNameList)
    },
    isAuthorized(roleName){
      return this.$store.getters['loginStore/isAuthorizedRole'](roleName)
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>
<style scoped>
.textcolor:hover{
  color:rgb(0,0,20);
}

.textcolor{
  color:white;
}
    /* p{
        font-weight: bold;
        color:#224444;
    }
    .sidebarbox{
        background-color: floralwhite;
        padding:.4em;
        color:#224444;
        border-right:1px solid #224444;
    } */
</style>
