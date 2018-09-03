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
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
