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
                    setTimeout(function() {
                        location.reload(true);
                    }, 2000);   
                } else {
                }
            }
        });
        

    });
    
    
    $(".editCard").click(function (e) {
        e.preventDefault();
        key = $(this).parent().parent().parent().attr("data-id");
        let cardEl = document.querySelectorAll('[data-id="' + key + '"]')[0];
        let titleEl = cardEl.querySelector('.cardTitle');
        let descEl = cardEl.querySelector('.cardDesc');
        $("#inputEditTitle").val(titleEl.textContent);
        $("#inputEditDescription").val(descEl.textContent);
        $("#inputEditLink").val(cardEl.href);
    });

    $(".deleteCard").click(function (e) {
        e.preventDefault();
        key = $(this).parent().parent().parent().attr("data-id");
    });

    $("#saveCardEdit").click(function (e) {
        e.preventDefault();
        let valid = true;

        let title = document.getElementById('inputEditTitle').value
        let description = document.getElementById('inputEditDescription').value
        let link = document.getElementById('inputEditLink').value

        console.log($("#inputEditTitle").val)

        if (title.length === 0 || 
            description.length === 0 || 
            link.length === 0){
            valid = false;
            console.log("empty");
        }

        if (valid) {
            $.ajax({
                url: "editCard",
                method: "POST",
                data: {
                    key: key,
                    title: title,
                    desc: description,
                    link: link
                },
                success: function(result) {
                    console.log(result)
                    if (result.message === "SUCCESS") {
                        console.log("wow it's a success")
                        setTimeout(
                            function() 
                            {
                            location.reload(true);
                            }, 2000);   
                        // close modal
                    } else {
                    }
                }
            });
        }
    })
    
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
