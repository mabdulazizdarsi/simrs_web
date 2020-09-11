<template>
  <div>
    
    <Loader />
    <vue-scroll-progress-bar
      @complete="handleComplete"
      height="0.2rem"
      backgroundColor="linear-gradient(to right, #067bfe, #0885ff)"
      style="z-index: 10000"
    />
    <div class="wrapper">
      <!-- Sidebar  -->
      <SideBarStyle1 :items="sidebar" :logo="logo" />
      <!-- TOP Nav Bar -->
      <NavBarStyle1 title="Dashboard" :homeURL="{ name: 'home' }" :logo="logo" >
        
        <template slot="responsiveRight" >
          <div v-if="loader" class="text-center">
  <b-spinner variant="primary" label="Text Centered"></b-spinner>
</div>
          <ul class="navbar-nav ml-auto navbar-list">
           
            <li class="nav-item">
              <a href="#" class="search-toggle iq-waves-effect">
                <i class="ri-notification-2-line"></i>
              </a>
            </li>
          </ul>
        </template>
        <template slot="right">
          <ul class="navbar-list">
            <li>
              <a href="#" class="search-toggle iq-waves-effect text-white">
                <img :src="userProfile" class="img-fluid rounded" alt="user" />
              </a>
              <div class="iq-sub-dropdown iq-user-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white line-height">Hello Nik jone</h5>
                      <span class="text-white font-size-12">Available</span>
                    </div>
                    <a href="#" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="ri-file-user-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0">My Profile</h6>
                          <p class="mb-0 font-size-12">View personal profile details.</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" class="iq-sub-card iq-bg-primary-success-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-success">
                          <i class="ri-profile-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0">Edit Profile</h6>
                          <p class="mb-0 font-size-12">Modify your personal details.</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" class="iq-sub-card iq-bg-primary-danger-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-danger">
                          <i class="ri-account-box-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0">Account settings</h6>
                          <p class="mb-0 font-size-12">Manage your account parameters.</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" class="iq-sub-card iq-bg-primary-secondary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-secondary">
                          <i class="ri-lock-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0">Privacy Settings</h6>
                          <p class="mb-0 font-size-12">Control your privacy parameters.</p>
                        </div>
                      </div>
                    </a>
                    <div class="d-inline-block w-100 text-center p-3">
                      <a class="iq-bg-danger iq-sign-btn" href="#" role="button">
                        Sign out
                        <i class="ri-login-box-line ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </NavBarStyle1>
      <!-- TOP Nav Bar END -->
      <div id="content-page" class="content-page">
        
        <transition name="router-anim">
          
          <router-view />
        </transition>
      </div>
    </div>
    <!-- <FooterStyle1>
      <template v-slot:left>
        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        <li class="list-inline-item"><a href="#">Terms of Use</a></li>
      </template>
      <template v-slot:right>
        Copyright 2020 <a href="#">Sofbox</a> All Rights Reserved.
      </template>
    </FooterStyle1>-->
  </div>
</template>
<script>
import Loader from "../components/sofbox/loader/Loader";
import SideBarStyle1 from "../components/sofbox/sidebars/SideBarStyle1";
import NavBarStyle1 from "../components/sofbox/navbars/NavBarStyle1";
import SideBarItems from "../FackApi/json/SideBar";
import profile from "../assets/images/user/1.jpeg";
import logo from "../assets/images/logo.png";
import { sofbox } from "../config/pluginInit";
import { mapGetters } from "vuex";

export default {
  name: "Layout1",
  components: {
    Loader,
    SideBarStyle1,
    NavBarStyle1,
  },
  mounted() {
    sofbox.mainIndex();
  },
  computed: {
    ...mapGetters({
      showNavTicket: "TicketBooking/navTicket",
      numberOfTicket: "TicketBooking/numberOfTicket",
      is_shown_igdchild: "igd/pasien_exist",
      loader:"loader"
    }),
  },
  props:{
    message:{type:String}
  },
  watch: {},
  // sidebarTicket
  data() {
    return {
      sidebar: [
        // {
        //   title: "Main",
        //   is_heading: true,
        //   is_active: false,
        //   class_name: "",
        //   is_icon_class: true,
        //   icon: "",
        // },
        {
          title: "I G D",
          name:'igd',
          is_heading: false,
          is_active: false,
          link: "",
          class_name: "",
          is_icon_class: true,
          icon: "fa fa-plus-circle",
          
          children: [
            {
              title:'List Pasien',
              name:'igd.home',
              is_active:false,
              link:{
                name:'igd.home',
              },
              class_name:'',
              is_icon_class:true,
              icon:'fa fa-home'
            },
            {
              title:'Floor Stok',
              name:'igd.floor_stok',
              is_active:false,
              link:{
                name:'igd.floor_stok',
              },
              class_name:'',
              is_icon_class:true,
              icon:'fa fa-store'
            },
            {
              title:'Order CSSD',
              name:'igd.order_cssd',
              is_active:false,
              link:{
                name:'igd.order_cssd',
              },
              class_name:'',
              is_icon_class:true,
              icon:'fa fa-sort'
            },
            {
              title:'Antrian Poli',
              name:'igd.antrian_poli',
              is_active:false,
              link:{
                name:'igd.antrian_poli',
              },
              class_name:'',
              is_icon_class:true,
              icon:'fa fa-sort-numeric-up-alt'
            },
            {
              title:'Arsip Kunjungan',
              name:'igd.arsip_kunjungan',
              is_active:false,
              link:{
                name:'igd.arsip_kunjungan',
              },
              class_name:'',
              is_icon_class:true,
              icon:'fa fa-clipboard'
            },
            // {
            //   title:'List Pasien',
            //   name:'igd.home',
            //   is_active:false,
            //   link:{
            //     name:'igd.home',
            //   },
            //   class_name:'',
            //   is_icon_class:true,
            //   icon:'fa fa-home'
            // },
            // {
            //   title:'List Pasien',
            //   name:'igd.home',
            //   is_active:false,
            //   link:{
            //     name:'igd.home',
            //   },
            //   class_name:'',
            //   is_icon_class:true,
            //   icon:'fa fa-home'
            // },
            // {
            //   title: "Dashboard",
            //   name: "igd.dashboard",
            //   is_active: false,
            //   link: {
            //     name: "igd.dashboard",
            //   },
            //   class_name: "",
            //   is_icon_class: false,
            //   icon: "",
            // },
          ],
        },
      ],
      userProfile: profile,
      logo: logo,
    };
  },
  methods: {
    handleComplete() {},
    rightSideBar() {
      if (this.numberOfTicket > 0) {
        this.$store.dispatch("TicketBooking/displaySidebarTicket", true);
      }
    },
  },
};
</script>
<style>
@import url("../assets/css/custom.css");
</style>
