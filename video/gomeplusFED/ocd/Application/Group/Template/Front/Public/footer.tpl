<?php if(isset($jspath)){ ?>
	<script crossorigin src="<?php echo $wapjspath; ?>/js/lithe.js?version=<?php echo C('JS_VERSION'); ?>"
        data-config-dynamic="true"
        data-config="config.js"
        data-debug="true"
        data-main="conf/<{$jspath}>">
    </script>
<?php } ?>
</body>
</html>
 