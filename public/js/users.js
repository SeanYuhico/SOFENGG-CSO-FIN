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
        //console.log("userel: " + userEl);
        let emailEl = userEl.querySelector('.td-email');
        
        document.getElementById("modal-title").textContent = key;
        document.getElementById("currentEmail").value = emailEl.textContent;
    });
    
})