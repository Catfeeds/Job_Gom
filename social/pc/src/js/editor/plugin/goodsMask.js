function goodsdMask(ue) {
    var close = 0;

    ue.addListener('selectionchange', function() {
        function hideMask() {
            $(ue.body).find(".cover").removeClass("show");
        }

        //查找选区范围
        var range = ue.selection.getRange();
        //range.select();
        var s = [].concat(ue.selection.getStartElementPath());

        var len = s.length - 2;

        if (len < 0) return;

        s = s[len];

        var tagName = s.tagName;
        switch (tagName) {
            case "DIV":
                hideMask();
                var $s = $(s);
                var $el = $s.find(".cover");
                var lenth = $el.length;

                if (!lenth) {
                    $s.append('<div class="cover show">iii</div>');
                    $s.attr('contenteditable', 'false');
                } else {
                    $el.addClass("show");
                }

                close = 1;
                range.setStart(s.nextSibling, 0).collapse(true).setCursor();
                break;
            case "P":
                if (close == 0) return;
                hideMask();
                close = 0;
                break;
        }
    })

}

module.exports = goodsdMask;