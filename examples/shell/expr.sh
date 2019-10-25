# 执行表达式
# echo $((1+1))
# a=1;echo `expr $a + 1`
# a=1;((++a));echo $a; # 变量自增
# a=1;a=$((++a));echo $a # 变量自增
# a=1;a=$[$a+1];echo $a; # 变量自增

# 变量赋值
# aa=$(node node_err.js 2>&1) # 错误输出到变量
# echo $aa

# 执行指令
# git branch # 直接编写指令
# echo `git branch` #？输出 ls 的效果
# 使用 echo 输出指令结果
# echo `ls | grep -c "s"`
# echo $(ls | grep -c "s")
# echo $(node node_c1.js 2>&1) # 输出标准输出
# echo $(node node_err.js 2>&1) # 输出错误输出