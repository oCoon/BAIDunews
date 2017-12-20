var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
	host : "localhost",
	port : 8889,
	user : "root",
	password : 'root',
	database : 'web10' 
});
con.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 渲染admin页面
router.get('/admin',function(req,res,next){
  res.render('admin',{title:'Admin'})
})
// 删除一项数据
router.post('/delete',function(req,res,next){
  var id = req.body.id;
  var sql = `DELETE FROM baidunews WHERE id = '${id}'`;
  con.query(sql,function(err,result,fields){
    console.log(result);
    if(result.affectedRows === 1){
      res.json({state:'ok',message:'删除成功'})
    }
  })
})
// 插入一条数据
router.post('/insertone',function(req,res,next){
    var title = req.body.title;
    var imgurl = req.body.imgurl;
    var source = req.body.source;
    var date = req.body.date;
    var swp = req.body.swp;
    var tuijian  = req.body.tuijian;
    var sql = `INSERT INTO baidunews( title, imgurl, source, date, swp, tuijian) VALUES ('${title}','${imgurl}','${source}','${date}','${swp}','${tuijian}')`;
    // console.log(sql);
    con.query(sql,function(err,result,fields){
      // console.log(result)
    })
    res.json({state:'ok',message:'插入成功'})
  })
// 更新一条数据
  router.post('/update',function(req,res,next){
    var title = req.body.title;
    var imgurl = req.body.imgurl;
    var source = req.body.source;
    var date = req.body.date;
    var swp = req.body.swp;
    var tuijian  = req.body.tuijian;
    var id = req.body.id;
    //UPDATE `baidunews` SET `id`=[value-1],`title`=[value-2],`imgurl`=[value-3],`source`=[value-4],`date`=[value-5],`swp`=[value-6],`tuijian`=[value-7] WHERE 1
    var sql = `UPDATE baidunews SET title='${title}',imgurl='${imgurl}',source='${source}',date='${date}',swp='${swp}',tuijian='${tuijian}' WHERE id='${id}'`

    console.log(sql);
    con.query(sql,function(err,result,fields){
      if(result.affectedRows === 1){
        res.json({state:'ok',message:'更新成功'})
      }
    })
    
  })
// 渲染首页
// var ary = [{'tuijian':'推荐'},{'baijia':'百家'},{'bendi':'本地'},{'tupian':'图片'},{'yule':'娱乐'},{'shehui':'社会'},
//             {'junshi':'军事'},{'hulianwang':'互联网'},{'keji':'科技'},{'nvren':'女人'},{'gaoxiao':'搞笑'},
//             {'shenghuo':'生活'},{'guoji':'国际'},{'guonei':'国内'},{'tiyu':'体育'},{'qiche':'汽车'},{'caijing':'财经'},
//             {'fangchan':'房产'},{'shishang':'时尚'},{'jiaoyu':'教育'},{'youxi':'游戏'},{'lvyou':'旅游'},{'renwen':'人文'}
//           ];
// for(var i = 0;i<ary.length;i++){
//   var cur = ary[i]
//   console.log(1)
//   for(var key in cur){
//     var url = `/get${key}`;
//     console.log(url)
//     router.get(url,function(req,res,next){
//       var sql = `SELECT  title, imgurl, source, date, swp FROM baidunews WHERE tuijian='${cur[key]}'`
//       console.log(sql)
//         con.query(sql,function(err,result,fields){
//           res.json(result)
//         })
      
//     })
//   }

// }
router.post('/getcurnews',function(req,res,next){
  var cur = req.body.Class;
  console.log(req.body)
  var sql = `SELECT  title, imgurl, source, date, swp FROM baidunews WHERE tuijian='${cur}'`
  console.log(sql)
  con.query(sql,function(err,result,fields){
    res.json(result)
  })
})

router.get('/getdata',function(req,res,next){
    var sql = 'SELECT * FROM baidunews WHERE 1';
    var result;
    con.query(sql,function(err,result,fields){
      // console.log(result);
      res.json(result)
    })
    
})
module.exports = router;
