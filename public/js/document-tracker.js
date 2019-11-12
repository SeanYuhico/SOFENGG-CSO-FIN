$(document).ready(() => {
    $("#balance-nav-link").removeAttr('class', 'active')
    $("#home-nav-link").removeAttr('class', 'active')
    $("#debts-nav-link").removeAttr('class', 'active')
    $("#document-nav-link").attr('class', 'active')
    $("#help-nav-link").removeAttr('class', 'active')
    $("#users-nav-link").removeAttr('class', 'active')
    table = $('#myTable');
    $('#myTable thead tr').clone(true).appendTo( '#myTable thead' );
    $('#myTable thead tr:eq(1) th').each( function (i) {
        let title = $(this).text();
        
        
        $(this).html( '<input type="text" data-index =' + i + ' placeholder="Search '+title+'" />' );
        $(this).addClass('filter');
        if (title === 'Remarks' || 'Pended') {
            $(this).addClass('fixedCol');
        }


        // $('.filter, input', this).on('keyup change', function() {
        //     //clear global search values
        //     //table.search('');
        //     console.log('wow');
        //     table.column($(this).data('index')).search(this.value).draw();
        // });
    });
});

