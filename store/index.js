import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		password:'d',
		//用户信息
		companyId:'',
		companyName:'',
		deptId:'',
		deptName:'',
		name:'',
		userId:''
    },
    mutations: {
        login(state, user) {
            state.userName = user.username || '111111';
			state.password = user.password || '123456';
            state.hasLogin = true;
			// uni.setStorageSync('USERS_KEY',userName)
			uni.setStorage({
				key:'USERS_KEY',
				data:user
			})
        },
		// websiteUrl(state, websiteUrl) {
		//     state.websiteUrl = websiteUrl || '111111';
		// 	// uni.setStorageSync('USERS_KEY',userName)
		// 	uni.setStorage({
		// 		key:'USERS_BASEURL',
		// 		data:websiteUrl
		// 	})
		// },
        logout(state) {
			console.log('退出')
            state.userName = "";
			state.password = "";
			state.baseUrl = "";
            state.hasLogin = false;
			
			// uni.removeStorageSync('USERS_KEY')
			state.companyId=''
			state.companyName=''
			state.deptId=''
			state.deptName=''
			state.name=''
			state.userId=''
			uni.removeStorage({
				key:'USERS_KEY'
			})
			uni.removeStorage({
				key:'USERS_INFO'
			})
        },
		userINFO(state,user){
			state.companyId=user.companyId
			state.companyName=user.companyName
			state.deptId=user.deptId
			state.deptName=user.deptName
			state.name=user.name
			state.userId=user.userId
			uni.setStorage({
				key:'USERS_INFO',
				data:user
			})
		}
    }
})

export default store
