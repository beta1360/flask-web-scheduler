function getTodoTable(user){
    $.ajax({
        type: "GET"
        , url:"http://localhost:8000/todo/list?id="+ user
        , dataType: "json"
        //, async: false
        , success: function(data){
            var domView = "";
            var todoList = data.todos;

            if(todoList.length == 0){
                domView = "Empty list"
            } else {
                for(var i=0; i<todoList.length; ++i){
                    todo = todoList[i];

                    domView += "<tr onclick='getDetailTodo("+ todo["no"]+")'>";
                    domView += "<th>" + todo["no"] + "</th>";
                    domView += "<th>" + todo["title"] + "</th>";
                    domView += "<th>" + todo["name"] + "</th>";
                    domView += "<th>" + getDate(todo["date_y"], todo["date_m"], todo["date_d"]) + "</th>";
                    domView += "<th>" + todo["level"] + "</th>";
                    domView += "</tr>";
                }

                document.getElementById("todoList").innerHTML = domView;
            }
        }
        , error: function(){

        }
    });

    $('#addTodo').click(function(){
        var level;

        $('#writeTodoModal').modal('show');

        $(function() {
            $("#writeDatePicker").datepicker({
                dateFormat: "yy.mm.dd"
            });
        });

        $('#levelBtn button').on('click', function() {
            var thisBtn = $(this);

            thisBtn.addClass('active').siblings().removeClass('active');
            level = thisBtn.val();
        });

        $('#writeTodo').click(function(){
            addTodoForm(level);
        });

        $('#writeTodoClose').click(function(){
            if(confirm('Do you want to delete todo that you are writing?')){
                initAddTodoForm();
                $('#writeTodoModal').modal('hide');
            }
        });
    });
}

function getDate(year, month, day){
    var date = "" + year + ".";

    if(month < 10)
        date += "0"
    date += month + ".";

    if(day < 10)
        date += "0";
    date += day;

    return date;
}

function getDetailTodo(no){
    $.ajax({
        type: "GET"
        , url: "http://localhost:8000/todo/component?no=" + no
        , dataType: "JSON"
        , success: function(data){
            $('#detailTodoModal').modal('show');

            document.getElementById('todoTitle').innerHTML = data.title;
            document.getElementById('todoName').innerHTML = data.name;
            document.getElementById('todoDate').innerHTML = getDate(data.date_y, data.date_m, data.date_d);
            document.getElementById('todoBody').innerHTML = data.body;
        }
        , error: function(){

        }
    })
}

function addTodoForm(level){
    var title = $("#writeTodoTitle").val();
    var date = parseDate($("#writeDatePicker").val());
    var body = $('#writeTodoBody').val();

    var date_y = Number(date['date_y']);
    var date_m = Number(date['date_m']);
    var date_d = Number(date['date_d']);

    alert(title);

    $.ajax({
        type: "POST"
        , url: "http://localhost:8000/todo/add"
        , contentType : 'application/json; charset=utf-8'
        , async: false
        , cache: false
        , data: JSON.stringify({
            title: title,
            body: body,
            date_y: date_y,
            date_m: date_m,
            date_d: date_d,
            level: Number(level)
        })
        , dataType: "json"
        , success: function(data){
            alert("Success to regist todo!");
            initAddTodoForm();
            $('#detailTodoModal').modal('hide');
            location.reload();
        }
        , error: function(data){
            alert("Server error...");
        }
    })
}

function initAddTodoForm(){
    $("writeTodoName").val('');
    $("#writeDatePicker").val('');
    $('#writeTodoBody').val('');
}

function parseDate(date){
    var parsedDate = Array();

    parsedDate['date_y'] = Number(date.substring(0, 4));
    parsedDate['date_m'] = Number(date.substring(5, 7));
    parsedDate['date_d'] = Number(date.substring(8, 10));

    return parsedDate;
}