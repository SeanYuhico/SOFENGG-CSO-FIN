$(document).ready(() => {
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").removeAttr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").removeAttr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").attr('class', 'active')

    let key, userEl, toggle = false;
    console.log("game time started")
    console.log(getAllOrgNames());
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
        let valid;
        
        // insert validation 
        // check if inputs are empty
        if(org.length>0&&email.length>0&&password.length>0){
            // check if the org is the same as the others
                valid=true;
        }
        else{
            valid = false;
            $("#responseBody").text("Please enter proper credentials.");
        }
        
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
                        $("#responseBody").text("User created successfully.");
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


    function getAllOrgNames () {
        $.ajax({
            url: "getOrgs",
            method: "GET",
            dataType: "json",
            success: function(result){
                console.log("yezz");
                console.log("message" + result.message)
                console.log(result);
                if (result.message === "SUCCESS") {
                    
                    return result.orgs;
                } else {
                    return null;
                }
            }
        });
    }
    
    
    $("#editEmailBtn").click(function(e){
        e.preventDefault();
        console.log("#editEmailBtn");
        let email = $("#newEmailAddress").val();
        let valid = true;

        // insert code for validation        
        // check if it's a legitimate email string

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
                        $("#responseBody").text("Your email is now " + email + "!");
                        location.reload(true);
                    } else {
                        console.log("boo");
                        $("#responseBody").text("Failed to edit email.");
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
                    location.reload(true);
                } else {
                    console.log("boo");
                }
            }
        });
    })
    
})