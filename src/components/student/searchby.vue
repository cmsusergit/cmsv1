<template>
  <div class="is-radiusless box">

    <b-field label="Search By: ">
        <b-field>
        <b-select @input="$emit('searchOptionChanged',searchByOption)" v-model="searchByOption">
          <option  v-for="(temp,indx) in searchByList" :key="indx">
            {{temp}}
          </option>
        </b-select>
        <b-input v-model="searchByText" @input="$emit('searchByText',searchByText)" expanded/>
      </b-field>

      </b-field>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name:"search",
  data(){
    return {
      searchByList:['Name','Enrollment','CollegeId','Email'],
      searchByText:'',
      searchByOption:'Enrollment'
    }
  },
  computed:{
  },
  created(){
  },
  methods:{
  }
}
</script>
<style>
</style>
