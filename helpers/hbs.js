const moment = require('moment');


module.exports = {
    formatDate(date,format){
        return moment(date).format(format)
    },
    // ifEqaul(value, arg){
    //     if(value==arg){
    //         return true
    //     }
    // }
    ifEquals(arg1, arg2, options) {
        return (arg1 == arg2) ? true : options.inverse(this);
        }
}