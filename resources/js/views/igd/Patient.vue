<template>
  <div>
    <!-- <b-tabs
    active-nav-item-class="font-weight-bold text-uppercase text-danger"
    active-tab-class="font-weight-bold text-success"
    content-class="mt-3"
  ><b-tab title="Flow Sheet" active>
      <flowsheet :data_igd="data_igd"/>
    </b-tab>
    
    <b-tab title="Nurse Assesment">
      <assesment1 :data_igd="data_igd" />
                <img v-if="data_igd" :src="'data:image/png;base64,'+data_igd.nrAssIGD.Gambar"/>
              
              </b-tab>
    
    </b-tabs> -->
  
    <!-- <tab-nav :tabs="true" id="myTab-1">
              <tab-nav-items :active="true" id="Assesment-tab" ariaControls="flowsheet" role="tab" :ariaSelected="true"  >   </tab-nav-items>
              <tab-nav-items :active="false" id="Assesment-tab" ariaControls="Assesment" role="tab" :ariaSelected="false" title="Nurs Assesment" />
            </tab-nav>
            <tab-content id="myTabContent">
              <tab-content-item :active="true" id="flowsheet" aria-labelled-by="flowsheet">
                      <flowsheet :data_igd="data_igd"/>
              </tab-content-item>
              <tab-content-item :active="false" id="Assesment" aria-labelled-by="Assesment">
                <assesment1 :data_igd="data_igd" />
              </tab-content-item>
            </tab-content> -->

<nav v-if="data_igd">
  <div class="nav nav-tabs" id="nav-tab" role="tablist" >
    <a v-for="(tab,ind) in tabs" :key="ind" :class="tab.active?'nav-item nav-link active':'nav-item nav-link'" :aria-selected="!tab.active?'false':'true'" @click="disable_activetab(ind)" > <i :class="tab.icon"></i>{{tab.nama}}</a>
    </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div v-if="tabs[0].active" :id="'nav-'+tabs[0].nama" role="tabpanel" >
                      <flowsheet v-if="data_igd" :data_igd="data_igd"/>
                    
  </div>
  <div  v-if="tabs[1].active" :id="'nav-'+tabs[1].nama" role="tabpanel" >
                                      <assesment1 v-if="data_igd" :data_igd="data_igd" />

                    
  </div>
  <!-- <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-nurs_assesment-tab">
    <assesment1 :data_igd="data_igd" />
  </div> -->
  <!-- <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div> -->
</div>
  
  </div>
</template>
<script>
import { sofbox } from "../../config/pluginInit";
import store from "../../store";
import { mapGetters } from "vuex";
import flowsheet from "../igd/tabs/flow_sheet";
import assesment1 from "../igd/tabs/nursing_assesmen/assesment1";
import tabContentItem from "../../components/sofbox/tab/tab-content-item.vue";
import tabContent from "../../components/sofbox/tab/tab-content.vue";
import tabNav from "../../components/sofbox/tab/tab-nav.vue";
import tabNavItems from "../../components/sofbox/tab/tab-nav-items.vue";

export default {
  name: "patient",
  components: {
    flowsheet,
    assesment1,
    tabContentItem,
    tabContent,
    tabNav,
    tabNavItems,
  },
  mounted() {
        // sofbox.index();

    let NoEpisode = this.$route.params.episode;
    let response = store.dispatch("igd/data_pasien", {
      NoEpisode: NoEpisode,
     
    });

    // this.get_dashboard(NoEpisode);
  },
  computed: {
    ...mapGetters({
      data_igd1: "igd/data_igd",
    }),
    data_igd() {
      let data_igd = this.data_igd1;
      // console.log(response);
      if (data_igd) {
        //   setTimeout(() => {
        sofbox.index();
        // },10000);
      }

      return data_igd;
    },
  },
  data() {
    return {
      tabs:[
        {
          "nama":'Flow Sheet',
          "icon" :'fa fa-chart-line',
          "active":true
          
        },
        {
          "nama":'Nurs Assesment',
          "icon" :'fa fa-user-nurse',
          "active":false
          
        }
      ],
     
      // data_igd: {},
    };
  },
  methods: {
    disable_activetab(id){
      console.log(id);
      this.tabs.forEach((element,ind) => {
        if(ind==id){
          element.active=true;
        }
        else{
          element.active=false;
        }
      });
    }
    //   async get_dashboard(NoEpisode){
    //  let response= await store.dispatch('igd/data_igd',{"NoEpisode":NoEpisode});
    //  if(response.code=="0"){
    //    this.$$router.go('/igd');
    //  }
    // }
  },
};
</script>
