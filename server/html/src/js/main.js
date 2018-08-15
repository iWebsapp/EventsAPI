$(document).ready(function(){

    $("#singout").click(function(){
      location.href = "../../"
    });

    var contProfile = 1
    //$(".submenu").slideUp()

    $(".titleProfile").click( function(e){
        e.preventDefault()
        if(contProfile === 0){
          $(".submenu").slideUp()
          $(".submenuProfile").slideDown()
          contProfile = 1
        } else {
          $(".submenuProfile").slideUp()
          contProfile = 0
        }
    })


    $(".titlePlaces").click( function(e){
        e.preventDefault()
        if(contProfile === 0){
          $(".submenu").slideUp()
          $(".submenuPlaces").slideDown()
          contProfile = 1
        } else {
          $(".submenuPlaces").slideUp()
          contProfile = 0
        }
    })


    $(".titleCoupones").click( function(e){
        e.preventDefault()
        if(contProfile === 0){
          $(".submenu").slideUp()
          $(".submenuCoupons").slideDown()
          contProfile = 1
        } else {
          $(".submenuCoupons").slideUp()
          contProfile = 0
        }
    })



    $(".titleShopping").click( function(e){
        e.preventDefault()
        if(contProfile === 0){
          $(".submenu").slideUp()
          $(".submenuShopping").slideDown()
          contProfile = 1
        } else {
          $(".submenuShopping").slideUp()
          contProfile = 0
        }
    })

});
