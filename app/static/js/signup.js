$(document).ready(function(){
    $(function(){
        $('#checkID').click(function(){
            alert($('#ID').val());
        })
    });
})

$(document).ready(function(){
    $(function(){
        $('#signup_ok').click(function(){
            var id = $('#ID').val();
            var pw = $('#pwd').val();
            var cpw = $('#cpwd').val();
            var name = $('#name').val();
            var rank = $('#rank').val();

            if(pw == cpw){
                alert(id +'\n'+ pw +'\n' + name +'\n' + rank +'\n');
                initSignUpForm();
            }
            else
                alert("Two password is different..\nPlease check them.");
        })
    });
}

function initSignUpForm(){
    $("#ID").val('');
    $("#pwd").val('');
    $("#cpwd").val('');
    $("#name").val('');
    $("#rank").val('');
    $('#signupModal').modal('hide');
}
