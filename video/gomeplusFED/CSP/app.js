import path from 'path';
import Koa from 'koa';
import Static from 'koa-static';
import Render from 'koa-ejs';
import Router from 'koa-router';
import convert from 'koa-convert';

const app = new Koa();


Render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'index',
    cache: false,
    debug: true
});


const View = Router();

View.get('/', async (ctx, next) => {
    await ctx.render('./index.html');
});


// import cors from 'koa-cors';
// app.use(convert(cors()));
// View.get('/test', async (ctx, next) => {
//     await ctx.render('./test/index.html');
// });
// const Api = Router();
// Api.get('/api/cookie', async (ctx, next) => {
// 	ctx.cookies.set('user_info', JSON.stringify({
// 		id: 123,
// 		name: 'luoye'
// 	}))
// 	ctx.body = {
// 		a: '1'
// 	}
// })
// app.use(Api.routes(), Api.allowedMethods());

app.use(convert(Static(path.join(__dirname, '/'))));

app.listen(1234);

console.log('Server runing on port `1234`');
