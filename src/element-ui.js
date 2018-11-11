import Vue from 'vue'

import {
  Form,
  FormItem,
  Button,
  Input,
  Select,
  Option,
  Message,
  MessageBox,
  Notification,
  Icon,
  Container,
  Header,
  Main,
  Footer,
  Loading,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Dialog,
  Alert,
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Icon)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dialog)
Vue.use(Alert)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
