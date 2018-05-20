<?php

namespace Ajax\Service;

use Home\Service\BaseService;

/**
 * Class UserService
 *
 * @author  imarting<guoquan@gomeplus.com>
 * @date    2016-05-26
 * @package Ajax\Service
 */
class UserService extends BaseService
{
    public $get_redpacket = 'cheap/get_redpacket.json';
    public $identifyNickname = 'user/check_nickname.json'; // 检验昵称
}