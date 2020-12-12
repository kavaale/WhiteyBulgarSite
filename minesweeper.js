$(function () {
    var x = 0;
    var y = 0;
    var i = 0;
    var hint = 0;
    var location = 0;
    var n = 1;
    var gameOn = 1;
    var clearMines = 0;
    var set = []

    while(y < 10){
        y++;
        while(x<10){
            location++;
            $("#grid").append("<div id='"+location+"' class='gridPiece gridClear Tile'>-</div>");
            x++;
            n++;
        }
        $("#grid").append("<br class='gridPiece'>");
        x = 0;
    }
    while(i<20){
        x=0;
        while(i<20&&x<100) {
            if (Math.random()>.9&&$("#"+x).hasClass("gridClear")) {
                $("#"+x).addClass("gridMine").removeClass("gridClear");
                i++;
                console.log(i);
            }
            x++;
        }
    }
    n=20;
    $("#houses").text(n);

    function clickChoice() {
        location = parseInt($(this).attr("id"));
        evalChoice(location);
    }

    function evalChoice(location) {
        if ($("#" + location).hasClass("Flag") == false) {
            hint = 0;
            if ($("#" + location).hasClass("gridMine") && gameOn == 1) {
                $("*.gridMine").addClass("Mine").removeClass("gridMine");
                gameOn = 0;
                $("#houses").remove();
                $("h2").text("You Lose!");
            }
            if ($("#" + location).hasClass("gridClear") && gameOn == 1) {
                $("#" + location).removeClass("Tile").addClass("Empty").removeClass("gridClear");
                set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 31, 41, 51, 61, 71, 81, 91];
                if (set.includes(location) == false) {
                    x = location - 11;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                if (set.includes(location) == false) {
                    x = location - 10;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                if (set.includes(location) == false) {
                    x = location - 9;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
                if (set.includes(location) == false) {
                    x = location - 1;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                if (set.includes(location) == false) {
                    x = location + 1;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
                if (set.includes(location) == false) {
                    x = location + 9;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
                if (set.includes(location) == false) {
                    x = location + 10;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }
                set = [10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
                if (set.includes(location) == false) {
                    x = location + 11;
                    if ($("#" + x).hasClass("gridMine")) {
                        hint++;
                    }
                }

                y = 0
                clearMines = 0;
                while (y < 100) {
                    y++;
                    if ($("#" + y).hasClass("Empty")) {
                        clearMines++;
                    }
                }
                if (clearMines == 80) {
                    gameOn = 0;
                    $("#houses").remove();
                    $("h2").text("You Win!");
                }

                $("#" + location).text(hint);
                if (hint == 0) {
                    set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 31, 41, 51, 61, 71, 81, 91];
                    if (set.includes(location) == false)
                        evalChoice(location - 11);
                    set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    if (set.includes(location) == false)
                        evalChoice(location - 10);
                    set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                    if (set.includes(location) == false)
                        evalChoice(location - 9);
                    set = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
                    if (set.includes(location) == false)
                        evalChoice(location - 1);
                    set = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                    if (set.includes(location) == false)
                        evalChoice(location + 1);
                    set = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
                    if (set.includes(location) == false)
                        evalChoice(location + 9);
                    set = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
                    if (set.includes(location) == false)
                        evalChoice(location + 10);
                    set = [10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
                    if (set.includes(location) == false)
                        evalChoice(location + 11);
                }
            }
        }
    }
    $('*').bind('contextmenu', function(e) {
        e.preventDefault();
        if($(this).hasClass("Tile")&&gameOn==1){
            $(this).removeClass("Tile").addClass("Flag");
            n--;
        }
        else if($(this).hasClass("Flag")&&gameOn==1){
            $(this).removeClass("Flag").addClass("Tile");
            n++;
        }
        if(n>-1) {
            $("#houses").text(n);
        }
    });
    function reloadPage(){
        history.go(0);
    }
    $(".gridPiece").click(clickChoice);
    $("#reload").click(reloadPage)
})