<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title>意见反馈-国美</title>
    <meta name="author" content="美信网络技术有限公司">
    <meta name="description" content="<{$desc}>">
    <meta name="keywords" content="<{$title}>">
    <link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/public.css">
    <link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/other/feedback.css">
</head>

<body class="opg">
    <div class="feedback-suc">您的反馈已收到，感谢您的支持！<br><span id="counter">2</span>秒后自动关闭</div>
    <script>
    (function(){
        var counter = document.getElementById('counter');
        var count = parseInt(counter.innerHTML, 10);
        var start = function(){
            setTimeout(function(){
                count--;
                counter.innerHTML = count;
                if(count === 0){
                    window.close();
                } else {
                    start();
                }
            }, 1000);
        };
        start();
    })();
    </script>
</body>
</html>
