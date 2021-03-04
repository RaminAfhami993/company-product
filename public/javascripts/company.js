$(document).ready(() => {


    $('.deleteBtn').click(function()  {
        console.log($(this).attr("companyId"));

        $.ajax({
            method: "delete",
            url: `/company/${$(this).attr("companyId")}`,
            success: function(data) {
                console.log(data);

                window.location.href = "http://localhost:5005/company/companiesPage"
                
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
});