$(document).ready(function(){
    $(function(){
        $('#loginOK').click(function(){
                        // check log in logic

            // if success
            alert("Success to log in!");
            initLogInForm();
            // else
        });
    });
})

function initLogInForm(){
    $('#loginID').val('');
    $('#loginPwd').val('');
    $('#logInModal').modal('hide');
}