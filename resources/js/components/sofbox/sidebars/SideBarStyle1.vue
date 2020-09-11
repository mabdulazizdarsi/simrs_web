<template>
  <!--<div class="iq-sidebar">
    <nav class="iq-sidebar-menu">
      <List :items="items" />
    </nav>
  </div>-->
  <!-- Sidebar  -->
  <div class="iq-sidebar">

    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link :to="homeURL">
        <img :src="logo" class="img-fluid" alt="logo">
        <span>SIMRS</span>
      </router-link>
      <div class="iq-menu-bt align-self-center">
        <div class="wrapper-menu">
          <div class="line-menu half start"></div>
          <div class="line-menu"></div>
          <div class="line-menu half end"></div>
        </div>
      </div>
    </div>
    
    
      <div id="sidebar-scrollbar" style="overflow-y:auto;padding-bottom:20px">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <List :items="items" :open="true" :horizontal="horizontal"/>
      
        
        <iq-card v-if="is_igd && user.GroupUser=='igd'" class="iq-profile-card text-center">
          <template v-slot:body>
            <div class="iq-team text-center p-0">
              

              <img
                :src="'/assets/images/user/'+(is_igd.Gander.toUpperCase()=='L'?'01':'02')+'.jpg'"
                class="img-fluid mb-3 avatar-60 rounded-circle"
                alt
              />
              <h4 class="mb-0">{{is_igd.PatientName}}</h4>
              <h4 class="mb-0"> <strong>{{is_igd.NoMR}}</strong> </h4>
              <!-- <strong>{{is_igd.NoEpisode}}</strong> 
               <strong>{{is_igd.NoRegistrasi}}</strong>  -->
             <p class="mt-1">{{is_igd.Address}}</p>
              <hr />
              <ul class="list-inline mb-0 d-flex justify-content-between">
                <li class="list-inline-item">
                  <i class="fa fa-tint" style="color:#D6274F"></i> 
                  AB++
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-dumbbell" style="color:#33B580 "></i> 
                  - Cm
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-weight" style="color:#E52976 "></i> 
                  - Kg
                </li>
              </ul>
              <ul class="list-inline mb-0 d-flex justify-content-between">
                <!-- <li class="list-inline-item">
                  <i class="fa fa-burn" style="color:red"></i> 
                  
                </li> -->
                <li class="list-inline-item">
                  <i class="fa fa-user-md" style="color:#2791D6"></i> 
                  {{is_igd.NamaDokter}}
                </li>
              </ul>
               <ul class="list-inline mb-0 d-flex justify-content-between">
                <li class="list-inline-item">
                  <i class="fa fa-user" style="color:#8229E5"></i> 
                  
                  {{is_igd.TipePasien}}
                </li>
              </ul>
            </div>
          </template>
        </iq-card>
        
        <iq-card v-if="is_igd && user.GroupUser=='igd' && alergi" class="wow fadeInUp" data-wow-delay="0.6s" >
          <template v-slot:headerTitle>
            <h4 class="card-title">Riwayat Alergi</h4>
          </template>
          <template v-slot:headerAction>
            <a href="#" class>See all</a>
          </template>
          <template v-slot:body v-if="alergi_items.length>0">
            
           <Timeline :items="alergi_items"/>
            
          </template>
        </iq-card>
        </nav>
       </div>
     
    
    <!-- <div id="sidebar-scrollbar" v-if="!is_igd&&user.GroupUser!='igd'">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <List :items="items" :open="true" :horizontal="horizontal"/>
      </nav>
      <div class="p-3"></div>
    </div> -->
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import List from '../menus/ListStyle1'
import store from '../../../store'
import { mapGetters } from 'vuex'
import Timeline from '../timeline/TimeLine'

export default {
  name: 'SideBarStyle1',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'home' }) },
    items: { type: Array },
    logo: { type: String, default: require('../../../assets/images/logo.png') },
    horizontal: { type: Boolean }
  },
  components: {
    List,
    Timeline
  },
  computed: {
    ...mapGetters({
      is_igd: 'igd/pasien',
      user:'auth/user',
      alergi:'igd/pasien_alergi'
     
    }),
    alergi_items(){
      let items=[];
      if(this.alergi){
        this.alergi.forEach((element,ind) => {
          let item={"title":'',"right":'',"description":'',"child":{
            items:[]
          }};
        item.title='Alergi - '+element.Kategori;
        item.right =` </br> <strong> ${element.Alergen} </strong> </br> ${element.Keterangan} `;
        item.description=`Reaksi - <a>${element.KeluhanUtama} - ${element.ReaksiAlergi}</a>`;
          items.push(item);
        });

      }
      return items;
    }
  },
  data () {
    return {
    }
  }
}
</script>
