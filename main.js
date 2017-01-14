$(document).ready(function(){

    $("#demobox").miniBox({"add":new miniBoxItem({
        "mini_icon":"http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png",
        "color":"#FFFFFF",
        "link": "http://google.de"
    })});

    $("#demobox").miniBox({"add":new miniBoxItem({
        "color":"#470198",
        "link": "http://yahoo.com",
        "text":"Y",
        "text_color":"#FFFFFF"
    })});

    $("#demobox").miniBox({"add":new miniBoxItem()});
    $("#demobox").miniBox({"add":new miniBoxItem()});
    $("#demobox").miniBox({"add":new miniBoxItem()});
    $("#demobox").miniBox({"add":new miniBoxItem()});
    $("#demobox").miniBox({"add":new miniBoxItem()});
    $("#demobox").miniBox("draw");

    $("#foo").bind("click", function(){

        $("#demobox").miniBox({"add":new miniBoxItem()});
        $("#demobox").miniBox("redraw");
    });

});