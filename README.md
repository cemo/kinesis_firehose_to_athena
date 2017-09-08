# AWS Lambda function kinesis firehose　to Athena (JST)

 kinesis firehoseで作成したS3のファイルをApache Hive方式のパーティション形式で別のバケットにコピーする。<br />
 example: dt=2009-04-12-13-00<br />
※TimezoneはAsia/Tokyoになる

## 使い方
Bucket: '************'をコピー先のバケットに変える
