<?php

/**
 *
 * 基于Laravel的validate类
 *
 * @author imarting<guoquan@gomeplus.com>
 * @date   2016-05-19
 */
namespace Ajax\Lib;

use Overtrue\Validation\Translator;
use Overtrue\Validation\Factory as ValidatorFactory;

class Validate
{
    private $validator = null;

    /**
     * Validate constructor.
     *
     * @param array $input 验证数组
     * @param array $rules 验证规则[部分实现] https://laravel.com/docs/5.2/validation#available-validation-rules
     */
    public function __construct(array $input, array $rules)
    {
        $factory = new ValidatorFactory(new Translator);
        $this->validator = $factory->make($input, $rules);
    }

    /**
     * 有效判断
     *
     * @return bool [验证通过:true]
     */
    public function isValid()
    {
        return $this->validator->passes();
    }

    /**
     * 单条消息
     *
     * @return string
     */
    public function getMsg()
    {
        return isset($this->getAllMsg()[0]) ? $this->getAllMsg()[0] : '';
    }

    /**
     * 多条消息
     *
     * @return array
     */
    public function getAllMsg()
    {
        return $this->validator->messages();
    }
}
