

# 字符长度
echo $a 的字符串长度：${#a};

# 判断字符包含关系
s1='abcd';s2='bc' 
if [[ $s1 =~ $s2 ]];then
	echo "$s1 中包含 $s2"
else
	echo "$s1 中不包含 $s2"
fi

# 字符截取，忽略匹配字符
a="abcde";
echo ${a/bc/};
echo ${a/b*d/};
echo ${a/[^bcd]/};
:<<!
ade
ae
bcde
!

# 字符截取，使用 cut 命令
# echo '[{"id":1,"name":"hello","username":"world","web_url":"https://gitlab.dxy.net/uojo"}]'|cut -d ',' -f3 
# "username":"world"
# echo "a,b,c"|cut -d ',' -f3 
# c
# echo "a:1,b:2,c:3"|cut -d ',' -f3|cut -d ':' -f2 
# 3

# 字符匹配，使用 grep 命令
# a=$(echo '{"error":"404 Not Found"}'|grep -c "404 Not Found")

# a0="runoob"
# 拼接，使用双引号
# a1="拼接, "$a0" !"
# a2="${a0} ,字符长度 ${#a0}，提取字符串：${a0:1:2}"
# echo $a1  $a2

# 拼接，使用单引号
# a0="apple"
# a1='拼接, '$a0' !'
# a2='不能使用变量, ${a0} !'

# 拼接，直接使用变量
# echo 字符变量拼接 $a1 $a2