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
    });

    $("#createAnnouncementButton").click ((e) => {
        e.preventDefault();

        console.log("wow crate announcemdent")

        let atitle = $("#announcementTitle").val();
        let abody = $("#announcementBody").val();

        console.log(atitle);
        console.log(abody)

        if (atitle !== null && abody !== null) {
            $.ajax({
                url: "createAnnouncement",
                method: "POST",
                data: {
                    title: atitle,
                    body: abody
                },
                success: function(result) {
                    console.log(result)
                    if (result.message === "SUCCESS") {
                        $("#announcementTitle").val("");
                        $("#announcementBody").val("");
                        location.reload(true);
                        // action when successfully saved to db
                    } else {
                        // action when unsaved
                    }

                }
            });
        }
    })
    
})
