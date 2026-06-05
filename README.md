# 不動産投資CFシミュレーター

不動産投資の初期費用、月次キャッシュフロー、年次キャッシュフロー、退去費用を計算し、グラフで可視化する静的Webアプリケーション。

## 機能

- 初期費用の内訳計算
- 月次CF、年次CF、退去考慮後CFの計算
- 表面利回り、実質利回り、自己資金利回り、DSCRの表示
- 損益分岐家賃、損益分岐空室率の表示
- 初期費用、月次CF、年次CF、ローン残債、退去費用、感度分析のグラフ表示
- ローカルストレージまたはCookieへの保存
- CSVエクスポート

## ローカル確認

`index.html` をブラウザで開く。

ローカルサーバーで確認する場合。

```bash
python3 -m http.server 3000
```

## Vercelデプロイ

VercelのFramework Presetは `Other` を選択。

- Build Command: 空欄
- Output Directory: `.`
- Install Command: 空欄

GitHub連携後は、Pull RequestでPreviewデプロイ、mainブランチでProductionデプロイ。
