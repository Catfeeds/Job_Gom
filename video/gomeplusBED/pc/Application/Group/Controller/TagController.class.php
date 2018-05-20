<?php
namespace Group\Controller;
use Home\Controller\BaseController;
class TagController extends BaseController{
    public function topic(){
        $param = array();
        $param['tagId'] =  I('get.tagId','','trim');
        $word =  I('get.name','','trim');
        $param['pageSize'] = I('get.pageSize',2,'intval');
        $param['pageNum'] =  I('get.pageNum',1,'intval');
        if( !$param['tagId'] ){
            $this->_displayErrorPage('参数错误','参数错误');
            exit;
        }
        $tag = D("Ajax/Tag");
        $page_data = $tag->getData($tag->search_topic,$param);

        $seoMap = seoMap(
            '',
            array("{{1}}" => ( empty($word) ) ? ' ' : htmlentities(urldecode($word))." - " )
        );
        $crumbs = crumbsMap(
            array(
                "{{1}}" => APP_HTTP.C('MAIN_URL'),
                "{{2}}" => htmlentities(urldecode($word)),
                "{{3}}" => ( isset($page_data['data']['totalCount']) ) ? $page_data['data']['totalCount'] : 0
            )
        );
        //input框不要关键词
        $word = '';
        $this->assign("selectWords",array('name'=>'话题','keyword'=>$word,'selectkey'=>'topic') );
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('crumbs', $crumbs);
        $this->assign('word', htmlentities($word));
        $this->display("Tag/search_topics");
    }

}
?>
