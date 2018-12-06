// requireの設定
const mysql = require('mysql');

// MySQLとのコネクションの作成
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'Kojima#1995',
  database: 'macircle'
});

// 接続
connection.connect();

// userdataの取得

const sql = "select id,date,music.title,name from attend join music on attend.titleId = music.titleId;";

connection.query(sql, function (err, rows, fields) {
  if (err) { console.log('err: ' + err); }

  console.log('date: ' + rows[0].date);
  console.log('title: ' + rows[0].title);
  console.log('name: ' + rows[0].name);

});

/*
// userdataのカラムを取得
connection.query('SHOW COLUMNS FROM userdata;', function (err, rows, fields) {
  if (err) { console.log('err: ' + err); }

  console.log(rows[0].Field);
  console.log(rows[1].Field);
});
*/

// 接続終了
connection.end();
