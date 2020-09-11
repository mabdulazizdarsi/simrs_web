<template>
  <div  >
    <b-container fluid>
      <b-row>
        <b-col md="12">
          <iq-card class="wow fadeInUp" >
            <template v-slot:headerTitle>
              <b-input
                type="text"
                v-model="rj_search"
                placeholder="Cari Pasien di List Pasien Aktif"
              ></b-input>
            </template>
            <template v-slot:body>
              <b-row>
                <b-col md="12" class="table-responsive">
                  <!-- <datatable
                    class="table table-striped table-bordered"
                    :columns="active_rj.columns"
                    :data="filter_active_rj.rows"
                    :per-page="25"
                  ></datatable>-->
                  <b-table v-if="active_rj.rows.length>0" striped hover
                    :items="filter_active_rj.rows"
                    :fields="active_rj.columns"
                  
                    responsive="sm"
                    @row-clicked="dashboard"
                  ></b-table>
                </b-col>
                <!-- <b-col md="12">
                <datatable-pager :value="1" type="abbreviated" :sides-count="40"></datatable-pager>
                </b-col>-->
              </b-row>
            </template>
          </iq-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- <button @click="dashboard('OP190920-130720-001')">try</button> -->
  </div>
</template>

<script>
// import uidatatable from "../Tables/DataTable";
import { sofbox } from "../../config/pluginInit";
import store from "../../store";
import axios from "axios";
export default {
  mounted() {
    
    this.$store.commit("igd/update_data_pasien",null);
    this.get_active_rj();
  },

  data() {
    return {
      rj_search: "",
      active_rj: {
        columns: [
          { label: "NoMR", key: "NoMR", sortable: true },
          {
            label: "Visit Date",
            key: "Visit Date",
            sortable: true,
          },
          {
            label: "PatientName",
            key: "PatientName",
            sortable: true,
          },
          {
            label: "LokasiPasien",
            key: "LokasiPasien",
            sortable: true,
          },
          {
            label: "NamaDokter",
            key: "NamaDokter",
            sortable: true,
          },
          {
            label: "Status Name",
            key: "Status Name",
            sortable: true,
          },
        ],
        rows: [],
      },
    };
  },
  computed: {
    filter_active_rj() {
      var result = {
        rows: [],
        columns: [],
      };
      if (this.active_rj.rows.length > 0) {
    

        let st = this.rj_search;
        // result.rows=[];
        this.active_rj.rows.forEach((element) => {
          // console.log(element.PatientName);
          //console.log(element);

          if (
            element.PatientName.toString()
              .toLowerCase()
              .indexOf(st.toLowerCase()) > -1
          ) {
            //console.log(element);
            if(element["Status Name"]=='New'){
              element._cellVariants={ "Status Name": 'warning' };
            }
            else if(element["Status Name"]=='Payment'){
              element._cellVariants={ "Status Name": 'info' };
            }
            else if(element["Status Name"]=='Close'){
              element._cellVariants={ "Status Name": 'danger' };
            }
            result.rows[result.rows.length] = element;
            //  {
            //   id: parseInt(element.ID),
            //   NoMR: element.NoMR,
            //   Visit_Date: element["Visit Date"],
            //   PatientName: element.PatientName,

            //   LokasiPasien: element.LokasiPasien,
            //   NoMR: element.NoMR,
            //   NamaDokter: element.NamaDokter,
            //   Status_Name: element["Status Name"],
            //   data: element,
            // };
          }
        });
      } else {
        result = this.active_rj;
      }

      return result;
    },
  },
  components: {
    // uidatatable,
  },
  methods: {
    get_active_rj() {
      axios
        .post('/api/post_api',{
      "method":'get_all_active_rj',
      "token":localStorage.getItem('token')})
        .then((response) => {
          this.active_rj.rows = response.data.list_pasien;
          sofbox.index();
        })
        .catch((e) => {
          
        });
    },
    async dashboard(row) {
      // alert(row.NoEpisode)
      this.$router.push({ name: "igd.dashboard",path:'igd/dashboard/'+row.NoEpisode,params:{"episode":row.NoEpisode}});
      // let response = await store.dispatch("igd/data_pasien", {
      //   NoEpisode: row.NoEpisode,
      // });

      // this.$router.go('/dashboard/'+NoEpisode);
    },
  },
};
</script>

<style>
</style>