$(document).ready(() => {
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").removeAttr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").removeAttr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").attr('class', 'active')

    let key, userEl, toggle = false;
    console.log("game time started")
    
    // opens the modal
    $(".orgsEdit").click(function(){
        key = $(this).parent().parent().data('id');
        //console.log("key: " + key);
        userEl = document.querySelectorAll('[data-id="' + key + '"]')[0];
        console.log("userel: " + userEl);
        let emailEl = userEl.querySelector('.td-email');
        console.log("emailEl: " + emailEl);
        console.log("content: " + emailEl.textContent);
        document.getElementById("modal-title").textContent = key;
        document.getElementById("currentEmail").value = emailEl.textContent;
    });

    // sets the key for the delete
    $(".orgsDelete").click(function() {
        key = $(this).parent().parent().data('id');
    })

    // This is where the ajax to edit the sheet is callewed
    $("#editSheetBtn").click(function(e){
        e.preventDefault();
        console.log("#editSheetBtn");
        let sheetValue = $("#newSheet").val();
        console.log("sheetValue: " + sheetValue);

        // if sheet value is empty
        if (sheetValue) {
            let valid = true;
            // validation
            // check if the sheet is a valid sheet
            // example:
            // https://docs.google.com/spreadsheets/d/1-Ssmq_WoEBzy2-3lYCbZtaxgZOnXztAOh5vgSxPRLvw/edit?ts=5dd34cc3#gid=794750413
            // https://docs.google.com/spreadsheets/d/18iBBzEjOEr_fc8-hRnbn1fWAhdFMFGoRVg6JdDYK3pE/edit?ts=5dcf9c0d#gid=362559981
            // remove the  https://docs.google.com/spreadsheets/d/ at the start 
            // ignore everything starting from "/edit"
            // what remains should be 1-Ssmq_WoEBzy2-3lYCbZtaxgZOnXztAOh5vgSxPRLvw

            if (valid) {
                $.ajax({
                    url: "editSheet",
                    method: "POST",
                    data:{
                        org: key,
                        sheetKey: sheetValue
                    }, 
                    success: function(result){
                        console.log("here?");
                        setTimeout(function() {
                            location.reload(true);
                        }, 2000);  
                        //location.reload(true);
                        //place db stuff here
                    }
                });
            } else {
                // display invalid view
            }
        } else {
            // insert warning
            console.log("empty?")
        }
    });

    $("#btncreateUser").click(function (e) {
        e.preventDefault();
        let org = $("#orgName").val().toUpperCase();
        let email = $("#orgEmail").val();
        let password = $("#orgPassword").val();
        let password2 = $("#orgPassword2").val();
        let valid;
        var orgs = [];

        if(org.length!=0&&email.length!=0&&password.length!=0&&password==password2){
         $.ajax({
            url: "getOrgs",
            method: "GET",
            dataType: "json",
            success: function(result){
                console.log("yezz");
                console.log("message" + result.message)
                console.log(result);
                if (result.message === "SUCCESS") {
                    console.log(result.orgs);
                    orgs = result.orgs;
                } else {
                    console.log("wasnt able to retrieve orgs")
                    return null;
                }
            },async:false
        });

            for(var i = 0; i<orgs.length;i++){
                if(org==orgs[i]){
                    console.log("MERON NA");
                    valid=false;
                    $("#responseBody").text("The Organization Name That You Have Entered Already Exists.");
                    break;
                }
                else{console.log("WALA PA");
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                    console.log("VALID EMAIL ADDRESS");
                    valid=true;
                }else{
                    console.log("INNNNNNVALID EMAIL ADDRESS");
                    $("#responseBody").text("The Email That You Have Entered is Invalid.");
                }
                }
            }   
        }
        else{
            valid=false;
            $("#responseBody").text("Please Enter Valid Credentials and Make Sure that the Passwords you Entered Match.");
        }
        //Final Creation of Account
        if (valid) {
            $.ajax({
                url: "createUser",
                method: "POST",
                data: {
                    org: org,
                    em: email,
                    pw: password
                },
                success: function(result) {
                    console.log(result)
                    if (result.message === "SUCCESS") {
                        $("#responseBody").text("User Created Successfully.");
                        setTimeout(location.reload.bind(location), 1100);
                    } else {
                        $("#responseBody").text("Failed to create user.");
                    }

                }
            });
        }

    });

    $("#resetBtn").click(function(e){
        e.preventDefault();
        console.log("#resetBtn");
        let email = $("#currentEmail").val();
        
        $.ajax({
            url: "resetPw",
            method: "POST",
            data:{
                org: key,
                em: email
            }, 
            success: function(result){
                console.log("yezz");
                
                console.log(result);
                if (result.message === "SUCCESS") {
                    console.log("woo");
                    $("#responseBody").text("The new password for " + key + " is " + result.password + ".");
                } else {
                    console.log("boo");
                    $("#responseBody").text("Password failed to reset.");
                }

                toggle = false;
                // open view where new password will show
                // location.reload(true);
            }
        });
    });

    
    $("#editEmailBtn").click(function(e){
        e.preventDefault();
        console.log("#editEmailBtn");
        let email = $("#newEmailAddress").val();
        let valid;

        // insert code for validation        
        // check if it's a legitimate email string
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            console.log("VALID EMAIL ADDRESS");
            valid=true;
        }else{
            console.log("INNNNNNVALID EMAIL ADDRESS");
            $("#responseBody2").text("The Email That You Have Entered is Invalid.");
        }


        if (valid === true) {
            $.ajax({
                url: "editEm",
                method: "POST",
                data:{
                    org: key,
                    em: email
                }, 
                success: function(result){
                    console.log("yezz");
                    
                    console.log(result);
                    if (result.message === "SUCCESS") {
                        console.log("woo");
                        $("#responseBody2").text("Your email is now " + email + "!");
                        setTimeout(function() {
                            location.reload(true);
                        }, 2000);  
                    } else {
                        console.log("boo");
                        $("#responseBody2").text("Failed to edit email.");
                    }

                    toggle = false;
                    // open view where new password will show
                    // location.reload(true);
                }
            });
        } else {
            // insert failed validation response
        }
    });


    $("#btndeleteUser").click(function(e) {
        e.preventDefault();
        console.log("DELETE " + key);
        $.ajax({
            url: "deleteUser",
            method: "DELETE",
            data:{
                org: key
            }, 
            success: function(result){
                console.log("here?");
                console.log("result: " + result);
                console.log(result);
                if (result.message === "SUCCESS") {
                    console.log(result.org)
                    setTimeout(function() {
                        location.reload(true);
                    }, 2000);  
                } else {
                    console.log("boo");
                }
            }
        });
    })
    
})