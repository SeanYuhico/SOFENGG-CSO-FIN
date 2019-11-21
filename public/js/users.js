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
                    $("#responseModal div .modal-body").textContent == "The new password for " + key + "is " + result.password + ".";
                } else {
                    $("#responseModal div .modal-body").textContent == "Password failed to reset.";
                }

                toggle = false;
                // open view where new password will show
                // location.reload(true);
            }
        });
    });
    
})