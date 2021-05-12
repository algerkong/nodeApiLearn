const dbCon = require('../util/dbconfig')

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min

}

let vaildatePhoneCode = [];

let sendCodeP = (phone) => {
    for (let item of vaildatePhoneCode) {
        if (phone == item.phone) {
            return true
        }
    }
    return false
}

let findCodeAndPhone = (phone, code) => {
    for (let item of vaildatePhoneCode) {
        if (phone == item.phone && code == item.code) {
            return 'login'
        }
    }
    return 'error'
}

//模拟发送验证码接口
const sendCode = (req, res) => {
    let phone = req.query.phone;
    if (sendCodeP(phone)) {
        res.send({
            code: 400,
            msg: '已经发送过验证码,稍后再发'
        })
        return
    }
    let code = rand(1000, 9999);
    vaildatePhoneCode.push({
        phone: phone,
        code: code
    })
    console.log(vaildatePhoneCode);

    res.send({
        code: 200,
        msg: '发送成功'
    })
    console.log(code);
}

//验证码登陆
const codePhoneLogin = (req, res) => {
    let { phone, code } = req.query
    if (sendCodeP(phone)) {
        let status = findCodeAndPhone(phone, code)
        if (status == 'login') {
            res.send({
                code: '200',
                msg: '登录成功'
            })
        } else if (status == 'error') {
            res.send({
                code: 400,
                msg: '登录失败'
            })
        }
    } else {
        res.send({
            code: 400,
            msg: '没有发送'
        })
    }
}

module.exports = {
    sendCode,
    codePhoneLogin
}
