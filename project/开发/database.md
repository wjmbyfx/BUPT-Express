## 数据库

### 1.用户表

- openid (string)
- _id (string)
- username (string)
- password (string)
- status(1 for active , 0 for deactivated ) (number)
- location(object)(area buliding floor(?))
- credit(number)
- honesty(number) 信誉值 100满, 低于60账户禁用
- phone number(number)

#### --请求接口



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







