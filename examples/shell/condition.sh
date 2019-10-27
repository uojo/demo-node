# 没有域的概念
# if [ 1==1 ];then
# ab=21
# fi
# echo $ab

# a=0
# if [ $a != 0 ];then
# echo $a
# fi

# 单行
if [ $(ls -a | grep -c ".sh") -gt 1 ]; then echo "使用if，单行输出。"; fi
if [[ abc == a[a-z]* ]];then echo "正则匹配";fi

# if elif else
a=10
b=10
if [ $a == $b ]
then
  echo "a 等于 b"
elif [ $a -gt $b ]
then
  echo "a 大于 b"
elif [ $a -lt $b ]
then
  echo "a 小于 b"
else
  echo "没有符合的条件"
fi

# for
# 多个值
for item in 1 "b"
do
  echo "for...in 多个值: $item"
done
:<<!
1
2
!
# for i in $(seq 0 4);do echo $i;done  
# for i in `seq 0 4`;do echo $i;done  
# for ((i=0;i<5;i++));do echo $i;done  
# for i in {0..4};do echo $i;done


# 单个字符串
for item in 'This is a string'
do
  echo for...in 单个字符串：$item
done

for((i=1;i<=2;i++));do
  echo "for...i $i";
done;

# while
int=1
while(( $int<=2 ))
do
  echo while... $int
  let "int++" # let 命令用于执行一个或多个表达式，变量计算中不需要加 $
  # ((int++)) # 还可以用 (())
done

# 读取键盘信息
# while read FILM
# do
#  echo "是的！$FILM 是一个好网站"
# done

# until
a=1
until [ ! $a -lt 3 ]
do
  echo until... $a
  a=`expr $a + 1`
done

# case
case 1 in
1) echo 'switch case : one'
;;
*) echo 'switch default : *'
;;
esac
