<template>
  <div class="is-radiusless box">
    <b-field grouped>
      <b-field label="Department" expanded>
        <b-select @input='deptChanged' v-model="dept" expanded>
          <option>All</option>
          <option v-for="dd in departmentList" :value="dd.deptId">{{dd.deptName}}</option>
        </b-select>
      </b-field>
      <b-field label="Designation" expanded>
        <b-select @input='courseChanged' v-model="course" expanded>
          <option>All</option>
          <option v-for="cc in courseList" :value="cc.courseId">{{cc.courseAlias}}</option>
        </b-select>
      </b-field>
      <b-field label="Class Name" expanded>
        <b-select @input="classChanged" v-model="className" expanded>
          <option>All</option>

          <option v-for="temp in classList" :value="temp.classId">{{temp.className}}</option>
        </b-select>
      </b-field>
      <b-field label="Current Sem" expanded>
          <b-select @input="currSemChanged" v-model="currSem" expanded>
            <option>All</option>
            <option v-for="indx in 10">{{indx}}</option>
          </b-select>
      </b-field>

    </b-field>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name:"listby",
  data(){
    return {
      currSem:"All",
      dept:"All",
      className:"All",
      course:"All",
    }
  },
  computed:{
    ...mapState([    //....
    'departmentList',
    'courseList',
    'classList'
  ])
  },
  created(){
    this.$store.dispatch('load_dept_list')
    this.$store.dispatch('load_class_list_by_dept', this.dept);
    this.$store.dispatch('load_course_list')
  },
  methods:{
    currSemChanged(value){
      this.$emit('currSemChanged',value)
    },
    classChanged(value){
      this.$emit('classChanged',value)
    },
    deptChanged(value){
      this.$emit('deptChanged',value)



      this.$store.dispatch('load_class_list_by_dept', this.dept);
    },
    courseChanged(value){
    this.$emit('courseChanged',value)
    }
  }
}
</script>
<style>
</style>
