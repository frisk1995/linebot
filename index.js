//グローバル変数
var line_name;

// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            callSql();
            // event.message.text　→　受信メッセージ
            // 曲を選択
            if (event.message.text == "曲を選択"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "曲を選択してください。"
                }));
            }
            // パートを選択
            if (event.message.text == "パートを選択"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "パートを選択してください。"
                }));
            }
            // 参加者を確認
            if (event.message.text == "参加者を確認"){
                callSql();
                events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "名前:" + line_name + "\n パート:" + "test"
                }));
            }
        }
    });
    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});

// function defined-------------------------------------------------------------
function callSql() {
  const mysql = require('mysql');
  // MySQLとのコネクションの作成
  const connection = mysql.createConnection({
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'b7131fe3a57bcc',
    password : '0c65381b',
    database: 'heroku_91674c0692dc4e7'
  });
  // 接続
  connection.connect();
  // userdataの取得
  const sql = "select * from test";

  connection.query(sql, function (err, rows, fields) {
    if (err) { console.log('err: ' + err); }
    line_name = rows[0].name;
    return line_name;
  });
  connection.end();
  return line_name;
}
