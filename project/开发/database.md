## 数据库

### 1.用户表

- openid (string)
- _id (string)
- username (string)
- password (string)
- status(1 for active , 0 for deactivated ) (number)
- location(object)(area buliding floor(?))
- credit(number)
- 
- phone number(number)
- identity(string) user 普通用户 deliver 快递员 admin 管理员
- hasSigned(boolean) 是否同意隐私政策

#### --请求接口

getOpenID(string) 无参数 直接返回openid

### 2.订单库

openid(string)

_id(string)

status(string) pending 未接单 dilivering 派送中 finished 已完成 cancled 用户取消 warning 出错

type(string)

### 3.地址库

openid(string)

_id(string)

campus(string) dist沙河校区

area(string) north south

building







