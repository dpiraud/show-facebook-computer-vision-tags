const show_facebook_cv_tags = function() {
  //use part of prefix toi avoid issues with spécial char...
  const TAG_PREFIX = "image contient peut";
  const images = [...document.getElementsByTagName('img')];

  images.forEach(function(el) {
    if (el.hasAttribute("data-prev-alt") && el.getAttribute("data-prev-alt") === el.getAttribute("alt"))
      return;

    el.setAttribute("data-prev-alt", el.alt);

    const altText = el.alt;
    //Use indexOf instead of startsWith to avoid issues with spécial char..
    const isCVTag = altText.indexOf(TAG_PREFIX) !== -1;

    if (isCVTag) {
      const tags = altText.slice(altText.indexOf(':')+1).split(/, | et /);
      let html = "<ul style='position:absolute;top:10px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:rgba(0,0,0,0.7);color:#fff;border-radius:5px;text-align:left'>";

      tags.forEach(function(tag){
        let prefix = "&#9755;";
        html += `<li>${prefix} ${tag.trim()}</li>`;
      });

      html += "</ul>";

      el.style.position = 'relative';
      el.insertAdjacentHTML('afterend', html);
    }
  });
};

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        show_facebook_cv_tags();
    });
});

const config = { attributes: true, childList: true, characterData: false }

observer.observe(document.body, config);

//Add timer to ensure tag refresh during navigation
//it's sunday evening,I just want to make it work :-)
const timer = function(){
  show_facebook_cv_tags();
  setTimeout(timer, 750)
}

timer();
