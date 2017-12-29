/**
 * Created by yanxs on 2017/12/29.
 */
var qiniu = require("qiniu")
var qn = {
    bucketManager : function(){
        var accessKey = 'RxocwwOMG1Uva2RUwX3UcxMluKJVq52D5F5ho-LV'
        var secretKey = '9KUCuPGAECqjQXNWOZoEz-AIDA3b3-wxNmTMWcRm'

        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z0;
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        return bucketManager;
    },
};

module.exports =  qn;