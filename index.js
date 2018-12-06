//グローバル変数
var date;
var title;
var name;
var part;

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
            // event.message.test　→　受信メッセージ
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
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                callSql();
                events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "名前:" + name
                }));
                events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "曲:" + title
                }));
                events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "パート:" + part
                }));
            }
        }
    });
    function callSql(){
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

        date = rows[0].date;
        title = rows[0].title;
        name = rows[0].name;
      });      // 接続終了
      connection.end();
    }

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});
