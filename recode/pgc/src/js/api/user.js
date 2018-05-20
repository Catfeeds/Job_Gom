/**
 *
 Created by zhangzhao on 2017/7/19.
 Email: zhangzhao@gomeplus.com
 */
import fetch from 'io/fetch';

class UserService {
    login(formData) {
        fetch.post('/login', {
            formData
        });
    }
}

export default new UserService();