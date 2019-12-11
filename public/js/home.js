$(document).ready(()=>{
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").attr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").removeAttr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").removeAttr('class', 'active')

    $("#createCard").click(function (e) {
        e.preventDefault();
        let title = $("#createTitle").val();
        let desc = $("#createDesc").val();
        let link = $("#createLink").val();

        $.ajax({
            url: "createCard",
            method: "POST",
            data: {
                title: title,
                desc: desc,
                link: link
            },
            success: function(result) {
                console.log(result)
                if (result.message === "SUCCESS") {
                    location.reload();
                } else {
                }

            }
        });
        

    });
})
