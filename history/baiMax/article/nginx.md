nginx学习：“Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡。
自我了解：跨域。
学习了解：是一个开源可靠且高性能的 http 中间件，代理服务
中间件概念：连接两个独立应用程序或独立系统的软件
优势：功能是最长常使用和需要的。轻量级，高性能
多路IO复用
环境配置确认：四项确认，两项安装，一次初始化
四项确认：
1、确认系统网络 ping www.baidu.com
2、确认yum可用 yum list|grep gcc
3、确认关闭iptables规则 
iptables -L 查看是否有规则 
iptables -F 关闭规则
保险做法：
iptables -t net -L 查表规则
iptables -t net -F
4、确认停用selinux 
getenforce 查看是否开启
setenforce 0 关闭

两项安装：库安装
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum -y install wget httpd-tools vim

一次初始化：在opt目录下
cd /opt: mkdir app download logs work backup
app 代码目录
download 下载的源码目录
logs 自定义日志管理
work shell 脚本
backup 文件备份

安装nginx
