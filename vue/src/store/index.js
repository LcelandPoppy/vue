import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex);




const store = new Vuex.Store({

	state:{
		title:"水果列表"
		
	},
	// ,
 //   actions:{
 //   	  gettitle(store,payload){
 //   	  	axios.get(payload).then(res=>{
	// 				console.log(res.data);
	// 				store.commit("titlechange",res.data.name);
	// 			})
 //   	  }
 //   },
	mutations:{
		titlechange:function(state,payload){
			console.log(payload);
			state.title= payload;
		}
	}

})


export default store;
