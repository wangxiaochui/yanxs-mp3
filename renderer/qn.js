/**
 * Created by yanxs on 2017/12/29.
 */
var qnCloud = require("qiniu")
var qn = {
    bucketManager : function(){
        var accessKey = 'RxocwwOMG1Uva2RUwX3UcxMluKJVq52D5F5ho-LV'
        var secretKey = '9KUCuPGAECqjQXNWOZoEz-AIDA3b3-wxNmTMWcRm'

        var mac = new qnCloud.auth.digest.Mac(accessKey, secretKey);
        var config = new qnCloud.conf.Config();
        config.zone = qnCloud.zone.Zone_z0;
        var bucketManager = new qnCloud.rs.BucketManager(mac, config);
        return bucketManager;
    },
};

module.exports =  qn;