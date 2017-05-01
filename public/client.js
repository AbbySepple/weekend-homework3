console.log("client.js is sourced");


$(document).ready(onReady);

function onReady() {

  // $('#addToList').on('click', foo );
  // $('#itemCompleted').on('click', bar);
  // $(document).on('click', '.delete', deletePet);
  listSoFar();

}//end onReady function

function listSoFar(){
  $.ajax({
    url: '/thisListSoFar',
    type: 'GET',
    success: function(response){
      console.log('back from DB with:', response);
      for(var i=0; i<response.length; i++) {
        var appendString = '';
          appendString+='<div class="newRow">' + response[i].listeditem;
          appendString+='<button class="completey">Complete</button>';
          appendString+='<button data-itemid="'+ response[i].id +'" id="delete">Delete</button>' + '</div>';
          $('.container').append(appendString);
      }//end for loop
    }//end response
  });//end ajax
}//end listSoFar function



//work on this!!
//had to comment out to get other things to work
// function addItemToList(){
//   var itemToSend = {
//     listeditem: $('#toDo').val(' ')
//   };
//
//   console.log('in add item to list');
//   $.ajax({
//     url: '/addingItem',
//     type: 'POST',
//     data: itemToSend,
//     success: function(response){
//       console.log('back from server with:', response);
//       $('#toDo').val(' '),
//     // listSoFar();
//     }//end responsexs
//   });//end ajax
// }//end addItemToList function


//work on this!!
function deleteThis(){
  console.log('deleted your item');
  var id = $(this).data('itemid');

  $.ajax ({
    url:'/deleteThisItem',
    type: 'DELETE',
    data: {id: id},
    success: function(response){
      console.log('back from server with: ', response);
      addTable();
    } //end success
  });
}



//update/complete
function updateFunc(){
  var updates = {
    id:$(this).data('itemid'),
    name:$(this).parent().children('.newRow').val(),
  };
  console.log('this is updates', updates);
  console.log('test in update');
  $.ajax({
    url: '/update',
    type: 'POST',
    data: updates,
    success: function(updateThisList){
      console.log('updateThisList');
      console.log(updateThisList);

    }
  });
}
