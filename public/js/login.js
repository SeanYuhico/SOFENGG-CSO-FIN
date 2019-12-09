$(document).ready(()=>{
    $("#btn-login").on('click', function(){
        $("#loginOrgName").removeAttr("style", "box-shadow:2px 2px red;");
        $("#loginEmail").removeAttr("style", "box-shadow:2px 2px red;");
        $("#loginPassword").removeAttr("style", "box-shadow:2px 2px red;");

        let org = "";
        org = $("#loginOrgName").val();
        let em = "";
        em = $("#loginEmail").val();
        let pw = "";
        pw = $("#loginPassword").val();

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
                        $.ajax({
                            url: "home",
                            method: "GET",
                            data: {},
                            success: function(result){
                                window.location = "/home";
                            }
                        })
                    }else if(result === "PASSWORD"){
                        if($(".loginError").length == 0){
                            $(".logInErrorMessage").append("<label class='loginError' style='color: green;'>No Password is detected in the database. Generated a new password. Please login again.</label>");
                        }else{
                            $(".logInErrorMessage .loginError").remove();
                            $(".logInErrorMessage").append("<label class='loginError' style='color: green;'>No Password is detected in the database. Generated a new password. Please login again.</label>");
                        }
                    }else{
                        if($(".loginError").length == 0){
                            $(".logInErrorMessage").append("<label class='loginError' >Wrong Username or Password</label>");
                        }else{
                            $(".logInErrorMessage .loginError").remove();
                            $(".logInErrorMessage").append("<label class='loginError' >Wrong Username or Password</label>");
                        }
                    }
                }
            });
        }else{
            if(org == "" && em == "" && pw == ""){
                $("#loginOrgName").attr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").attr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").attr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Fields cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Fields cannot be empty</label>");
                }

            }else if(org == "" && em == ""){
                $("#loginOrgName").attr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").attr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").removeAttr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Organization & Email cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Organization & Email cannot be empty</label>");
                }

            }else if(org == "" && pw == ""){
                $("#loginOrgName").attr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").removeAttr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").attr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Organization & Password cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Organization &  Password cannot be empty</label>");
                }


            }else if(em == "" && pw == ""){
                $("#loginOrgName").removeAttr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").attr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").attr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Email & Password cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Email &  Password cannot be empty</label>");
                }

            }else if(org == ""){
                $("#loginOrgName").attr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").removeAttr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").removeAttr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Organization cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Organization cannot be empty</label>");
                }

            }else if(em == ""){
                $("#loginOrgName").removeAttr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").attr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").removeAttr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Email cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Email cannot be empty</label>");
                }

            }else if(pw == ""){
                $("#loginOrgName").removeAttr("style", "box-shadow:2px 2px red;");
                $("#loginEmail").removeAttr("style", "box-shadow:2px 2px red;");
                $("#loginPassword").attr("style", "box-shadow:2px 2px red;");

                if($(".loginError").length == 0){
                    $(".logInErrorMessage").append("<label class='loginError' >Password cannot be empty</label>");
                }else{
                    $(".logInErrorMessage .loginError").remove();
                    $(".logInErrorMessage").append("<label class='loginError' >Password cannot be empty</label>");
                }
            }
        }
    });
})