import Vue from 'vue';

Vue.filter('ISODate', {
    read(value) {
        return new Date(value).toLocaleDateString();
    },
    write(value) {
        return new Date(value).valueOf();
    }
});


Vue.filter('length', function(value) {
    if (value) {
        const _c = value;
        return _c.length;
    }
    return 0;
});