<template>
    <div class="" style="width:100%;height:100%;">

        <h1 class="title">CMSAdmin Dashboard</h1>
        <div class="tile">
              <router-link to='/studentmanagement' class="tile box is-radiusless boxv has-text-dark"><!-- StudentManagement Page-->
                <div>
                  <h1 class="title is-size-5">Student</h1>
                  <p class="is-size-5">{{studentCount}}</p>
                </div>
              </router-link><!-- StudentManagement Page-->
            <div style="margin:.1em;"></div>

            <router-link to='/employeemanagement' class="tile box is-radiusless boxv has-text-dark">
                <div>
                    <h1 class="title is-size-5">Employee</h1>
                    <p class="is-size-5">{{employeeCount}}</p>
                </div>
            </router-link>
            <div style="margin:.1em;"></div>
        </div>
        <div class="tile">
         <div class="tile is-child is-6 box is-radiusless">
                  <p  class="title is-size-5">Recent Circulars</p>
                  <CircularPanel :totalPage="4"/>
            </div>
            <div style="margin:.1em">
            </div>
              <div class="tile is-child box is-radiusless boxv">
                  <h1  class="title is-size-5">To Do</h1>
                  <TodoPanel/>
              </div>
          </div>
        <div style="margin:.2em;"></div>





        <!-- <div class="tile">
            <div class="tile is-child is-6 is-radiusless box">
              <p class="subtitle">Calendar</p>
              <b-message :type="currEvent.type" :title="currEvent.title" :active.sync="currEvent" aria-close-label="Close message">
                {{currEvent.description}}
              </b-message>
              <b-datepicker size='is-medium' @input="onChange" :events="eventList"
              indicators='bars' inline class="has-text-centered"/>
            </div>
          <div style="margin:.1em;"></div>
        </div> -->
      </div>
</template>
<script>
import TodoPanel from '@/components/todo/todo'
import CircularPanel from '@/components/dashboard/circularpanel'
export default {
        name: 'CMSAdminDashboard',
        components: {
          CircularPanel,
          TodoPanel
         },
        data() {
            return {
                studentCount:null,




                currEvent:false,
                eventList:[{
                  date:new Date(2019,5,10),title:'Test1',type:'is-info',description:'Hello There'
                }, {
                  date:new Date(2019,5,4),type:'is-danger',

                  title:'Holiday',description:'Lorem ipsum dolor sit amet.'
                }
              ],
                employeeCount:null
            }
        },
        methods: {
          onChange(dd){
            let temp=false
            this.eventList.map(ob=>{
              if(ob.date.getTime()==dd.getTime())
                temp=ob
            })
            this.currEvent=temp
          }
        },
        mounted(){
          const studentCountUrl="/StudentInfos/count";
          this.$root.apiObject.get(studentCountUrl).then(response => {
              this.studentCount = response.data.count;
          }).catch(error => {
              console.log('****', error);
          });
          const employeeCountUrl="/EmpProfiles/count";
          this.$root.apiObject.get(employeeCountUrl).then(response => {
              this.employeeCount = response.data.count;
          }).catch(error => {
              console.log('****', error);
          });
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .boxbg{
        background-color: lightgrey;
        color:white;
    }
    .boxv{
        background-color: white;
        color:#224444;
    }
</style>
