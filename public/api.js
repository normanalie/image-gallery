var duplicate_id = 0;
function duplicate(id){
    var original = document.getElementById(id);
    var clone = original.cloneNode(true);
    clone.id = id + "_" + ++duplicate_id;
    original.parentNode.appendChild(clone);
    return clone;
}


fetch("/api/images")
    .then(response => {
        return response.json();
    })
    .then(images => {
        for(var image of images){
            var div = duplicate('base');
            div.classList.add(image.tag);
            div.getElementsByTagName("a")[0].href = image.src;
            div.getElementsByTagName("img")[0].src = image.src;
            div.getElementsByTagName("img")[0].alt = image.alt;
            div.classList.remove("hidden");
        }
    })
    .catch(err => {
        console.log(err);
    })

fetch("/api/tags")
    .then(response => {
        return response.json();
    })
    .then(tags => {
        for(var tag of tags){
            var btn = duplicate("basebtn");
            btn.setAttribute("data-filter", "."+tag);
            btn.innerHTML = tag;
        }
    })
    .catch(err => {
        console.log(err);
    })