var toBase64 = function(obj) {
    var def = $.Deferred();
    var $obj = obj.$obj;
    var image = new Image();
    image.src = $obj.attr('_src');
    image.setAttribute('crossOrigin', 'anonymous');
    var angle = obj.angle;
    var width, height;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    image.onload = function() {

        width = image.naturalWidth;
        height = image.naturalHeight;
        if (angle == 90 || angle == 270) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }

        var degree = angle * Math.PI / 180;

        context.rotate(degree);

        switch (angle) {
            case 90:
                context.drawImage(image, 0, -height);
                break;
            case 180:
                context.drawImage(image, -width, -height);
                break;
            case 270:
                context.drawImage(image, -width, 0);
                break;
        }

        def.resolve(canvas.toDataURL("image/jpg"));
    }
    return def.promise();
}

module.exports = toBase64;