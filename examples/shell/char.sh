# 字符截取
# a="hello";echo ${a/e/}

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


# cut
# echo '[{"id":1,"name":"hello","username":"world","web_url":"https://gitlab.dxy.net/uojo"}]'|cut -d ',' -f3 # "username":"world"
# echo "a,b,c"|cut -d ',' -f3 # c
# echo "a:1,b:2,c:3"|cut -d ',' -f3|cut -d ':' -f2 # 3
# a=$(echo '{"error":"404 Not Found"}'|grep -c "404 Not Found")
# if [ $a != 0 ];then
# echo $a
# fi

# your_name="runoob"
# # 使用双引号拼接
# greeting="拼接, "$your_name" !"
# greeting_1="${your_name} ,字符长度 ${#your_name}，提取字符串：${your_name:1:2}"
# echo $greeting  $greeting_1

# # 使用单引号拼接
# greeting_2='拼接, '$your_name' !'
# greeting_3='不能使用变量, ${your_name} !'
# echo $greeting_2  $greeting_3