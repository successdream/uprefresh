// 设置cookie
function setCookie(c_name, value, expiredays) {
    //var exdate=new Date(); 
    //exdate.setDate(exdate.getDate()+expiredays);

    var exdate = new Date();

    var times = exdate.getTime() + parseInt(expiredays * 24 * 60 * 60 * 1000)

    exdate.setTime(times);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + "; path=/")
    //  path=/ cookie存储位置在域名下 与path无关
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {

        c_start = document.cookie.indexOf(c_name + "=")

        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length

            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 删除所有cookie
function delAllCookie() {
    var myDate = new Date();
    myDate.setTime(-1000); //设置时间    
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
        var varName = dataArray[i].split("=");
        document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
    }

}
Date.prototype.format = function(format) {
    var weekday = new Array(7)
    weekday[0] = "星期日"
    weekday[1] = "星期一"
    weekday[2] = "星期二"
    weekday[3] = "星期三"
    weekday[4] = "星期四"
    weekday[5] = "星期五"
    weekday[6] = "星期六"

    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day  
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds(), //millisecond 
        "D": weekday[this.getDay()],
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

// 获取连接参数
function getUrlPara() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function getLocationUrl() {
    var url = window.location.href;
    if (url.indexOf("?") != -1) {
        url = url.split("?")[0];
    }
    return url;
}
// 跳转
function route(url) {
    window.location.href = url;
}

//去左空格;
function ltrim(s) {
    return s.replace(/(^\s*)/g, "");
}
// 去空格
function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
// 身份证校验
function isValidateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式  
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算  
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里  
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组  
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和  
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置  
            var idCardLast = idCard.substring(17); //得到最后一位身份证号码  

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X  
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码  
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
}
// 判断手机
function isPhone(phone) {

    /*
    a)   字段取值不能少于11位数字
b)  2、11位数字，首两位数字必须是13、14、15或18
c)  3、12位数字，首三位数字必须是013、014、015或018
*/
    // var reg = /(^1[345678][0-9]{9}$)|(^01[345678][0-9]{9}$)/;
    var reg = /^1[345678][0-9]{9}$/;
    if ((reg.test(phone))) {
        return true;
    } else {
        return false;
    }
}
// 根据身份证获取生日
function getBirthdayFromId(psidno) {
    var birthdayno, birthdaytemp
    if (psidno.length == 18) {
        birthdayno = psidno.substring(6, 14)
    } else if (psidno.length == 15) {
        birthdaytemp = psidno.substring(6, 12)
        birthdayno = "19" + birthdaytemp
    } else {
        return false
    }
    var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
    return birthday
}
// 根据身份证获取性别
function getSexFromId(psidnos) {
    var sexno, sex
    if (psidno.length == 18) {
        sexno = psidno.substring(16, 17)
    } else if (psidno.length == 15) {
        sexno = psidno.substring(14, 15)
    } else {
        alert("错误的身份证号码，请核对！")
        return false
    }
    var tempid = sexno % 2;
    if (tempid == 0) {
        sex = 'F'
    } else {
        sex = 'M'
    }
    return sex
}

// 身份证匹配
var idCardNoUtil = {
    /*省,直辖市代码表*/
    provinceAndCitys: {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    },

    /*每位加权因子*/
    powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],

    /*第18位校检码*/
    parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],

    /*性别*/
    genders: { male: "M", female: "F" },

    /*校验地址码*/
    checkAddressCode: function(addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check) return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },

    /*校验日期码*/
    checkBirthDayCode: function(birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check) return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false; //生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },

    /*计算校检码*/
    getParityBit: function(idCardNo) {
        var id17 = idCardNo.substring(0, 17);
        /*加权 */
        var power = 0;
        for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }
        /*取模*/
        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },

    /*验证校检码*/
    checkParityBit: function(idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },

    /*校验15位或18位的身份证号码*/
    checkIdCardNo: function(idCardNo) {
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check) return false;
        //判断长度为15位或18位 
        if (idCardNo.length == 15) {
            return idCardNoUtil.check15IdCardNo(idCardNo);
        } else if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    //校验15位的身份证号码
    check15IdCardNo: function(idCardNo) {
        //15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        var birDayCode = '19' + idCardNo.substring(6, 12);
        //校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    //校验18位的身份证号码
    check18IdCardNo: function(idCardNo) {
        //18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        //校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check) return false;
        //验证校检码  
        return idCardNoUtil.checkParityBit(idCardNo);
    },

    formateDateCN: function(day) {
        var yyyy = day.substring(0, 4);
        var mm = day.substring(4, 6);
        var dd = day.substring(6);
        return yyyy + '-' + mm + '-' + dd;
    },

    //获取信息
    getIdCardInfo: function(idCardNo) {
        var idCardInfo = {
            gender: "", //性别
            birthday: "" // 出生日期(yyyy-mm-dd)
        };
        if (idCardNo.length == 15) {
            var aday = '19' + idCardNo.substring(6, 12);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        } else if (idCardNo.length == 18) {
            var aday = idCardNo.substring(6, 14);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }

        }
        return idCardInfo;
    },

    /*18位转15位*/
    getId15: function(idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo;
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
        } else {
            return null;
        }
    },

    /*15位转18位*/
    getId18: function(idCardNo) {
        if (idCardNo.length == 15) {
            var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
            var parityBit = idCardNoUtil.getParityBit(id17);
            return id17 + parityBit;
        } else if (idCardNo.length == 18) {
            return idCardNo;
        } else {
            return null;
        }
    }
};
// 出生证 第一位大写字母 2,3位省市标号，后7位数字
function validateBirthCertificate(val) {
    return /^[A-Z]{1}(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65)\d{7}$/g.test(val);
    // [A-Z]{1}\d{9}  出生证
}
// 军官证
function validateOfficerCertificate(val) {
    reg = /^\S+\u5b57\u7b2c\d{4,}$/g;
    // reg = /^.+\u5b57\u7b2c\d{4,}$/g;
    // return /^(.+/\x{5b57}\x{7b2c}/u\d{4,}){10,20}$/.test(val);
    // return /^[a-zA-Z0-9]{7,21}$/.test(val);
    return (reg.test(val) && (getRealLen(val) >= 10) && (getRealLen(val) <= 20))
}

// 护照
function validatePassportCertificate(val) {
    return /^[a-zA-Z]\d{6,}$/.test(val);
}

// 港澳居民通行证
function validateGOCertificate(val) {
    return /^[a-zA-Z](\d{8}|\d{10})$/.test(val);
}

// 台湾居民通行证
function validateTCertificate(val) {
    return /^\d{8}$/.test(val);
}

// 姓名
function validateName(name) {
    // return /^([A-Za-z]|[\u4E00-\u9FA5])+$|(?:·[\u4E00-\u9FA5]{2,5})+$/.test(name)
    /*
1、姓名字段不能为空
2、姓名字段中不允许含有数字\标点符号(“•”除外）
3、姓名字段中不允许含有汉字又同时含有字母\空格
4、姓名字段不允许长度小于等于1个汉字
5、姓名字段不允许长度超过4个汉字且，姓名字段中有“•”的不在此条判定规则之列
    */
    return /^[\u4E00-\u9FA5]{2,4}$|^[A-Za-z\s]+$|^([\u4E00-\u9FA5]+|[A-Za-z\s]+)(·[\u4E00-\u9FA5A-Za-z]+)+$/.test(name)
    // return /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/.test(name)
}
// 判断email
function checkIsEmail(val) {
    return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val);
}
// 获取字符串真正的长度 中文2 英文1
function getRealLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
};
// 对比时间是否在今天之前
function compareDateToNow(date) {
    var now = new Date().getTime();
    var tim = new Date(date).getTime();
    var druct = now - tim;

    if (druct > 0) {
        return true;
    } else {
        return false;
    }
};
// 检查是否登录超时
function checkMoreThanTime() {
    // if (loginThanTime()) {
    //     // 超过30天 手机短信登录
    //     localStorage.setItem(bindRoute, window.location.href)
    //     route('checkLogin.html');

    // } else {
    //     updateLogin();
    // }

    // function loginThanTime() {

    // }
    var lastLogin = localStorage.getItem(lastLoginTime);
    var now = Date.now();
    // if (lastLogin && (now - lastLogin < 30 * 24 * 60 * 60 * 1000)) {
    if (lastLogin && (now - lastLogin < 5 * 60 * 1000)) {
        return false;
    } else {
        return true;
    }
}
// 更新登录时间
function updateLogin() {
    localStorage.setItem(lastLoginTime, Date.now())
}
// 对证件号码进行脱敏处理，除去后四位置*
function desenNum(num) {
    if (num.length > 4) {
        var des = num.substr(0, num.length - 4);
        return num.replace(des, "****");
    } else {
        return num;
    }

}
// 对手机号进行脱敏处理
function desenPhone(surePhone2) {
    if (surePhone2) {
        return surePhone2.substr(0, 3) + '****' + surePhone2.substr(7, 4)
    } else {
        return surePhone2;
    }
}
// 从年月日时分秒中获取年月日
function getDayFromDate(date) {
    return date.split(' ')[0]
}
var openid_status = '1528272787667'
// ajax封装
function POST(param) {
    var openid = localStorage.getItem(openidL) || openid_status;
    if (!param.data) {
        param.data = {
            openid: openid
        }
    }
    param.data.openid = openid;
    $.ajax({
            url: param.url,
            type: 'POST',
            dataType: 'json',
            data: param.data,
        })
        .done(function(rs) {
            if (param.success) {
                param.success(rs)
            }
        })
        .fail(function(rs) {
            if (param.error) {
                param.error(rs)
            }
        })
}

function GET(param) {
    var openid = localStorage.getItem(openidL) || openid_status;
    if (!param.data) {
        param.data = {
            openid: openid
        }
    }
    param.data.openid = openid;
    $.ajax({
            url: param.url,
            type: 'GET',
            dataType: 'json',
            data: param.data,
        })
        .done(function(rs) {
            if (param.success) {
                param.success(rs)
            }
        })
        .fail(function(rs) {
            if (param.error) {
                param.error(rs)
            }
        })
}