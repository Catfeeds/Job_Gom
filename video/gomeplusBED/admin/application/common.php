<?php
/*
 * 发送邮件
 * @param $toemail 收件人email
 * @param $subject 邮件主题
 * @param $message 正文
 * @return void
 * */
function send_mail($toemail, $subject, $message) {

    $config = array (
        'mailsend' => 2,
        'maildelimiter' => 1,
        'mailusername' => 1,
        'server' => 'smtp.163.com',
        'port' => 25,
        'mail_type' => 1,
        'auth' => 1,
        'from' => 'gomeplus_pc@163.com',
        'auth_username' => 'gomeplus_pc@163.com',
        'auth_password' => '1234qwer',
    );

    $charset   = 'utf-8';
    $mail      = $config;
    $from      = $config['from'];
    $mail_type = $config['mail_type'];

    //mail 发送模式
    if($mail_type==0) {
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset='.$charset.'' . "\r\n";
        $headers .= 'From: <'.$from.'>' . "\r\n";
        mail($toemail, $subject, $message, $headers);
        return true;
    }
    //邮件头的分隔符
    $maildelimiter = $mail['maildelimiter'] == 1 ? "\r\n" : ($mail['maildelimiter'] == 2 ? "\r" : "\n");
    //收件人地址中包含用户名
    $mailusername = isset($mail['mailusername']) ? $mail['mailusername'] : 1;
    //端口
    $mail['port'] = $mail['port'] ? $mail['port'] : 25;
    $mail['mailsend'] = $mail['mailsend'] ? $mail['mailsend'] : 1;

    //发信者
    $email_from = $from == '' ? '=?'.$charset.'?B?'."?= <".$from.">" : (preg_match('/^(.+?) \<(.+?)\>$/',$from, $mats) ? '=?'.$charset.'?B?'.base64_encode($mats[1])."?= <$mats[2]>" : $from);

    $email_to = preg_match('/^(.+?) \<(.+?)\>$/',$toemail, $mats) ? ($mailusername ? '=?'.$charset.'?B?'.base64_encode($mats[1])."?= <$mats[2]>" : $mats[2]) : $toemail;;

    $email_subject = '=?'.$charset.'?B?'.base64_encode(preg_replace("/[\r|\n]/", '', $subject)).'?=';
    $email_message = chunk_split(base64_encode(str_replace("\n", "\r\n", str_replace("\r", "\n", str_replace("\r\n", "\n", str_replace("\n\r", "\r", $message))))));

    $headers = "From: $email_from{$maildelimiter}X-Priority: 3{$maildelimiter}X-Mailer: PHPCMS-V9 {$maildelimiter}MIME-Version: 1.0{$maildelimiter}Content-type: text/html; charset=".$charset."{$maildelimiter}Content-Transfer-Encoding: base64{$maildelimiter}";

    if(!$fp = fsockopen($mail['server'], $mail['port'], $errno, $errstr, 30)) {
        runlog('SMTP', "($mail[server]:$mail[port]) CONNECT - Unable to connect to the SMTP server", 0);
        return false;
    }
    stream_set_blocking($fp, true);

    $lastmessage = fgets($fp, 512);
    if(substr($lastmessage, 0, 3) != '220') {
        runlog('SMTP', "$mail[server]:$mail[port] CONNECT - $lastmessage", 0);
        return false;
    }

    fputs($fp, ($mail['auth'] ? 'EHLO' : 'HELO')." phpcms\r\n");
    $lastmessage = fgets($fp, 512);
    if(substr($lastmessage, 0, 3) != 220 && substr($lastmessage, 0, 3) != 250) {
        runlog('SMTP', "($mail[server]:$mail[port]) HELO/EHLO - $lastmessage", 0);
        return false;
    }

    while(1) {
        if(substr($lastmessage, 3, 1) != '-' || empty($lastmessage)) {
            break;
        }
        $lastmessage = fgets($fp, 512);
    }

    if($mail['auth']) {
        fputs($fp, "AUTH LOGIN\r\n");
        $lastmessage = fgets($fp, 512);
        if(substr($lastmessage, 0, 3) != 334) {
            runlog('SMTP', "($mail[server]:$mail[port]) AUTH LOGIN - $lastmessage", 0);
            return false;
        }

        fputs($fp, base64_encode($mail['auth_username'])."\r\n");
        $lastmessage = fgets($fp, 512);
        if(substr($lastmessage, 0, 3) != 334) {
            runlog('SMTP', "($mail[server]:$mail[port]) USERNAME - $lastmessage", 0);
            return false;
        }

        fputs($fp, base64_encode($mail['auth_password'])."\r\n");
        $lastmessage = fgets($fp, 512);
        if(substr($lastmessage, 0, 3) != 235) {
            runlog('SMTP', "($mail[server]:$mail[port]) PASSWORD - $lastmessage", 0);
            return false;
        }

        $email_from = $mail['from'];
    }

    fputs($fp, "MAIL FROM: <".preg_replace("/.*\<(.+?)\>.*/", "\\1", $email_from).">\r\n");
    $lastmessage = fgets($fp, 512);
    if(substr($lastmessage, 0, 3) != 250) {
        fputs($fp, "MAIL FROM: <".preg_replace("/.*\<(.+?)\>.*/", "\\1", $email_from).">\r\n");
        $lastmessage = fgets($fp, 512);
        if(substr($lastmessage, 0, 3) != 250) {
            runlog('SMTP', "($mail[server]:$mail[port]) MAIL FROM - $lastmessage", 0);
            return false;
        }
    }

    fputs($fp, "RCPT TO: <".preg_replace("/.*\<(.+?)\>.*/", "\\1", $toemail).">\r\n");
    $lastmessage = fgets($fp, 512);
    if(substr($lastmessage, 0, 3) != 250) {
        fputs($fp, "RCPT TO: <".preg_replace("/.*\<(.+?)\>.*/", "\\1", $toemail).">\r\n");
        $lastmessage = fgets($fp, 512);
        runlog('SMTP', "($mail[server]:$mail[port]) RCPT TO - $lastmessage", 0);
        return false;
    }

    fputs($fp, "DATA\r\n");
    $lastmessage = fgets($fp, 512);
    if(substr($lastmessage, 0, 3) != 354) {
        runlog('SMTP', "($mail[server]:$mail[port]) DATA - $lastmessage", 0);
        return false;
    }

    $http_host = ( isset( $_SERVER['HTTP_HOST'] ) ) ? $_SERVER['HTTP_HOST'] : '' ;
    $headers .= 'Message-ID: <'.gmdate('YmdHs').'.'.substr(md5($email_message.microtime()), 0, 6).rand(100000, 999999).'@'.$http_host.">{$maildelimiter}";

    fputs($fp, "Date: ".gmdate('r')."\r\n");
    fputs($fp, "To: ".$email_to."\r\n");
    fputs($fp, "Subject: ".$email_subject."\r\n");
    fputs($fp, $headers."\r\n");
    fputs($fp, "\r\n\r\n");
    fputs($fp, "$email_message\r\n.\r\n");
    $lastmessage = fgets($fp, 512);
    if(substr($lastmessage, 0, 3) != 250) {
        runlog('SMTP', "($mail[server]:$mail[port]) END - $lastmessage", 0);
    }
    fputs($fp, "QUIT\r\n");
    return true;
}

//记录发邮件日志
function runlog($mode = 'SMTP',$b = '',$c = '',$d='') {
    $data = [];
    $data['mode'] = $mode;
    $data['b'] = $b;
    $data['c'] = $c;
    $data['d'] = $d;
    trace( $data, 'ES_EMAIL_LOG_ERR' );
}

/**
 * Formats a JSON string for pretty printing
 *
 * @param string $json The JSON to make pretty
 * @param bool $html Insert nonbreaking spaces and <br />s for tabs and linebreaks
 * @return string The prettified output
 */
function _format_json($json, $html = false) {
    $tabcount = 0;
    $result = '';
    $inquote = false;
    $ignorenext = false;
    if ($html) {
        $tab = "   ";
        $newline = "<br/>";
    } else {
        $tab = "\t";
        $newline = "\n";
    }
    for($i = 0; $i < strlen($json); $i++) {
        $char = $json[$i];
        if ($ignorenext) {
            $result .= $char;
            $ignorenext = false;
        } else {
            switch($char) {
                case '{':
                    $tabcount++;
                    $result .= $char . $newline . str_repeat($tab, $tabcount);
                    break;
                case '}':
                    $tabcount--;
                    $result = trim($result) . $newline . str_repeat($tab, $tabcount) . $char;
                    break;
                case ',':
                    $result .= $char . $newline . str_repeat($tab, $tabcount);
                    break;
                case '"':
                    $inquote = !$inquote;
                    $result .= $char;
                    break;
                case '\\':
                    if ($inquote) $ignorenext = true;
                    $result .= $char;
                    break;
                default:
                    $result .= $char;
            }
        }
    }
    return $result;
}


// $string： 明文 或 密文  
// $operation：DECODE表示解密,其它表示加密  
// $key： 密匙    
// $expiry：密文有效期  
function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
{  
    // 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙  
    $ckey_length = 4;  
    // 密匙  
    $key = md5($key ? $key : C('AU_KEY'));  
    // 密匙a会参与加解密  
    $keya = md5(substr($key, 0, 16));  
    // 密匙b会用来做数据完整性验证  
    $keyb = md5(substr($key, 16, 16));  
    // 密匙c用于变化生成的密文  
    $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';  
    // 参与运算的密匙  
    $cryptkey = $keya.md5($keya.$keyc);  
    $key_length = strlen($cryptkey);  
    // 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，解密时会通过这个密匙验证数据完整性  
    // 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确  
    $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;  
    $string_length = strlen($string);  
    $result = '';  
    $box = range(0, 255);  
    $rndkey = array();  
    // 产生密匙簿  
    for($i = 0; $i <= 255; $i++)
    {  
        $rndkey[$i] = ord($cryptkey[$i % $key_length]);  
    }  
    // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度  
    for($j = $i = 0; $i < 256; $i++)
    {  
        $j = ($j + $box[$i] + $rndkey[$i]) % 256;  
        $tmp = $box[$i];  
        $box[$i] = $box[$j];  
        $box[$j] = $tmp;  
    }  
    // 核心加解密部分  
    for($a = $j = $i = 0; $i < $string_length; $i++)
    {  
        $a = ($a + 1) % 256;  
        $j = ($j + $box[$a]) % 256;  
        $tmp = $box[$a];  
        $box[$a] = $box[$j];  
        $box[$j] = $tmp;  
        // 从密匙簿得出密匙进行异或，再转成字符  
        $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));  
    }  
    if($operation == 'DECODE')
    {  
        // substr($result, 0, 10) == 0 验证数据有效性  
        // substr($result, 0, 10) - time() > 0 验证数据有效性  
        // substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16) 验证数据完整性  
        // 验证数据有效性，请看未加密明文的格式  
        if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16))
        {  
            return substr($result, 26);  
        }
        else
        {  
            return '';  
        }  
    }
    else
    {  
        // 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因  
        // 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码  
        return $keyc.str_replace('=', '', base64_encode($result));  
    }  
}

function size2mb($size,$digits=2){ //digits，要保留几位小数
    $unit= array('','K','M','G','T','P');//单位数组，是必须1024进制依次的哦。
    $base= 1024;//对数的基数
    $i   = floor(log($size,$base));//字节数对1024取对数，值向下取整。
    return round($size/pow($base,$i),$digits).' '.$unit[$i] . 'B';
}
