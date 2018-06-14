$(function(){
   // 获取省市区三级联动的数据
   //1 第一次默认查询省级数据==获取数据TODO
   //清空默认静态文本
   $("#content").html("");
   getThreeActionData("0");
    function getThreeActionData(msg){

        POST({
            url:threeAction,
            data:{
               parentId:msg
            },
            success:function(data){
                if("0"==data.code){
                    //获取数据成功TODO
                    renderProvinceList(data.data);
               }else{
                   console.log(data);
               }
            },
            error:function (data) { 
                console.log(data);

             }
        })
       

    }
   //2 省级===渲染 TODO
  function renderProvinceList(msg){
    $(".provinceList ul").html("");
      if("[object Array]"!=Object.prototype.toString.call(msg)){
          console.log("数据不是数组")
          return
      }
      //数据为空，则为空数组
      msg=msg || [];
      // 如果为空数组的话，则返回,如果省份没有则不显示选择列表
      if(0==msg.length){
          return 
      }
      var temp="";
      msg.forEach(function(item,index){
           temp+='<li class="option-list" data-parentid='+item.code+'>'+item.name+'</li>';
      });  
      //渲染
      $(".provinceList ul").html(temp);
   }
       //点击时候改变箭头 === 参数点击对象
       var controlArrow=true;

       function changeArrow(that){
           if(controlArrow){
               //内容隐藏
               $("#content").addClass("hideDiv");
               //列表显示
               $(".provinceList").removeClass("hideDiv");
               //改变箭头指向
               $(that).find(".arrow").removeClass("icon-Group-1").addClass("icon-Group-");
               //重复点击
               controlArrow=false;
           }else{
               // 内容显示
               $("#content").removeClass("hideDiv");
                 //列表隐藏
                 $(".provinceList").addClass("hideDiv");
               $(that).find(".arrow").removeClass("icon-Group-").addClass("icon-Group-1");
               controlArrow=true;
           }
         
       } 
   
    //3 点击省 
    // 初始化市可点击
    var cityClick=false;   
    // 初始化区可点击
    var districtClick=false; 
    // 初始化市级数据存在
    // var isCityData=true;
    // 初始化区级数据存在
    // var isDistrictData=true;  
    // 初始化省级选中的值
    var selectProvinceData=true; 
    var selectCityData=true;

    var provinceName=null;
    // 1 点击省之后  cityClick=true;

    // 2 市级数据条数不为空，isCityData=fasle;


    $("#threeAction").on("click","#province",function(e){

          //改变省级箭头指向
          if(!$(".city").find(".arrow").hasClass("icon-Group-1")){
            //TODO
            // changeArrow("#city"); 
           $(".city").find(".arrow").addClass("icon-Group-1").removeClass("icon-Group-");
       
            
        }
        //改变区级箭头
        if(!$(".district").find(".arrow").hasClass("icon-Group-1")){
            //TODO
            // changeArrow("#district"); 
            $(".district").find(".arrow").addClass("icon-Group-1").removeClass("icon-Group-");
        }

        cityClick=false;
        $(".province").find(".content-area").text("请选择所在省");
        e.stopPropagation();
           //  隐藏市和区列表
        
        $(".districtList").addClass("hideDiv");
        $(".cityList").addClass("hideDiv");
           // 清空市级选中项和市级列表
           $(".city").find(".content-area").text("请选择所在市");
           $(".cityList ul").html("");
           // 清空区级选中项和区级列表
           $(".districtList ul").html("");
           $(".district").find(".content-area").text("请选择所在区");
        //改变箭头指向
        changeArrow(this); 
        // 储存点击的对象
        provinceName=$(this).data("name");
        
        
        

    })

    //省级列表 选中赋值
    $(".provinceList").on("click",".option-list",function(e){
        e.stopPropagation();
     
        //获取点击的值
        var getClickVal=$(this).text();
        // 赋值给点击省市区
        $(".province").find(".content-area").text(getClickVal);
    
        // 隐藏显示列表
        $(".provinceList").addClass("hideDiv");
        // 内容显示
        $("#content").removeClass("hideDiv");
        // 更换省箭头
        $(".province").find(".arrow").removeClass("icon-Group-").addClass("icon-Group-1");
        // 3-1发送请求，获取市级数据  TODO
        var code=$(this).data("parentid");
        // 用于判断是否点击了省按钮  点击省之后，可以获取市级数据
         //点击省之后，使得市可点击==必须在这里
         cityClick=true;
         districtClick=false;

        if(cityClick){
            getCityData(code);
        }
        // 发送请求获取网点查询数据
        getDotQuerry(code,0);
        // 选取成功后
        controlArrow=true;
       
    })
    // 获取市级数据
    function getCityData(data){


        POST({
            url: threeAction,
            data: {
                     parentId:data
            },
            success:function(){
                if("0"==data.code){
                    //渲染市级 
                    renderCityList(data.data);
                       
                   }else{
        
                       console.log(data);
        
                   }
            },
            error:function (data) {
                if("0"==data.code){
                 //渲染市级 
                 renderCityList(data.data);
                    
                }else{
     
                    console.log(data);
     
                }
                
               }
        })
    }
   // 渲染市级列表
   function renderCityList(msg){
         $(".cityList ul").html("");

        if("[object Array]"!=Object.prototype.toString.call(msg)){
            console.log("数据不是数组")
            return
        }
        
        // if(0==msg.length){
        //     //没有数据市级不可点击
        //     isCityData=false;
        //     return 
        // }else{
        //     isCityData=true;
        // }
        //数据为空，则为空数组
        msg=msg || [];
        // 如果为空数组的话，则返回,如果省份没有则不显示选择列表
        if(0==msg.length){
            return 
        }
        var temp="";
        msg.forEach(function(item,index){
            temp+='<li class="option-list" data-parentid='+item.code+'>'+item.name+'</li>';
        });  
        //渲染
        $(".cityList ul").html(temp);
   }

    var cityName=null;
    
   //点击市 展开市级列表 
   $(".city").on("click",function(e){
         e.stopPropagation();
        //  隐藏市和区列表
        $(".districtList").addClass("hideDiv");
        $(".provinceList").addClass("hideDiv");
        //改变省级箭头指向
        if(!$(".province").find(".arrow").hasClass("icon-Group-1")){
            //TODO
            // changeArrow("#province"); 
        $(".province").find(".arrow").addClass("icon-Group-1").removeClass("icon-Group-");
                    
            
        }
        //改变区级箭头
        if(!$(".district").find(".arrow").hasClass("icon-Group-1")){
            //TODO
            // changeArrow("#district"); 
        $(".district").find(".arrow").addClass("icon-Group-1").removeClass("icon-Group-");
            
        }

         //判断选中的值是否为空
         if($(".province").find(".content-area").text()=="请选择省份"){
            selectProvinceData=false;
        }else if($(".province").find(".content-area").text()==""){
            selectProvinceData=false;
        }else{
            selectProvinceData=true;
        }
       //点击省之后，市可以点击
       if(cityClick  && selectProvinceData){
            // 清空区级选中项和区级列表
            // $("#content").html("");
            $(".districtList ul").html("");
            $(".district").find(".content-area").text("请选择所在区");
        
             //显示市级列表
            $(".cityList").removeClass("hideDiv");
            
            // 市级列表选中 赋值
            cityName=$(this).data("name");
           // 更换箭头
            changCityArrow(this);
          
       }
       

   })
   //市级列表选中赋值
   $(".cityList").on("click",".option-list",function(e){
    e.stopPropagation();
    
    //获取点击的值
    var getClickVal=$(this).text();
    // 赋值给点击省市区
    $(".city").find(".content-area").text(getClickVal);
    // 隐藏显示列表
    $(".cityList").addClass("hideDiv");
    // 内容显示
    $("#content").removeClass("hideDiv");
    // 更换省箭头
    $(".city").find(".arrow").removeClass("icon-Group-").addClass("icon-Group-1");
    // 3-1发送请求，获取区级数据  TODO
    var code=$(this).data("parentid");

    getDistrictData(code);
    // 发送请求获取网点查询数据
    getDotQuerry(code,1);
    // 选取成功后
    controlArrow=true;
    //点击过市后，初始化区可点击
    districtClick=true;

    // 让箭头默认向下
    cityArrowFlag=true;
})

//改变市级箭头  TODO
var cityArrowFlag=true;
function changCityArrow(that){
    if(cityArrowFlag){
        //改变箭头指向
       $(that).find(".arrow").removeClass("icon-Group-1").addClass("icon-Group-");
       //重复点击
       cityArrowFlag=false;
    }else{
        $(that).find(".arrow").removeClass("icon-Group-").addClass("icon-Group-1");
       controlArrow=true; 
    }

}


// 获取区级数据
function getDistrictData(data){


      POST({
        url: threeAction,
        data: {
            parentId:data
        },
        success:function (data) {
            if("0"==data.code){
             //渲染区级 
             renderDistrictList(data.data);
                
            }else{
     
                console.log(data);
     
            }
            
           },
           error:function (data) {

            console.log(data);
   
         }
      })

}
//渲染区级数据
function renderDistrictList(msg){
    $(".districtList ul").html("");
    if("[object Array]"!=Object.prototype.toString.call(msg)){
        console.log("数据不是数组")
        return
    }
    //数据为空，则为空数组
    msg=msg || [];
    // 如果为空数组的话，则返回,如果省份没有则不显示选择列表
    if(0==msg.length){
        return 
    }
    var temp="";
    msg.forEach(function(item,index){
        temp+='<li class="option-list" data-parentid='+item.code+'>'+item.name+'</li>';
    });  
    //渲染
    $(".districtList ul").html(temp);
}
// 点击区 显示列表
    var districtName=null;
    
   //点击区 展开区级列表
   $(".district").on("click",function(e){
    e.stopPropagation();
      //改变省级箭头指向
      if(!$(".province").find(".arrow").hasClass("icon-Group-1")){
        //TODO
        // changeArrow("#province"); 
        $(".province").find(".arrow").addClass("icon-Group-1").removeClass("icon-Group-");
    }
    //改变市级箭头
    if(!$(".city").find(".arrow").hasClass("icon-Group-1")){
        //TODO
        $(".city").find(".arrow").addClass("icon-Group-1").removeClass("icon-Group-");
        // changeArrow("#city"); 
    }


     //判断选中的值是否为空
     if($(".city").find(".content-area").text()=="请选择省份"){
        selectCityData=false;
    }else if($(".city").find(".content-area").text()==""){
        selectCityData=fasle;
    }else{
        selectCityData=true;
    }

    if(cityClick && districtClick && selectCityData){
        //改变区级箭头
        changDistrictArrow(this);
         //显示区级列表
         $(".districtList").removeClass("hideDiv");
     
         // 市级列表选中 赋值
         districtName=$(this).data("name");
    }
    
   })


       //区级列表 选中赋值
       $(".districtList").on("click",".option-list",function(e){
        e.stopPropagation();
        //获取点击的值
        var getClickVal=$(this).text();
        // 赋值给点击省市区
        $(".district").find(".content-area").text(getClickVal);
        // 隐藏显示列表
        $(".districtList").addClass("hideDiv");
        // 内容显示
        $("#content").removeClass("hideDiv");
        // 更换省箭头
        $(".district").find(".arrow").removeClass("icon-Group-").addClass("icon-Group-1");
        // 3-1发送请求，获取市级数据  TODO
        var code=$(this).data("parentid");
        // 发送请求获取网点查询数据
        getDotQuerry(code,2);
        // 选取成功后
        controlArrow=true;
       // TODO
        districtArrowFlag=true;
        cityArrowFlag=true;
    })

        //改变区级箭头  TODO
    var districtArrowFlag=true;
    function changDistrictArrow(that){
        if(districtArrowFlag){
            //改变箭头指向
        $(that).find(".arrow").removeClass("icon-Group-1").addClass("icon-Group-");
        //重复点击
        districtArrowFlag=false;
        }else{
            $(that).find(".arrow").removeClass("icon-Group-").addClass("icon-Group-1");
            districtArrowFlag=true; 
        }

    }


    // //5获取网点信息查询
    function getDotQuerry(msg,num){
          POST({
            url: dotget,
            data: {
                adressCode:msg,
                level:num
                
            },
            success:function (data) {
                if("0"==data.code){
                //获取数据成功TODO
                renderDotList(data.data)
                }else{
                    console.log(data);
                }
                
               },
            error:function (data) {
                console.log(data);
             }
          })
        

    }
    //渲染网点查询列表
    function renderDotList(msg){
        $("#content").html("");
        if("[object Array]"!=Object.prototype.toString.call(msg)){
            console.log("数据不是数组")
            return
        }
        //数据为空，则为空数组
        msg=msg || [];
        // 如果为空数组的话，则返回
        if(0==msg.length){
            return 
        }
        var temp="";
        msg.forEach(function(item,index){
             temp+=' <div class="content-shop">'
             +'<div class="content-shop-container">'
                   +'<p class="content-shop-title">'   
                        +'<span class="content-shop-line"></span>'
                        +'<span class="content-shop-name">'+item.networkName+'</span>'
                   +'</p>'
                     
                 +'<div class="content-shop-time content-shop-introduce">'
                    +'<span>营业时间:</span>' 
                     +'<span class="key-val">'+item.workTime+'</span>'
                 +'</div>'
                 +'<div class="content-shop-range content-shop-introduce">'
                     +'<span>服务范围:</span>'
                     +'<span class="key-val">'+item.serviceScope+'</span>'
                 +'</div>'
                 +'<div class="content-shop-icon content-shop-introduce">'
                     +'<span>周围地标:</span>'
                     +'<span class="key-val">'+item.networkMark+'</span>'
                 +'</div>'
                 +'<div class="content-shop-address">'
                     +'<div class="icon-box-common">'
                         +'<span class="address-icon common-icon"></span>'
                         +'<span class="address-insurance">'+item.networkAddress+'</span>'
                     +'</div>'
                     +'<span class="iconfont icon-you"></span>'
                +' </div>'
                 +'<div class="content-shop-phone">'
                    +' <div class="icon-box-common">'
                        +' <span class="phone-icon common-icon"></span>'
                         +'<span>'+item.mobile+'</span>'
                     +'</div>'
                     +'<span class="iconfont icon-you"></span>'
                 +'</div>'
             +'</div>'
         +'</div></li>'
        });  

        $("#content").html(temp);
    }
    // //点击地址，调用微信地图api接口
    // $(".address-insurance").on("click",function(e){
        
    // })

//1 点击省之后，直接点击市，出现bug.
//2 第二次 选择省之后，再点击市，出现bug

})