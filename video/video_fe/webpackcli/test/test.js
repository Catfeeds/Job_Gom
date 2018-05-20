var list = [{
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.7de0e39.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591120001,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T08:43:51.399Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.06f8370.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591121693,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T09:25:08.681Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.853806f.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591121689,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T09:24:39.592Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.411f1c9.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591120158,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T08:51:04.542Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.49e7bf5.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591119989,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T08:43:21.110Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.1596e79.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591120022,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T08:44:27.560Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.3961e94.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591121741,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T09:26:28.408Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.cce354c.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591121758,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T09:27:03.632Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.ecceb23.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591122139,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T09:29:49.321Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.f117531.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591124106,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T09:56:16.855Z'
        }
    },
    {
        path: '/Users/jiyp/workspace/webpackcli/dist/js/runtime.e86a4e9.js',
        stats: {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4194304,
            ino: 8591124996,
            size: 1453,
            blocks: 8,
            mtime: '2017-10-21T10:22:02.132Z'
        }
    }
];

/*list.sort((a, b) => {
    var t1 = new Date(a.stats.mtime).getTime();
    var t2 = new Date(b.stats.mtime).getTime();
    if(t1 - t2 > 0){
        return 1;
    } else if(t1 - t2 < 0){
        return -1;
    }
    return 0;
});

console.log(list);*/

// 1508575431000
// 1508575431399

var list = [
    '2017-10-21T08:43:51.399Z',
    '2017-10-21T09:25:08.681Z',
    '2017-10-21T09:24:39.592Z',
    '2017-10-21T08:51:04.542Z',
    '2017-10-21T08:43:21.110Z',
    '2017-10-21T08:44:27.560Z',
    '2017-10-21T09:26:28.408Z',
    '2017-10-21T09:27:03.632Z',
    '2017-10-21T09:29:49.321Z',
    '2017-10-21T09:56:16.855Z',
    '2017-10-21T10:22:02.132Z'
];

list.sort((a, b) => {
    var t1 = new Date(a).getTime();
    var t2 = new Date(b).getTime();
    if(t1 - t2 > 0){
        return 1;
    } else if(t1 - t2 < 0){
        return -1;
    }
    return 0;
});
console.log(list);


