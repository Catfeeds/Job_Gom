/**
 *
 Created by zhangzhao on 2017/5/31.
 Email: zhangzhao@gomeplus.com
 */
import fetch from 'utils/fetch';

export async function pagenation(params = {}) {
    let res = await fetch.get(
        '/branch/query', {
            params,
            loading: {
                circle: true
            }
        });
    res = res.data;
    return res;
}

export async function createBranch(params = {}) {
    let res = await fetch.post(
        '/branch/create', {
            params,
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}

export async function deleteBranch(id) {
    let res = await fetch.delete(
        `/branch/${id}`, {
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}

export async function updateBranch(id) {
    let res = await fetch.put(
        `/branch/${id}`, {
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}

export async function editBranch(params = {}) {
    let res = await fetch.put(
        `/branch/edit/${params._id}`, {
            params,
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}

export async function getBranch(id) {
    let res = await fetch.get(
        `/branch/find/${id}`, {
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}

export async function buildBranch(params = {}) {
    let res = await fetch.post(
        `/branch/yunbuild`, {
            params,
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}