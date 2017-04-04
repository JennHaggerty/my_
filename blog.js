var comments = require('./config');

//should pull the last 7 comments from the blog
//comments array and spit them out
var buildLatestCommentsHtml = function(comments) {
  //if there are comments and the comments are
  //not empty arrays
  if (comments && comments.length){
    var html = "<html>";
    for (var i = 0; i < comments.length; i++) {
      if (i <= 7) {
        var comment = comments[i];
        var title = comment.title;
       // comments[0].title AKA comment.title bc
       // comment is comments[i] AKA commments[0]
       // so comment is .. { title: 'blah' }
       // so title is comment.title
       //   AKA comments[0].title
       //   AKA comment['title']
        var latestComments = `
          <br>
          ${title} (<a href=""><b>view more</b></a>)
          <br>
        `;
 
        html += latestComments; 
      };
    }
    html += "</html>";
    return subscribe + html + archive;
  } else {
    console.log("He's dead, Jenn.");
  }
};
  

//this function takes a js array of comments
//comments and returns comments html
var buildCommentsHtml = function(comments) {
  //if there are comments and the comments
  //are not empty arrays
  if (comments && comments.length) {
    var html = "<html>";
    var jennsComments = `
      <div>
        Jenn's Comments
      </div>
    `;
    var displayingNumberOfComments = `
      <div>
        <b>Displaying 15 of {{# of articles}} comments (<a href="">View All Comments</a>)</b> 
      </div>
    `;
    for (var i = 0; i < comments.length; i++) {
      if (i <= 16) {
        var comment = comments[i];
        var title = comment.title;
        var date = comment.date;
        var time = comment.time;
        var featuredImage = comment.featured_image || "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14695379_10208948083591684_838265307476563095_n.jpg?oh=6f28b78a8bb0cc01f9ac2c2f5084018a&oe=58F7D2E7" ;
        comment = comment.comment;
        var allComments = `
          <div class="col-sm-6">
            <div class="row">
              <div class="col-xs-2 col-sm-6">
              <div align=center>
                <a href ="">${title}</a>
                <br>
                <br>
                <img src="${featuredImage}" width="90"></img>
              </div>
              <div class="col-xs-6 col-sm-6">
                <b>${date} ${time}</b>
                 <br>
                 <br>
                 ${comment}
              </div>
            </div>
          </div>
         `;
 
        html += allComments; 
      };
    }
    html += "</html>";
    return jennsComments + displayingNumberOfComments + html;
  } else {
    console.log("He's dead, Jenn.");
  }
};

//archive of all blog posts
//infinite load
var archive = function (comments) {
  //if there are comments and the comments are
  //not empty arrays
  if (comments && comments.length){
    var html = "<html>";
    for (var i = 0; i < comments.length; i++) {
      if (i <= 7) {
        var comment = comments[i];
        var title = comment.title;
        var archiveComments = `
          <br>
          <h2>${title}</h2><br>
          <p>${comment}</p>
          <br>
        `;
 
        html += archiveComments; 
      };
    }
    html += "</html>";
    return archiveComments;
  } else {
    console.log("They're dead, Jenn.");
  } 
};
`
  <br>
  <b>[<a href="">View All Blog Entires</a>]</b>
`;

//subscribes to an RSS feed
var subscribe = `
  <div>
    <b>
      Jenn's Latest Blog Entry [<a href="">Subscribe to this Blog</a>]
    </b>
  </div>
`;

module.exports = {
  buildLatestCommentsHtml: buildLatestCommentsHtml,
  buildCommentsHtml: buildCommentsHtml
};
