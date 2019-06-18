var board_no;
var current_title;
var current_body;
var current_date;
var current_level;

function getTodoTable(user){
    $.ajax({
        type: "GET"
        , url:"http://localhost:13609/todo/list?id="+ user
        , dataType: "json"
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
    board_no = no;

    $.ajax({
        type: "GET"
        , url: "http://localhost:13609/todo/component?no=" + no
        , dataType: "JSON"
        , success: function(data){
            date = getDate(data.date_y, data.date_m, data.date_d);
            $('#detailTodoModal').modal('show');

            document.getElementById('todoTitle').innerHTML = data.title;
            document.getElementById('todoName').innerHTML = data.name;
            document.getElementById('todoDate').innerHTML = date;
            document.getElementById('todoBody').innerHTML = data.body;
            document.getElementById('todoLevel').innerHTML = data.level;

            current_title = data.title;
            current_date = date;
            current_body = data.body;
            current_level = data.level;

            $('#todoModify').click(function(){
                getModifyTodoModal();
            });

            $('#todoDelete').click(function(){
                deleteTodo();
            });
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

    $.ajax({
        type: "POST"
        , url: "http://localhost:13609/todo/add"
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

function deleteTodo(){
    if(confirm("Do you want to delete this todo?")){
        $.ajax({
            type: "DELETE"
            , async: false
            , cache: false
            , url: "http://localhost:13609/todo/delete?no=" + board_no
            , dataType: "json"
            , success: function(data){
                alert(data.message);
                location.reload();
            }
            , error: function(data){

            }
        });
    }
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

function getModifyTodoModal(){
    var level;

    $('#detailTodoModal').modal('hide');

    $('#modifyTodoModal').modal('show');

    $('#modifyTodoTitle').val(current_title);
    $('#modifyDatePicker').val(current_date);
    $('#modifyTodoBody').val(current_body);

    $(function() {
        $("#modifyDatePicker").datepicker({
            dateFormat: "yy.mm.dd"
        });
    });

    $('#modifyLevelBtn button').on('click', function(){
        var thisBtn = $(this);

        thisBtn.addClass('active').siblings().removeClass('active');
        level = thisBtn.val();
    });

    $('#modifyTodo').click(function(){
        onClickModifyTodo(level);
    });

    $('#modifyTodoClose').click(function(){
        if(confirm("Do you want to stop to modify todo?"))
            initModifyTodoForm();
    });
}

function onClickModifyTodo(level){
    var title = $('#modifyTodoTitle').val();
    var date = parseDate($('#modifyDatePicker').val());
    var body = $('#modifyTodoBody').val();

    var date_y = Number(date['date_y']);
    var date_m = Number(date['date_m']);
    var date_d = Number(date['date_d']);

    if(confirm('Do you want to modify this todo?')){
        $.ajax({
            type: "POST"
            , url: "http://localhost:13609/todo/modify"
            , contentType : 'application/json; charset=utf-8'
            , async: false
            , cache: false
            , data: JSON.stringify({
                no: Number(board_no),
                title: title,
                body: body,
                date_y: date_y,
                date_m: date_m,
                date_d: date_d,
                level: Number(level)
            })
            , dataType: "json"
            , success: function(data){
                alert(data.message);
                initModifyTodoForm();
                location.reload();
            }
            , error: function(data){

            }
        });
    }
}

function initModifyTodoForm(){
    $('#modifyTodoTitle').val('');
    $('#modifyDatePicker').val('');
    $('#modifyTodoBody').val('');
}