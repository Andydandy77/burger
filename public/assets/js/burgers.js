$(function() {

    $("#submit").on("click", function(event) {
        console.log("clicked")
       

       var newBurger = {
           burger_name : $("#input").val().trim(),
           devoured: false
       };

       console.log(JSON.stringify(newBurger));

       $.ajax("/api/burgers", {
           type: "POST",
           data: newBurger
       }).then(
           function() {
               console.log("added new burger to database");
               location.reload();
           }
       )
    })

    $(".devourButton").on("click", function(event) {
        // console.log("devour");

        var id = this.id;

        var eaten = {
            devoured : true
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eaten
        }).then(function() {
            console.log("the burger has been eaten and devour was set to true");
            location.reload();
        }) 

        

    })



});