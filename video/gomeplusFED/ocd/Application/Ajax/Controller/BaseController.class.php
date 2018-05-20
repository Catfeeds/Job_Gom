<?php

namespace Ajax\Controller;

use Home\Controller\BaseController as Controller;
use Ajax\Lib\Validate;

/**
 * Class BaseController
 *
 * @author  imarting<guoquan@gomeplus.com>
 * @package Ajax\Controller
 */
class BaseController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        import('vendor.autoload', APP_PATH . 'Ajax', '.php');//import autoload
        $current = CONTROLLER_NAME . '_' . ACTION_NAME;
/*         if (!$this->userId && in_array($current, C('AUTH_LIST'))) {// Ajax/Conf/config.php => AUTH_LIST [需要授权的控制器_动作]
            $this->ajaxError('user is not logged');
        } */
    }

    protected function ajaxSuccess($data, $type = '', $option = 0)
    {
        $this->ajaxReturn($data, $type, $option);
    }

    /**
     * @param   string $data BS接口json
     * @param   string $type [json|jsonp]
     *
     * @return  string
     */
    protected function ajaxRaw($data, $type = 'json')
    {
        header('Content-Type:application/json; charset=utf-8');
        if (strtolower($type) == 'jsonp') {
            $handler = isset($_GET[ C('VAR_JSONP_HANDLER') ]) ? $_GET[ C('VAR_JSONP_HANDLER') ] : C('DEFAULT_JSONP_HANDLER');
            $data    = $handler . '(' . $data . ');';
        }
        exit($data);
    }

    protected function ajaxError($msg, $type = '', $option = 0)
    {
        $this->ajaxReturn([
            'success' => false,
            'code'    => 1,
            'message' => $msg,
            'data'    => new \stdClass()
        ], $type, $option);
    }

    /**
     * 表单规则验证
     *
     * @param array $rules
     * @param array $params
     */
    protected function validate(array $rules, array $params = [])
    {
        $params    = !empty($params) ? $params : I('param.');
        $validator = new Validate($params, $rules);
        if (!$validator->isValid()) {
            $this->ajaxError($validator->getMsg());
        }
    }
    

}
