    $(window).on('load', function() {
         $('.loading').delay(1000).fadeOut('200', function() {
           $(this).remove();
         });
         console.log('js222222222222222222');
     });
    $(function() {
      // loading

      var _body = $('body,html');

      // 視差
        $('#scene').parallax({
          invertX: true,
          limitX: false,
          limitY: 0,
        });

        // 跑馬燈
        $('.marquee').marquee({
            pauseOnHover: true,
            //speed in milliseconds of the marquee
            duration: 15000,
            //gap in pixels between the tickers
            gap: 100,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true
        });

        // 瀑布流
      var repeat_n = 0;
      var webdata_n = webdata.length;
      var box_size_n = box_size.length;
      var freewallbox1 = $('.freewallbox1,.freewallbox2');
      var freewallbox2 = $('.freewallbox2');
      // console.log(webdata_n+'d.....s'+box_size.length);

      //如果資料數量　小於　最小全版格子數量
      if( webdata_n < box_size_n){
        //資料重複　塞滿最小全版格子
        $.each(box_size,function(i,item){
           if(repeat_n == webdata_n){
              repeat_n = 0;
            }
            // console.log(i+';'+repeat_n);
            if(webdata[repeat_n].class == 'picbox'){
              freewallbox1.append('<div class="brick '+item+'" item_id="'+ i +'"><span class="pic" style="background-image:url('+webdata[repeat_n].pic_url+');"></span></div>');
            }else if(webdata[repeat_n].class == 'link'){
              freewallbox1.append('<a class="brick '+item+'" item_id="'+ i +'" href="'+webdata[repeat_n].a_href+'" target="_blank"><span class="pic" style="background-image:url('+webdata[repeat_n].pic_url+');"></span></a>');
            }
            repeat_n++;
          });
      }else{
        $.each(webdata,function(i,item){
          if(repeat_n == box_size_n){
            repeat_n = 0;
          }
          // console.log(i+';'+repeat_n);
          if(item.class == 'picbox'){
            freewallbox1.append('<div class="brick '+box_size[repeat_n]+'" item_id="'+ i +'"><span class="pic" style="background-image:url('+item.pic_url+');"></span></div>');
          }else if(item.class == 'link'){
            freewallbox1.append('<a class="brick '+box_size[repeat_n]+'" item_id="'+ i +'" href="'+item.a_href+'" target="_blank"><span class="pic" style="background-image:url('+item.pic_url+');"></span></a>');
          }
          repeat_n++;
        });
        // console.log(repeat_n);
        // if(repeat_n<)
      }
      var freewall_width;

      var wall = new Freewall(".freewallbox1,.freewallbox2");
      wall.reset({
        selector: '.brick',
        cellW: 190,
        cellH: 190,
        gutterY: 2,
        gutterX: 2,
        onResize: function() {
          wall.fitHeight($(window).height() - 140);
        },
        onComplete :function(){
          freewall_width = $('.freewallbox1').attr('data-wall-width');
          console.log(freewall_width);
        }
      });

      // caculator height for IE7;
      wall.fitHeight($(window).height() - 140);
      $(window).trigger("resize");

      // console.log();
        // var $grid = $('.grid').imagesLoaded( function() {
        //   // init Isotope after all images have loaded
        //   $grid.isotope({
        //           layoutMode: 'masonryHorizontal',
        //           itemSelector: '.item',
        //           masonryHorizontal: {
        //             rowHeight: 197,
        //           },
        //          // filter items with odd numbers
        //           filter: function() {
        //             var number = $( this ).attr('item_id');
        //             return parseInt( number, 10 ) ;
        //           },
        //           // sort by number
        //           sortBy: 'number',
        //           getSortData: {
        //             'number': '.number parseInt'
        //           }
        //         });
        // });

        // var str='<div class="item item-height2"><img src="https://c3.staticflickr.com/1/361/19761217962_a3570fe583_c.jpg" /></div>';
        var isOpen = false;
        $('.freewall').on('click','.brick',function(){
          var n = parseInt($(this).attr('item_id'))+1;
          console.log(isOpen);
          console.log(n-1);

          // if (isOpen) {
          //   var remove_item = $('.item-open') ;
          //   $grid.isotope( 'remove', remove_item );
          // } else {
          //   var str='<div class="item item-open" item_id="'+n+'"><span class="number">'+n+'</span><h2>標題標題</h2><p>內文內文內文</p></div>';
          //   console.log(str);
          //   // var $items = getItemElement().add( getItemElement() ).add( getItemElement() );
          //   // // insert new elements
          //  // create new item elements
          //   var $items = $(str);
          //   // insert new elements
          //   $grid.isotope( 'insert', $items );
          // }
          // set flag
          isOpen = !isOpen;


        });

      // 滾動
       var view_x = 0;
       var freewall_x = 0;
       var onright = false;
       var topanddown = $('.rightbox,footer');
       var wrapper = $('.warpper');
       var freewall_wrapper = $('.freewall-wrapper');
      $('body').on('mousewheel', function(e) {
        // console.log(onright);
        console.log('1.'+view_x);
        console.log('2.'+freewall_x);
        console.log(freewall_width-2000);
        if(!onright){
          // console.log('1.'+view_x);
          view_x = view_x + (e.deltaY*-2);
          if(view_x >= 0 && view_x <= 50){
            // 上下進入
            topanddown.removeClass('show');
            wrapper.css({
              'transform': 'translateX('+ -view_x +'%)',
            });
          }else if(view_x < 0){
            view_x = 0;
          }else if(view_x > 50){
            view_x = 50;
            onright = true;
          }
        }else{
          // 上下退出
          topanddown.addClass('show');
          // console.log('2.'+freewall_x);
          freewall_x = freewall_x + (e.deltaY*-100);
          if(freewall_x >= 0 && freewall_x <= freewall_width-2000){
            freewall_wrapper.css({
              'transform': 'translateX('+ -freewall_x +'px)',
            });
          }else if(freewall_x < 0){
            freewall_x = 0;
            onright = false;
          }else if(freewall_x > freewall_width-2000){
            console.log('5555555555555');
            freewall_x = (freewall_width-2000)/100;
          }
        }
      });


    });
