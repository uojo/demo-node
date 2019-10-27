arr=(0 3 5 7)

# 数组中的第一个项
echo "数组的第一项：$arr" # 0
echo 数组的第一项：$arr # 0

# 修改数组项的值
arr[0]=1

# 使用 ${} 引用数组变量
echo "按索引取值：${arr[0]}"
echo "获取所有元素：${arr[@]}，或者 ${arr[*]}"
echo "数组长度：${#arr[@]}"

# 数组循环
for item in ${arr[*]};do
echo $item
done
:<<'
1
3
5
7
'
