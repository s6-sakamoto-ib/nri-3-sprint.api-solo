# nri-3-sprint.api-solo

API solo project to implement CRUD API

# 店舗一覧取得 API

機能概要：登録されている店舗の一覧を取得する

### リクエスト

- Method: GET
- URI: /api/pubs

### レスポンス

- Status: 200（成功）
- Body
  ```json
  [
    {
      "id": 店舗ID,
      "pubName": 店舗名,
      "email": 店舗のメールアドレス,
      "address": 店舗の住所（区町村以下）,
      "city": 店舗の住所（市）,
      "region": 店舗の住所（県）,
      "postalCode": 店舗の郵便番号,
      "country": 店舗の国,
      "score": 店舗の評価
    },
    ...
  ]
  ```

<br><br><br>

# 店舗情報取得 API

機能概要：登録されている店舗の情報を ID もしくは名前指定で取得する。<br>
※条件に一致する店舗がない場合は何も取得されない。

### リクエスト

- Method: GET
- URI: /api/pubs/{idOrName}

- Parameter
  - idOrName:
    - 例 1）3 - 店舗の ID
    - 例 2）izakayaA - 店舗の名前

### レスポンス

- Status: 200（成功）
- Body
  ```json
    {
      "id": 店舗ID,
      "pubName": 店舗名,
      "email": 店舗のメールアドレス,
      "address": 店舗の住所（区町村以下）,
      "city": 店舗の住所（市）,
      "region": 店舗の住所（県）,
      "postalCode": 店舗の郵便番号,
      "country": 店舗の国,
      "score": 店舗の評価
    }
  ```

<br><br><br>

# 店舗情報編集 API

機能概要：登録されている店舗の情報を編集する。

### リクエスト

- Method: PUT
- URI: /api/pubs
- Body
  ```json
  {
    "id": 店舗ID【必須】,
    "pubName": 店舗名,
    "email": 店舗のメールアドレス,
    "address": 店舗の住所（区町村以下）,
    "city": 店舗の住所（市）,
    "region": 店舗の住所（県）,
    "postalCode": 店舗の郵便番号,
    "country": 店舗の国,
    "score": 店舗の評価
  }
  ```

### レスポンス

- Status: 200（成功）
- Body
  ```json
      id: 編集した店舗のID
      例）2
  ```

<br><br><br>

# 店舗情報登録 API

機能概要：店舗の情報を DB に登録する。

### リクエスト

- Method: POST
- URI: /api/pubs
- Body
  ```json
  {
    "id": 店舗ID【必須】,
    "pubName": 店舗名【必須】,
    "email": 店舗のメールアドレス【必須】,
    "address": 店舗の住所（区町村以下）,
    "city": 店舗の住所（市）,
    "region": 店舗の住所（県）,
    "postalCode": 店舗の郵便番号【必須】,
    "country": 店舗の国,
    "score": 店舗の評価
  }
  ```

### レスポンス

- Status: 200（成功）
- Body
  ```json
      id: 編集した店舗のID
      例）2
  ```

<br><br><br>

# 店舗情報削除 API

機能概要：店舗の情報を DB から削除する。

### リクエスト

- Method: DELETE
- URI: /api/pubs
- Body
  ```json
  {
    "id": 店舗ID【必須】
  }
  ```

### レスポンス

- Status: 200（成功）
- Body
  ```json
      id: 編集した店舗のID
      例）2
  ```

<br><br><br>
