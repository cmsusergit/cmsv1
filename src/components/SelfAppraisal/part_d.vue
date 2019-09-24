  <template>
    <div style="width:100%;" class="is-radiusless box">

      <h1 class="subtitle has-text-weight-bold has-text-centered">
        <u>PART-D</u>
        <br>
        <b>OTHER ACTIVITIES PERFORMED</b>
      </h1>
        <div class="is-clearfix" style="margin-bottom:0.2em;">
          <p class="subtitle has-text-weight-bold is-pulled-right is-radiusless tag is-large is-info" style="margin-bottom:.5em;padding:1em;">Total Score: {{scoreTotal}}</p>
      </div>


      <div class="is-clearfix" style="margin-bottom:1em;border-bottom:1px solid grey;">
          <p class="subtitle has-text-weight-bold is-pulled-right is-radiusless tag is-large is-info" style="margin-bottom:.5em;padding:1em;">Selected Section Score: {{scoreSectionTotal}}</p>
      </div>
    <div class="has-text-weight-bold">
      <b-tabs v-if="apiFormType==0"  @change="tabChanged" type="is-boxed" size="is-small" expanded>
        <b-tab-item v-for="(temp,indx) in sectionHeaderListTF" :key="indx" :label="temp.sectionHeading">
          <SelfAppraisalPartDTable :apiFormType='apiFormType' :user='user' :sfAyid='1' :sfSectionId='temp.sectionId'/>
        </b-tab-item>
      </b-tabs>
      <b-tabs v-else-if="apiFormType==1" @change="tabChanged" type="is-boxed" size="is-small" expanded>
        <b-tab-item v-for="(temp,indx) in sectionHeaderListNTF" :key="indx" :label="temp.sectionHeading">
          <SelfAppraisalPartDTable :apiFormType='apiFormType' :user='user' :sfAyid='1' :sfSectionId='temp.sectionId'/>
        </b-tab-item>
      </b-tabs>
      <b-tabs v-else-if="apiFormType==2" @change="tabChanged" type="is-boxed" size="is-small" expanded>
        <b-tab-item v-for="(temp,indx) in sectionHeaderListMCA" :key="indx" :label="temp.sectionHeading">
          <SelfAppraisalPartDTable :apiFormType='apiFormType' :user='user' :sfAyid='1' :sfSectionId='temp.sectionId'/>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import SelfAppraisalPartDTable from '@/components/SelfAppraisal/part_d_table'
import {mapGetters} from 'vuex'
export default {
  name: 'SelfAppraisalPartD',
  props: ['user','apiFormType'],
  components: {
    SelfAppraisalPartDTable
  },
  data() {
    return {
      scoreTotal:0,
      sectionHeaderListTF:[{sectionId:1,sectionHeading:"D-1 CURRICULAR ACTIVITIES"},{sectionId:2,sectionHeading:"D-2 CO-CURRICULAR ACTIVITIES"},
                            {sectionId:3,sectionHeading:"D-3 EXTRA-CURRICULAR ACTIVITIES"},{sectionId:4,sectionHeading:"D-4 DEVELOPMENTAL ACTIVITIES"}],
      sectionHeaderListNTF:[{sectionId:1,sectionHeading:"D-1 CURRICULAR & CO-CURRICULAR ACTIVITIES"},{sectionId:2,sectionHeading:"D-2 EXTRA-CURRICULAR ACTIVITIES"},
                            {sectionId:3,sectionHeading:"D-3 DEVELOPMENTAL ACTIVITIES"}],
      sectionHeaderListMCA:[{sectionId:1,sectionHeading:"D-1 CURRICULAR ACTIVITIES"},{sectionId:2,sectionHeading:"D-2 CO-CURRICULAR ACTIVITIES"},
                                                  {sectionId:3,sectionHeading:"D-3 EXTRA-CURRICULAR ACTIVITIES"},{sectionId:4,sectionHeading:"D-4 PROFESSIONAL DEVELOPMENTAL ACTIVITIES"}],
      scoreSectionTotal:0
    }
  },
  computed: {
    ...mapGetters([
    ]), //....
  },
  watch:{
    user(){
       this.getTotalScoreForEmployee()
       this.getTotalScoreForEmployee(1)
     }
  },
  mounted()
  {
  },
  methods: {
      getTotalScoreForEmployee(indx){
        this.$store.dispatch('selfAppraisalStore/getApprovedMetaDt',{empCode:this.user.empCode,sectionId:indx})
          .then(rr=>{
            if(indx){
                this.scoreSectionTotal=rr
            }
            else {
                this.scoreTotal=rr
            }
          })
          .catch(error=>{
            console.log('****',error);
          })
      },
      tabChanged(indx){
        this.getTotalScoreForEmployee(indx+1)
      }
  }
}
</script>
<style>
</style>
