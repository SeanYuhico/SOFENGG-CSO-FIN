$(document).ready(() => {
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").removeAttr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").attr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").removeAttr('class', 'active')
    
    $('#myTable').DataTable();
})

