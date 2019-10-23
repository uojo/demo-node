# 常规输出
# echo 'a' 1 # a 1

# 执行指令
# git branch # 直接编写指令
# echo `git branch` #？输出 ls 的效果
# 使用 echo 输出指令结果
# echo `ls | grep -c "s"`
# echo $(ls | grep -c "s")
# echo $(node node_c1.js 2>&1) # 输出标准输出
# echo $(node node_err.js 2>&1) # 输出错误输出

# 执行表达式
# echo $((1+1))
# a=1;echo `expr $a + 1`
# a=1;((++a));echo $a; # 变量自增
# a=1;a=$((++a));echo $a # 变量自增
# a=1;a=$[$a+1];echo $a; # 变量自增

# 变量赋值
# aa=$(node node_err.js 2>&1) # 错误输出到变量
# echo $aa

# 变量的定义与使用
# your_name="qinjx"
# echo $your_name
# echo ${your_name}

# 字符截取
# a="hello";echo ${a/e/}

# 定义只读变量
# myUrl="http://www.google.com"
# readonly myUrl
# myUrl="http://www.runoob.com"

# 删除变量
# myUrl="http://www.runoob.com"
# unset myUrl
# echo $myUrl

# your_name="runoob"
# # 使用双引号拼接
# greeting="拼接, "$your_name" !"
# greeting_1="${your_name} ,字符长度 ${#your_name}，提取字符串：${your_name:1:2}"
# echo $greeting  $greeting_1

# # 使用单引号拼接
# greeting_2='拼接, '$your_name' !'
# greeting_3='不能使用变量, ${your_name} !'
# echo $greeting_2  $greeting_3

# ? expr: syntax error
# ab="runoob is a great site" is
# echo `expr index "$ab" io` is

# 字符长度
# a="hello";echo ${#a};

# 判断str 是否包含 str1 字符串
# str='hello'
# str1='llo' 
# if [[ $str =~ $str1 ]];then
# 	echo "yes"
# else
# 	echo "no"
# fi

# nums=(3 6 9)
# nums[0]=1
# echo "按索引取值：${nums[0]}"
# echo "获取所有元素：${nums[@]}，或者 ${nums[*]}"
# echo "数组长度：${#nums[@]}"

# 数组循环
# nums=(2 4 6)
# for i in ${nums[*]};do
# echo $i
# done

# 多行注释，下方的 ' 可替换为任意字符
# :<<'
# 注释内容...
# 注释内容...
# 注释内容...
# '

# 算术运算符
# val=`expr 2 + 2` # 表达式和运算符之间要有空格
# echo "两数之和为 : $val"

# a=10
# b=20

# val=`expr $a + $b`
# echo "a + b : $val"

# val=`expr $a - $b`
# echo "a - b : $val"

# val=`expr $a \* $b`
# echo "a * b : $val"

# val=`expr $b / $a`
# echo "b / a : $val"

# val=`expr $b % $a`
# echo "b % a : $val"

# echo $a -eq $b

# result=$[a+b]
# echo "[a+b]:$result"


# 关系运算符
# -eq 等于
# -ne 不等于
# -gt 大于
# -lt 小于
# -ge 大于等于
# -le 小于等于

# 布尔运算符
# [!false]
# [-o] 或
# [-a] 与

# 逻辑运算符
# && 
# || 

# 字符串运算符, 返回 boolean
# = 
# != 
# -z 字符长度为0
# -n 字符长度不为0
# $ 字符不为空

# 文件检查运算符
# -b 是块设备
# -c
# -g
# -k
# -p
# -u

# -d 是目录
# -f 是普通文件
# -r 文件可读
# -w 文件可写
# -x 文件可执行
# -s 文件大小不为0
# -e 文件或目录存在

#输入
# 从标准输入中读取一行
# read name
# echo -e "输入\n内容：$name" # 开启转义
# echo "test" > b.sh # 输出内容到文件
# echo `date` # 输出日期时间

# cut
# echo '[{"id":1,"name":"hello","username":"world","web_url":"https://gitlab.dxy.net/uojo"}]'|cut -d ',' -f3 # "username":"world"
# echo "a,b,c"|cut -d ',' -f3 # c
# echo "a:1,b:2,c:3"|cut -d ',' -f3|cut -d ':' -f2 # 3
# a=$(echo '{"error":"404 Not Found"}'|grep -c "404 Not Found")
# if [ $a != 0 ];then
# echo $a
# fi

# 换行
# echo $( ls \
#  -a
# )

# 获取指令执行结果信息
# a=$(git push)
# b=$(echo $a|grep -c husky)
# echo $b

# if [ $a != 0 ];then
# echo $a
# fi

# TARGET_BRANCH="release-2"
# parse_target_branch=$(echo $TARGET_BRANCH | egrep -o "[a-z0-9]+-\d+" )
# # if [ ${#parse_target_branch} == 1 ]; then # 判断字符串长度
# if [ -n "$parse_target_branch" ]; then # 判断字符串长度不为 0
# ab=$parse_target_branch
# fi
# echo $ab

# 没有域的概念
# if [ 1==1 ];then
# ab=21
# fi
# echo $ab

# 中止
# exit
# echo 12345