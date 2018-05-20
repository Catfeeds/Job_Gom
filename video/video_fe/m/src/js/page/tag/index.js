import 'css/page/tag/index.scss';
import 'fastclick.js';
import backTop from 'plugin/backTop.js';
import like from 'components/action/like.js';//zan
import collect from 'components/action/collect.js';//shou
import './loadmore.js';
import historyBack from 'util/historyback';

import SearchPage from 'widgets/search/search';

$('[data-id="search"]').click(()=>{
	new SearchPage();
});

historyBack();

new like({
	delegate:"#listCon"
});
new collect({
	delegate:"#listCon"
});
new backTop();