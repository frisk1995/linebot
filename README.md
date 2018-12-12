# Read Me
## memo
##### 出席に必要な情報は？
 - 名前
 - パート
 - 曲  
 →フォーマットで入力させる？
## Tasks
 - イベント日時用DB作成
 - 結果表示のフォーマットを決める
 - 画像を取り込んで表示してみる？

## 参考URL
http://oasobi-program.hatenadiary.jp/entry/2017/04/15/094924  
https://dev.classmethod.jp/etc/line-messaging-api/  
https://dev.classmethod.jp/etc/line-messaging-api-flex-message/  
https://qiita.com/verhichi/items/350d6631495ef8aea652  
https://qiita.com/acro5piano/items/55d18983a6a33657cc4d  

## Linebotの機能
※実装可能かどうかは置いておいて、欲しい機能
 - スタジオイベントの表示
 - スタジオイベントの出席登録
 - スタジオイベントの状況確認
 - 飲み会等のイベントの出席登録
 - スタジオイベントの追加
 - スタジオイベントの修正
 - スタジオイベントの削除

### リッチメニューについて
 - スタジオイベントの表示
 - 参加者の表示
 - 

#### スタジオイベントの表示
 1. lineの「スタジオイベントの表示」をクリック(「スタジオイベントの表示」のメッセージをユーザから受け取る)
 1. メッセージとして応答
 1. メッセージ内容をtemplateとして外部jsに持つ？
```
メッセージ内容:  
次回のイベント情報だよ
日時：〇月×日(△)  
場所：XXXX
```

### DBテストデータ
| partId | part |
----|---- 
| 1 | ボーカル |
| 2 | ギター |
| 3 | ベース |
| 4 | ドラム |
| 5 | キーボード |

|titleId|title|atrtist|
----|----|----
| 1 | チェリー | スピッツ
| 2 | リライト | アジカン
| 3 | 風吹けば恋 | チャットモンチー
| 4 | シルエット | KANA-BOON
| 5 | アボカド | yonige
| 6 | ファンファーレ | sumika
| 7 | 真赤 | My hair is bad

|eventId|eventdate|place|
----|----|----
| 1 | 2018年12月22日 | スタジオノア-秋葉原店|
| 2 | 2018年1月10日 | スタジオノア-秋葉原店|


|id|eventId|titleId|name|partId|
----|----|----|----|----
|1|1|2|まさる|3|
|2|1|2|まさる|2|
|3|1|2|まさる|1|
|4|1|2|まさる|4|

