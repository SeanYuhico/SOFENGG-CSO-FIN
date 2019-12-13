$(document).ready(()=>{
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").attr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").removeAttr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").removeAttr('class', 'active')

    let key;

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
                    console.log("wow it's a success")
                    setTimeout(
                        function() 
                        {
                           location.reload();
                        }, 2000);   
                } else {
                }
            }
        });
        

    });
    
    
    $(".editCard").click(function (e) {
        e.preventDefault();

        key = $(".editCard").attr("data-id");
        $("#inputEditTitle").val()
        $("#inputEditDescription").val
        $("#inputEditLink").val

    });

    $(".deleteCard").click(function (e) {
        e.preventDefault();
        key = $(".editCard").attr("data-id");
    });
    
    $("#deleteYesBtn").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: "deleteCard",
            method: "DELETE",
            data: {
                key: key
            },
            success: function(result) {
                console.log(result)
                if (result.message === "SUCCESS") {
                    console.log("wow it's a success")
                    setTimeout(
                        function() 
                        {
                           location.reload();
                        }, 2000);   
                    // close modal
                } else {
                }
            }
        });
        

    });
})
