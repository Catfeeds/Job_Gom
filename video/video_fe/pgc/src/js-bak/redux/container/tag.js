/**
 *
 Created by zhangzhao on 2017/7/18.
 Email: zhangzhao@gomeplus.com
 */
import { connect } from 'react-redux';
import { publicTop } from '../action/tag';
import Article from 'components/Article';
import { bindActionCreators } from 'redux';

let action = publicTop;

const mapStateToProps = (state) => {
    // console.log('mapStateToProps....',state);
    return state;
}

const mapDispatchToProps = dispatch => {
    // console.log('mapDispatchToProps....', dispatch);
    return bindActionCreators(action, dispatch)
}

const ArticleInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Article)

export default ArticleInfo
