const mysql = require('mysql')

module.exports = {

    //数据库配置
    config: {
        host: 'localhost',
        port: '3306',
        user: 'exapp',
        password: 'exapp',
        database: 'exapp'
    },

    //连接数据库  连接连接池
    //连接池对象
    sqlConnect: function (sql, sqlArr, callback) {
        let pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('连接失败')
                return
            }

            //事件驱动回调
            conn.query(sql, sqlArr, callback)

            //释放连接
            conn.release()
        })

    }
}