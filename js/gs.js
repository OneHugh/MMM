$(function() {

    var isShopOpened = false;
    var isAreaOpened = false;

    $(".shop").click(function() {

        if (isShopOpened) {
            closeShopContent();
        } else {
            openShopContent();
        }
        return false;

    });

    $(".area").click(function() {
        if (isAreaOpened) {
            closeAreaContent();
        } else {
            openAreaContent();
        }
        return false;
    });




    var clickedShopId = 0;
    var clickedAreaId = 0;


    $.ajax({
        url: "http://127.0.0.1:3000/api/getgsshop",
        dataType: "json",
        success: function(data) {
            var shopHtml = template("shop-content-template", data);
            $(".shop-content").html(shopHtml);

            $(".shop-content > a").click(function() {
                $(".shop-content > a").removeClass("haha");
                $(this).addClass("haha");


                clickedShopId = this.dataset["shopId"];

                $(".shop").text($(this).text());
                closeShopContent();
                getProductList();

                return false;
            });


            clickedShopId = data.result[0].shopId;
            var firstShopName = data.result[0].shopName;

            $(".shop").text(firstShopName);

            $(".shop-content > a:first-of-type").addClass("haha");

            $.ajax({
                url: "http://127.0.0.1:3000/api/getgsshoparea",
                dataType: "json",
                success: function(data) {
                    var areaHtml = template("area-content-template", data);
                    $(".area-content").html(areaHtml);

                    $(".area-content > a").click(function() {
                        $(".area-content > a").removeClass("haha");
                        $(this).addClass("haha");

                        clickedAreaId = this.dataset["areaId"];
                         $(".area").text($(this).text());
                        closeAreaContent();
                        getProductList();

                        return false;
                    });
                    clickedAreaId = data.result[0].areaId;

                    var firstAreaName = data.result[0].areaName;
                    $(".area").text(firstAreaName);
                    $(".area-content > a:first-of-type").addClass("haha");

                    getProductList();

                }
            });
        }
    });











    function getProductList() {

        $.ajax({
            url: urlPrefix + "/api/getgsproduct",
            dataType: "json",
            data: { shopid: clickedShopId, areaid: clickedAreaId },
            success: function(data) {
                console.log(data);
                //将数据和模板结合起来生成html片段，放到product-list里面去
            }
        });
    }












    //高内聚  低耦合
    function openShopContent() {
        closeAreaContent();
        $(".shop-content").css({
            display: "block"
        });
        $(".shop").addClass("opened");
        isShopOpened = true;
    }

    function closeShopContent() {
        $(".shop-content").css({
            display: "none"
        });
        $(".shop").removeClass("opened");
        isShopOpened = false;
    }

    function openAreaContent() {
        closeShopContent();
        $(".area-content").css({
            display: "block"
        });
        $(".area").addClass("opened");
        isAreaOpened = true;
    }

    function closeAreaContent() {
        $(".area-content").css({
            display: "none"
        });
        $(".area").removeClass("opened");
        isAreaOpened = false;
    }
});