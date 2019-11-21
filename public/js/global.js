$(document).ready(() => {
    $("#btn-logout").on('click', function() {
    $.ajax({
            url: "logout",
            method: "POST",
            success: function(result) {
                window.location = "/"
            }
        })
    });
    
    $("#btnupdateInfo").click((e) => {
        e.preventDefault();
        let npw = $("newProfilePassword").val();

        $.ajax({
            url: "editPw",
            method: "POST",
            data: {
                "org": org,
                em: orgEmail,
                pw: npw
            }, 
            success: function(result){
                console.log(result)
                if (result.message === "SUCCESS") {
                    //
                } else {
                    //
                }
            }
        });
    })
    
})
