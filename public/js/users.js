$(document).ready(() => {
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").removeAttr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").removeAttr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").attr('class', 'active')

    let key, userEl;
    

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
    
})