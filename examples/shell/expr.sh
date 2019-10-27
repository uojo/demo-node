# $(())
# echo $((1+1))
# a=1;a=$((++a));echo $a # 变量自增

# expr，注意空格隔开 
# a=1;b=`expr $a + 1`;echo b;

# (()) 重新定义变量值
# a=1;((++a));echo $a; # 变量自增
# a=1;a=$[$a+1];echo $a; # 变量自增

# $()
# echo $(node throw_error.js 2>&1) # 错误输出
# echo $(node console_log.js 2>&1) # 标准输出
# echo $(ls | grep -c "s")

# ``
# echo `git branch` #？输出 ls 的效果
# echo `ls | grep -c ".sh"`

# let 命令用于执行一个或多个表达式，变量计算中不需要加 $
# let "a=1+20";echo $a; # 21

# grep 匹配到为 0，反之为 1
# echo "Hello World !" | grep -e Hello
# echo $? # 0
# echo "Hello World !" | grep -e Bye
# echo $? # 1