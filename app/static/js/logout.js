$(document).ready(function(){
    $('#logoutBtn').click(function(){
        var isLogout = confirm("Do you want to logout?");

        if(isLogout){
            $.ajax({
                type: "POST"
                , cache: false
                , url:"http://localhost:13609/api/logout"
                , async: false
                , success: function(data){
                    alert("Complete to logout.");
                    location.replace("http://localhost:13609/");
                }, error: function(data){
                    alert("Server error");
                }
            });
        }
    });
})