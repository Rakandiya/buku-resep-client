import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faRightFromBracket, faFilter, faMagnifyingGlass, faAngleLeft, faEllipsis, faTrash, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faClock, faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import VuePaginate from "vue-paginate";

library.add(faPlus, faRightFromBracket, faFilter, faMagnifyingGlass, faClock, fasStar, faAngleLeft, faEllipsis, faTrash, farStar)


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);
app.use(store);
app.use(VueSweetalert2);
// app.use(VuePaginate);

app.mount('#app')
