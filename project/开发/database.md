## 数据库

### 1.用户表

- openid (string)
- _id (string)
- username (string)
- status(1 for active , 0 for deactivated ) (number)
- location(object)(area buliding floor(?))
- credit(number)
- contact(number)
- identity(string) user 普通用户 deliver 快递员 admin 管理员
- hasSigned(boolean) 是否同意隐私政策

#### --请求接口

getOpenID(string) 无参数 直接返回openid

### 2.订单库

openid(string)

_id(string)

status(string) pending 未接单 delivering 派送中 finished 已完成 cancled 用户取消 warning 出错 arrived 待取件

type:normal (使用默认地址) customize(使用自定义地址)

location

expectedtime(number) 时间戳

note(备注)

time 时间戳

postman 配送员



### 3.反馈表

openid

content

oid 订单号



### 4.派送员表

openid

username

status

credit

contact
