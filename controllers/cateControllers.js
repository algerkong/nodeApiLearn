const dbCon = require('../util/dbconfig')

//获取分类
const getCate = (req, res) => {
    let sql = "select * from cate";
    let sqlArr = [];
    let callback = (err, data) => {
        if (err) {
            console.log("连接出错了");
        } else {
            console.log("获取分类", data);
            res.send({
                'list': data
            })
        }
    }

    dbCon.sqlConnect(sql, sqlArr, callback)
}



//获取指定分类文章
const getPostCate = (req, res) => {
    let { id } = req.query
    let sql = `select * from post where cate_id=?`
    let sqlArr = [id]
    let callback = (err, data) => {
        if (err) {
            console.log("连接出错了");
        } else {
            console.log("分类文章", data);
            res.send({
                'list': data
            })
        }
    }

    dbCon.sqlConnect(sql, sqlArr, callback)

}

module.exports = {
    getCate,
    getPostCate
}
