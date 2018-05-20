<template>
    <img src="/dist/img/ui/icon-date1.png">
</template>
<script>
import $ from 'jquery';
export default {
    name: 'Datepacker',
    props: ['model', 'onshow'],
    ready() {
        var self = this;
        var value = new Date(this.model).toLocaleDateString();
        $(this.$el).datetimepicker({
            lang: 'ch',
            value: value,
            format: 'Y/m/d',
            onShow(ct) {
                self.onshow && self.onshow(ct, this);
            },
            onChangeDateTime(dp, $input) {
                console.log($input.val())
                self.model = $input.val();
            },
            timepicker: false
        });
    }
}
</script>
