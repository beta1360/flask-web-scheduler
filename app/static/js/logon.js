$(document).ready(function(){
    $(function(){
        $('#checkID').click(function(){
            var id = $('#ID').val();
            var status_code;
            var message;

            $.ajax({
                type:'POST'
                , cache: false
                , url:"http://localhost:8000/user/check"
                , data: JSON.stringify({
                    user_id: id
                })
                , async: false
                , contentType : 'application/json; charset=utf-8'
                , dataType: 'json'
                , success: function(data){
                    status_code = data.code;
                    message = data.message;
                }, error: function(data){
                    status_code = -1;
                }
            });

            if(status_code == 600)
                alert(message);
            else if(status_code == 200)
                alert(message);
            else if(status_code == -1)
                alert("Error! Please check your network settings.");
            else
                alert("Script error.");
        })
    });
})

$(document).ready(function(){
    $(function(){
        $('#signup_ok').click(function(){
            var user_id = $('#ID').val();
            var pw = $('#pwd').val();
            var cpw = $('#cpwd').val();
            var user_name = $('#name').val();
            var user_rank = $('#rank').val();
            var status_code;
            var message;

            if(pw == cpw){
                $.ajax({
                    type:"POST"
                    , url:"http://localhost:8000/user/add"
                    , cache: false
                    , data: JSON.stringify({
                        id: user_id,
                        password: pw,
                        name: user_name,
                        rank: user_rank
                    })
                    , contentType : 'application/json; charset=utf-8'
                    , dataType:"json"
                    , async: false
                    , success: function(data){
                        message = data.message;
                        status_code = data.code;
                    }
                    , error: function(xnh, status, error){
                        status_code = -1;
                    }
                });

                if(status_code == 200){
                    alert(message);
                    initSignUpForm();
                } else if(status_code == 600)
                    alert(message);
                else
                    alert("Hmm.. Error status in server.");
            }
            else
                alert("Two password is different..\nPlease check them.");
        })
    });
})

function initSignUpForm(){
    $("#ID").val('');
    $("#pwd").val('');
    $("#cpwd").val('');
    $("#name").val('');
    $("#rank").val('');
    $('#signupModal').modal('hide');
}