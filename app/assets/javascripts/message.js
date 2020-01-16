$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="main-chat__message-list__messagebox__2">
            <div class="main-chat__message-list__messagebox__2__talker">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__messagebox__2__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-list__messagebox__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
       <div class="main-chat__message-list__messagebox__2">
         <div class="main-chat__message-list__messagebox__2__talker">
           ${message.user_name}
         </div>
         <div class="main-chat__message-list__messagebox__2__date">
           ${message.created_at}
         </div>
       </div>
       <div class="main-chat__message-list__messagebox__text">
         <p class="lower-message__content">
           ${message.content}
         </p>
       </div>
     </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__message-list').append(html);      
       $('form')[0].reset();
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
       $('.submit-btn').attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function() {
    
    last_message_id = $('.message').last().attr("data-message-id");
  
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
       var insertHTML = '';
       $.each(messages, function(i, message) {
         insertHTML += buildHTML(message)
       });
       $('.main-chat__message-list').append(insertHTML);
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
       $('form')[0].reset();
       $('.submit-btn').attr('disabled', false);
       
    })
    .fail(function() {
      alert("メッセージ更新に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});