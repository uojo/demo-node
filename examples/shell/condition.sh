# if

# 没有域的概念
# if [ 1==1 ];then
# ab=21
# fi
# echo $ab



# 单行
if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi

# if else
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
for loop in 1 2
do
    echo "The value is: $loop"
done

for str in 'This is a string'
do
    echo $str
done

for((i=1;i<=2;i++));do
    echo "这是第 $i 次调用";
done;

# while
int=1
while(( $int<=2 ))
do
    echo $int
    let "int++" # let 命令用于执行一个或多个表达式，变量计算中不需要加 $
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
   echo $a
   a=`expr $a + 1`
done

# case
case 1 in
1) echo 'one'
;;
*) echo '*'
;;
esac

