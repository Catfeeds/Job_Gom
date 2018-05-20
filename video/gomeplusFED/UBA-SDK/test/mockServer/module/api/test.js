import { fetchTask } from '../lib/hooks';

module.exports = function(Router) {
    
        // 接受{ msg: 'test' }并返回
    Router.post('/', async function(req, res, next) {
        try {
            let body = req.body;
            let msg = body.msg;
            console.log('server: test post received');
            if (msg === 'test') {
                let emitter;
                if (global.$emitters && body.source && (emitter = global.$emitters[body.source])) {
                    emitter.emit('ajax-test-post', { event_msg: 'test post received' });
                }
                res.json({ server_msg: 'just test post' });
            } else {
                res.json({ server_msg: 'wrong message' });
            }
        } catch (err) {
            next(err);
        }
    });
    Router.post('/script', async function(req, res, next) {
        try {
            let testInfo = req.app.locals.testInfo;
            let {socketid, code} = req.body;
            testInfo[socketid || 'common'].code = code;
            res.json({ code: 200 });
        } catch (err) {
            next(err);
        }
    });

    Router.get('/script', async function(req, res, next) {
        try {
            let testInfo = req.app.locals.testInfo;
            let id = req.query.id || req.cookies.io || req.app.locals.commonid;
            let content = (testInfo[id] && testInfo[id].code) || testInfo.common.code;
            let io;
            if (id && req.headers.referer) {
                if ((io = req.app.locals.ios[id]) || (io = req.app.locals.ios[req.app.locals.commonid]))  {
                    io.emit('script', decodeURIComponent(req.headers.referer.split('&')[0].split('=')[1]));
                }
            }
            res.end(content);
        } catch (err) {
            next(err);
        }
    });


    Router.get('/addurl', async function(req, res, next) {
        try {
            let { url } = req.query;
            if (req.app.locals.pushTestUrl(url)) {
                res.json({ code: 200 })
            } else {
                res.json({ code: 500 });
            }
        } catch (err) {
            next(err);
        }
    });

return Router;
}
