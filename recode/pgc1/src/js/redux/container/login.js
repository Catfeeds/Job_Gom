/**
 *
 Created by zhangzhao on 2017/7/18.
 Email: zhangzhao@gomeplus.com
 */
import { connect } from 'react-redux';
import login from '../action/user';
import Login from 'page/login/index';
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    console.log('mapStateToProps....',state);
    return {userData: state.reducers.userData};
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(login, dispatch)
})

const UserInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default UserInfo
