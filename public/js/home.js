$(document).ready(()=>{
    $("#btn-logout").on('click', function() {
        $.ajax({
            url: "logout",
            method: "POST",
            success: function(result) {
                window.location = "/"
            }
        })
    })
})
