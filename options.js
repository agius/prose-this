$(function(){
  var storage = chrome.storage.local;
  var url = false;
  storage.get("new-prose-url", function(result){
    url = result["new-prose-url"];
  });
  
  if(url)
    $("#new-post-url").val(url);
  
  $("#url-form").on("submit", function(e){
    e.preventDefault();
    storage.set({"new-prose-url": $("#new-post-url").val()}, function(result){
      $("#url-form").prepend("<div class='alert alert-success'>Saved! <button class='close'>&times;</button>");
    });
    return false;
  });
  
  $(document).on("click", ".close", function(e){
    $(this).parent().hide().remove();
  });
});