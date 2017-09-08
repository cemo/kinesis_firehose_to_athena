'use strict';
process.env.TZ = 'Asia/Tokyo';
Date.prototype.convert_local_timezone = function()
{
    this.setTime(
        this.getTime()-(this.getTimezoneOffset()*60*1000)
    );
};

    
const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = (event, context, callback) => {

  const key = decodeURIComponent(event.Records[0].s3.object.key);
  console.log(key);
  console.log(event.Records[0].s3.bucket.name);
  const meta = key.split('/');
  const options = {
    year: meta[0],
    month: meta[1],
    day: meta[2],
    hour: meta[3],
    name: meta[4],
  };
  console.log(options);
  var firehose_date =  options.year + "-" + options.month + "-" + options.day + " " + options.hour + ":00:00";
  var file_date = new Date(firehose_date);
  file_date.convert_local_timezone();
  const year = file_date.getFullYear();
  let month = file_date.getMonth() + 1;
  let day = file_date.getDate();
  let hour = file_date.getHours();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hour < 10) hour = "0" + hour;

  const params = {
    Bucket: '************',
    CopySource: event.Records[0].s3.bucket.name + "/" +`${key}`,
    Key: 'dt=' + year + '-' + month + '-' + day + '-' + hour +"/" + options.name
  }
  console.log('dt=' + year + '-' + month + '-' + day + '-' + hour +"/" + options.name);
  s3.copyObject(params, function(err, data) {
    if(err) {
      console.log(err);
      callback(err.message);
      return;
    }
    callback(null, 'copy complete')
  });
};
