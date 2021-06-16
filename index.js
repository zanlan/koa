
var koa = require('koa')
var koaRouter = require('koa-router')
var router = new koaRouter()
var app = new koa()
var views = require('koa-views');
app.use(views('views', {
    extension:'ejs'
    // map: {
    //     html: 'ejs'
    // }
}))

app.use(async (ctx, next) => {
    console.log('1、start')
    await next()/* 继续匹配下一个路由 */
    console.log('1、end')

    /* 等匹配完了所有路由之后  再继续执行下面代码 */
    // if(ctx.status == 404){
    //     ctx.body = '这是一个404页面'
    // }else{
    //     console.log(ctx.url)
    // }
})
app.use(async (ctx, next) => {
    console.log('2、start')
    /* 公共信息 */
    ctx.state.username = '张Sam'
    await next()/* 继续匹配下一个路由 */
    console.log('2、end')

    /* 等匹配完了所有路由之后  再继续执行下面代码 */
    // if(ctx.status == 404){
    //     ctx.body = '这是一个404页面'
    // }else{
    //     console.log(ctx.url)
    // }
})
router.get('/', async (ctx) => {
    // console.log(ctx.query)
    // console.log(ctx.querystring)
    // console.log(ctx.url)
    // console.log(ctx.request.url)
    // console.log(ctx.request.query)
    // console.log(ctx.request.querystring)
    // ctx.body = '1'
    await ctx.render('index',{title:'这是标题',array:[1,2,3],html:'<h1>html</h1>'})
}).get('/new/:aid/:bid', async (ctx) => {
    console.log(ctx.params)
    ctx.body = '2'
})

router.get('/www', async (ctx, next) => {
    console.log('执行www接口啦')
    await next()
})
router.get('/www', async (ctx, next) => {
    ctx.body = 'www2'
})


/* 启动路由 */
// 在之后调用  根据ctx.status 设置response响应头
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
    console.log('localhost:3000')
})