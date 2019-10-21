$(document).ready(()=>{
    $("#btn-login").on('click', function(){
        let org = $("#loginOrgName").val();
        let em = $("#loginEmail").val();
        let pw = $("#loginPassword").val();

        org = org.toUpperCase();
        org = org.replace(/\s/g, '');

        console.log(em + pw);

        if(org != "" && em != "" && pw != ""){
            $.ajax({
                url: "login",
                method: "POST",
                data: {
                    org:org,
                    em:em,
                    pw:pw
                },
                success: function(result){
                    console.log(result);
                    if(result === "OK"){
                        window.location = "/home"
                    }else if(result === "PASSWORD"){
                        if($(".loginError").length == 0){
                            $(".logInErrorMessage").append("<label class='loginError' style='color: green;'>No Password is detected in the database. Generated a new password. Please login again.</label>");
                        }else{
                            $(".logInErrorMessage .loginError").remove();
                            $(".logInErrorMessage").append("<label class='loginError' style='color: green;'>No Password is detected in the database. Generated a new password. Please login again.</label>");
                        }
                    }else{
                        if($(".loginError").length == 0){
                            $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                        }else{
                            $(".logInErrorMessage .loginError").remove();
                            $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                        }
                    }
                }
            });
        }else{
            if($(".loginError").length == 0){
                $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Fields cannot be Empty</label>");
            }else{
                $(".logInErrorMessage .loginError").remove();
                $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Fields cannot be Empty</label>");
            }
        }
    });
})