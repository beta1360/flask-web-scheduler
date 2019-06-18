$(document).ready(function(){
    $(function(){
        $('#loginOK').click(function(){
            // check log in logic
            var id = $('#loginID').val();
            var pwd = $('#loginPwd').val();

            if(id.length == 0 || pwd.length == 0)
                alert("Please input user id or password in this boxes.");

            else {
                var status_code;
                var message;

                $.ajax({
                    type:'POST'
                    , cache: false
                    , url:"http://localhost:8000/api/login"
                    , data: JSON.stringify({
                        user_id: id,
                        user_pw: pwd
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

                if(status_code == 200) {
                    alert(message);
                    initLogInForm();
                    location.replace("http://localhost:8000/main");
                } else if(status_code == 601)
                    alert(message);
                else
                    alert("Error...");
            }
        });
    });
})

function initLogInForm(){
    $('#loginID').val('');
    $('#loginPwd').val('');
    $('#logInModal').modal('hide');
}