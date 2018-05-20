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
    
	/**
     * 登录验证
     * @return	mixed	Json|Boolean
	 *
     */
	protected function recheckLogin()
	{
		$action = strtolower(MODULE_NAME).'-'.strtolower(CONTROLLER_NAME).'-'.strtolower(ACTION_NAME);

		if(isset(C('checkLoginList')[ $action ]))
		{
			if(!$this->userId)
			{
				$code = intval(\Think\ErrorCode::USER_NO_LOGIN);
				$message = '登录失效，请重新登录';
				$this->outJSON($code, $message);
				exit;
			}
		}
		
		return true;
	}
}
