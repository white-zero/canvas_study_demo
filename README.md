# canvas_study_demo
### starrySky
 1.先画一个**位置透明度随机**的**静态**的星星**实例对象**；  
 2.有一个可以**改变**星星**位置和透明度**的**draw方法**；  
 3.**定时器**跑起来，**画布**不停地**清除与绘制**，动画效果完成！
##### 难点在于 
- 1.星星的稀疏程度
    - 星星垂直方向实际上是个伪随机，越靠近地球，星星越密集，而越往上，越稀疏。其算法如下：  
    ````javascript
    const getMinRandom = function() {
        const rand = Math.random();
        // step的大小决定了星星靠近地球的聚拢程度，
        // step = Math.ceil(2 / (1 - rand))就聚拢很明显
        const step = Math.ceil(1 / (1 - rand));
        const arr = [];
        for (let i=0; i<step; i++) {
            arr.push(Math.random());
        }
    
        return Math.min.apply(null, arr);       
    };
    ````
- 2.圆弧轨迹  
    - 套用高中时候学的圆方程式  
    ![](https://github.com/white-zero/canvas_study_demo/blob/master/src/images/yuanhuguiji.png)  
    已知a,b, 求y相对于x的函数表达式…
    
### 雪花噪点(noise)  
  1.创建一个canvas，绘制一个300*150随机噪点图形  
  2.把这里具有噪点的canvas以画布形式在绘制到页面上的大canvas上  
  
上面的星空，总共最多就400个点（白色的星星），但是，这里的噪点，例如，demo中画布大小（那我的机子举例）是1920*500，其中，噪点大小是1像素*1像素，总共就有960000个绘制点，显然跟400个点完全不是一个数量级的，如果我们真的一个一个绘制下来，肯定，就连Chrome这么牛步的浏览器也会感觉到明显的卡顿，如何优化如何绘制呢？

这就是本例子实现的**难点**  
#### 数量与性能  
虽然最终的噪点大小是1920*500，但是，我们实际上是由N块300*150的小的像瓷砖一样的小方块拼起来的。话句话说，我实际只绘制了45000个点，比960000显然要小了20倍还不止。
这样，既满足了效果，又保证了性能。  
说得canvas绘图，不得不提一下非常常用的一个drawImage()方法  
`context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);`  
img	用来被绘制的图像、画布或视频。  
sx	可选。img被绘制区域的起始左上x坐标  
sy	可选。img被绘制区域的起始左上y坐标。  
swidth	可选。img被绘制区域的宽度。  
sheight	可选。img被绘制区域的高度。  
x	画布上放置img的起始x坐标。  
y	画布上放置img的起始y坐标。  
width	可选。画布上放置img提供的宽度。（伸展或缩小图像）  
height	可选。画布上放置img提供的高度。（伸展或缩小图像）  
本例的小的噪点区块就是通过drawImage()方法被**平铺**到大的canvas元素上的。
