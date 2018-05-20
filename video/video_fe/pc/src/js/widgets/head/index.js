/* import 此 js 文件并在 ejs 模板中 incluede head.ejs 模版，不用引用 css 文件 */
// import 'css/widgets/head.scss';
import GMP from 'GMP';
// 登录相关
import './login.js';

// 看过
import './record.js';
import {page} from 'util/phpCommon';

new GMP({
   el: '[data-id=search-container]',
   events: {
      'submit [data-id=search-form]': 'searchHandler',
      'click [data-id=search-button]': 'searchHandler'
   },
   searchHandler() {
      window.location.href = `/search/index.html?keyword=${this.$input.val().trim()}&user_id=${page.userId}`;
   },
   init() {
      this.$input = this.$el.find('[data-id=search-input]');
      if (!(page['nodata'] === 0)) {
          if (page['keyword']) {
              this.$input.val(page['keyword']);
          }
      }
   }
});
