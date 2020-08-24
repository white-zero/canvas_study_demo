# canvas_study_demo
### starrySky
 1.先画一个**位置透明度随机**的**静态**的星星**实例对象**；  
 2.有一个可以**改变**星星**位置和透明度**的**draw方法**；  
 3.**定时器**跑起来，**画布**不停地**清除与绘制**，动画效果完成！
##### 难点在于 
- 1.星星的稀疏程度
    - 星星垂直方向实际上是个伪随机，越靠近地球，星星越密集，而越往上，越稀疏。其算法如下：
- 2.圆弧轨迹  
    - 套用高中时候学的圆方程式  
    ![](https://github.com/white-zero/canvas_study_demo/blob/master/src/images/yuanhuguiji.png)
