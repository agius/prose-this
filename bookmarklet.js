(function(){
  
  var storage = chrome.storage.local;
  storage.get("new-prose-url", function(result){
    $.new_prose_url = result["new-prose-url"];
  });

  jQuery.fn.outerHTML = function() { return $('<div>').append(this.clone()).html(); };

  var getSelectionText = function() {
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }
      return text;
  }

  var trim = function(str){
    str = $.trim(str);
    str = str.replace(/\n\n+/g, "\n\n");
    return str;
  }

  var serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ? 
              serialize(v, k) :
              encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
      return str.join("&");
  }

  var match_site = function(tld){
    var full_tld = new RegExp("^https?:\\/\\/\\w*\.?" + tld, "")
    var href = window.location.href;
    if(href.match(full_tld))
      return true;
    return false;
  }

  var get_stackoverflow = function(){
    var title_link = $("#question-header h1 a").first();
    var title = "[" + trim(title_link.text()) + "](http://stackoverflow.com" + title_link.attr("href") + ")";
    var question = trim($("#question .post-text").text());
    var answerer_link = $(".answer.accepted-answer .user-details a").first();
    var answer_owner = "[" + trim(answerer_link.text()) + "](http://stackoverflow.com" + answerer_link.attr('href') + ")";
    var answer = trim($(".answer.accepted-answer .post-text").text());
    var owner = trim($("#question .owner .user-info a").first().outerHTML());
    var ret = "## " + title +
           "\n> " + question.replace(/\n/g, "\n> ");
    if(answer){
        ret = ret + "\n\n## Selected Answer (from " + answer_owner + ") " +
                    "\n> " + answer.replace(/\n/g, "\n> ") +
                    "\n";
    }
    return ret;
  }

  var get_gist = function(){
    var repo_link = $(".js-current-repository");
    var repo_name = "[" + trim(repo_link.text()) + "](" + repo_link.attr("href") + ")";
    var embed = $("input[name='embed-field']").val();
    var ret = "## " + repo_name +
              "\n " + embed;

    return ret;
  }

  var get_content = function(){
    var content = getSelectionText();
    if(content)
      return content;

    if(match_site("stackoverflow.com"))
      return get_stackoverflow();

    if(match_site("gist.github.com"))
      return get_gist();

  }

  var blog_this = function(){
    var post = {};
    var content = get_content();
    if(content)
      post.content = content;
    post.metadata = {};
    post.metadata.title = $("title").html();
    post.metadata.layout = "default";
    post.metadata.link = window.location.href;
    var base = $.new_prose_url;
    if(!base){
      base = window.prompt("Please provide the url for a new post on Prose", 
                           "http://prose.io/#github-name/github-name.github.com/new/master/_posts");
      storage.set({"new-prose-url": base}, function(result){ /* null */ });
    }

    if(!base){
      alert("Sorry, that is not a valid url.");
      return;
    }

    var url = base + "?" + serialize(post);
    console.log(url);
    window.open(url);
  }

  $.cmdKey = false;
  $(document).keydown(function(e){
    if(e.which == 91){
      $.cmdKey = true;
      return
    }

    if(e.which == 75 && (e.ctrlKey || e.metaKey || $.cmdKey)){
      blog_this();
    }
  });

  $(document).keyup(function(e){
    if(e.which == 91){
      $.cmdKey = false;
      return;
    }
  });
  
})()