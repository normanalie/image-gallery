function gallery() {
    var popup_btn = $('.popup-btn');
    popup_btn.magnificPopup({
        type : 'image',
        gallery : {
            enabled : true
            }
    })
}

function menu(){
    $('.portfolio-menu ul li').click(function(){
        $('.portfolio-menu ul li').removeClass('active');
        $(this).addClass('active');
        
        var selector = $(this).attr('data-filter');
        $('.portfolio-item').isotope({
            filter:selector
        });
        return  false;
    });
}

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
            div.getElementsByTagName("a")[0].href = image.url;
            div.getElementsByTagName("img")[0].src = image.url;
            div.getElementsByTagName("img")[0].alt = image.alt;
            div.classList.remove("hidden");
        }
        gallery();
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
            btn.classList.remove("active");
            btn.setAttribute("data-filter", "."+tag);
            btn.innerHTML = tag;
        }
        menu();
    })
    .catch(err => {
        console.log(err);
    })

    