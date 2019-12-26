# Chat Space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups, through: :users_groups
- has_many :tweets

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group|text|null: false|
|username|string|null: false|
### Association
- belongs_to :user
- has_many :users, through: :users_groups
- has_many  :tweets

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text|null: false|
### Association
- belongs_to :user
- belongs_to :group

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group