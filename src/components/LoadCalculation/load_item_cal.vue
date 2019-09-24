<template> 
  <div class="is-radiusless is-clearfix box">
    <table class="table is-bordered is-fullwidth">
      <thead>
        <th>Theory</th>
        <th>Practical</th>
        <th>Tutorial</th>
      </thead>
      <tr>
        <td>{{subjectInfo.subjectTheory}}</td>
          <td>{{subjectInfo.subjectPractical}}</td>
          <td>{{subjectInfo.subjectTutorial}}</td>
      </tr>
    </table>
    <b-field grouped>
      <b-field label="Number Of Classes" expanded>
        <b-input v-model="nclasses" type="number" min="1" max="2"></b-input>
      </b-field>
      <b-field label="Number Of Batches(Total)" expanded>
        <b-input v-model="nbatches" type="number" min="1" max="20"></b-input>
      </b-field>
    </b-field>
    <b-field label="Number Of Classes">
      <b-checkbox @input="changeCBox" v-model="otherDept">Load By Other Department</b-checkbox>
    </b-field>
      <b-field v-if="otherDept" label="Department">
      <b-select v-model="otherDeptName" expanded>
        <option v-if="dept.deptId!=deptId" v-for="(dept, index) in departmentList" :key="index" :value="dept.deptId">{{dept.deptName}}</option>
      </b-select>
    </b-field>
    <button @click="$emit('addToTable',
                      {
                      subject:subjectInfo,
                      nclasses:nclasses,
                      nbatches:nbatches,
                      otherDept:otherDept,
                      otherDeptName:otherDeptName
                      })" class="button is-primary is-pulled-right is-clearfix" style="width:25%">Add</button>
 </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'LoadItemCalc',
  props: ['subjectInfo','deptId'],
  data() {
      return {
        otherDept:false,
        nclasses:2,
        nbatches:4,
        otherDeptName:this.deptId
      }
  },
  computed:mapState([
    'departmentList',
  ]),
  methods:{
    changeCBox(){
        if(this.otherDept)
          this.otherDeptName=this.deptId
    }
  },
  created(){
    this.$store.dispatch('load_dept_list')
  }
}
</script>
<style lang="css" scoped>
</style>
