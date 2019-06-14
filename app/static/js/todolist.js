$(document).ready(function(){
    $(function(){
        $.ajax({
            type: "GET"
            , cache: false
            , url:"http://localhost:8000/todo/iist?id="+{{user_id}}
            , data: "json"
            , success: function(data){
                var domView = "";
                var todoList = data.todos;

                if(todoList.length == 0){
                    domView = "Empty list"
                } else {
                    for(var i=0; i<todoList.length; ++i){
                        todo = JSON.parse(todoList[i]);

                        domView += "<tr>";
                        domView += "<th>" + todo["no"] + "</th>";
                        domView += "<th>" + todo["title"] + "</th>";
                        domView += "<th>" + todo["name"] + "</th>";
                        domView += "<th>" + get_date(todo["date_y"], date["date_m"], date["date_d"]) + "</th>";
                        domView += "<th>" + todo["level"] + "</th>";
                        domView += "</tr>";
                    }

                    document.getElementById("todoList").innerHTML = domView;
                }
            }
            , error: function(){

            }
        }
    })
}
function get_date(year, month, day){
    var date = "" + year + ".";

    if(month < 10)
        date += "0"
    date += month + ".";

    if(day < 10)
        date += "0";
    date += day;

    return date;
}