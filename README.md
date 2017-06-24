### Web Front Study

* HTML + SCSS  
※imagesフォルダ配下の画像については各自配備すること

#### 環境構築

* node_modulesインストール
```
npm install
```

* Dockerのビルド

初回またはDockerfileを変更した場合コマンドを実行
```
docker-compose build
```

※gulpが存在しない旨のエラーが発生する場合には以下のコマンドを実行してください。
```
docker-compose run app npm install
```

* タスクランナー起動
```
docker-compose up
```

* ブラウザでアクセス
```
http://localhost:8000/
```
