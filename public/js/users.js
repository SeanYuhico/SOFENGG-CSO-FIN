$(document).ready(() => {
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").removeAttr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").removeAttr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").attr('class', 'active')

    let key, userEl, toggle = false;
    

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

    $(".orgsDelete").click(function() {
        key = $(this).parent().parent().data('id');
    })

    $("#editSheetBtn").click(function(e){
        e.preventDefault();
        console.log("#editSheetBtn");
        let sheetValue = $("#newSheet").val();
        console.log("sheetValue: " + sheetValue);
        if (sheetValue) {
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
                    //place db shit here
                }
            });
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
        let valid = true;

        // insert code for validation
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