var projects;

$(document).ready(function () {

    //make project list for main page
    $.getJSON("data.json", function (json) {
        projects = json.projects;   //project array from json file

        $.each(projects, function (project_index, project_i) {  //for each project
            var project_tags = "";

            project_tags += '<span class="badge rounded-pill bg-primary m-1">' + project_i.db + '</span>';
            //var tags = [];
            //tags = tags.concat(project_i.client);
            //tags = tags.concat(project_i.server);
            $.each(project_i.client, function (tag_index, tag_i) {
                project_tags += '<span class="badge rounded-pill bg-primary m-1" name="tags' + project_i.id + 'client">' + tag_i + '</span>';
            });
            $.each(project_i.server, function (tag_index, tag_i) {
                project_tags += '<span class="badge rounded-pill bg-primary m-1" name="tags' + project_i.id + 'server">' + tag_i + '</span>';
            });

            var project_div =
                '<div class="col-lg-6">'
                + '<a class="portfolio-item" href="#" onclick="set_modal_details(' + (project_index+1) + ');" data-toggle="modal" data-target="#exampleModal">'
                + '<div class="caption-bg" style="background-image: url(\'img/' + project_i.imgs[0] + '\'); background-size: auto 100%; background-position: center;">'
                + '<div class="caption">'
                + '<div class="caption-content w-100">'
                + '<div class="h2 text-center">' + project_i.name + '</div>'
                + '<p class="mb-0 text-center" id="tags' + project_i.id + '" name="tags' + project_i.id + '">' + project_tags + '</p>'
                + '</div></div>'
                + '<img class="img-fluid" style="opacity: 0;" src="assets/img/portfolio-1.jpg" alt="..." />'
                + '</div></a></div>';
            $("#project_list").append(project_div);
        });

        /*
  
      var project_i = projects[0];
  
      var project_tags = "";
  
      $.each(project_i.tags, function(tag_i, tag){
          project_tags += '<span class="badge rounded-pill bg-primary m-1">'+tag+'</span>';
      });
      
  
      var project_div = 
          '<div class="col-lg-6">'
          +'<a class="portfolio-item" href="#" onclick="set_modal_details(1);" data-toggle="modal" data-target="#exampleModal">'
              +'<div class="caption-bg" style="background-image: url(\'img/'+project_i.imgs[0]+'\'); background-size: auto 100%; background-position: center;">'
              +'<div class="caption">'
                  +'<div class="caption-content w-100">'
                     +'<div class="h2 text-center">'+project_i.name+'</div>'
                      +'<p class="mb-0 text-center">'+project_tags+'</p>'
                  +'</div></div>'
              +'<img class="img-fluid" style="opacity: 0;" src="assets/img/portfolio-1.jpg" alt="..." />'
          +'</div></a></div>';
      $("#project_list").append(project_div);
      */


    });


    //$(".carousel-indicators").append(gallery_item_indicator);

    //create carousel item for gallery
    var gallery_item = document.createElement("div");
    gallery_item.classList.add("carousel-item");
    var gallery_img = document.createElement("img");
    gallery_img.src = "img/img (1).png";
    gallery_img.classList.add("img-fluid");
    gallery_item.append(gallery_img);
    var gallery_title = document.createElement("div");
    //gallery_title.classList.add("carousel-caption d-none d-md-block");
    //gallery_title.append(document.createElement("h5").text(""));

    //create carousel indicator for gallery
    var gallery_item_indicator = document.createElement("li");
    gallery_item_indicator.setAttribute("data-target", "#carouselExampleControls");
    gallery_item_indicator.setAttribute("data-slide-to", "3"); //next index start on 0
    gallery_item_indicator.classList.add("rounded-circle");

    gallery_item.classList.add("carousel-item");
    //$(".carousel-inner").append(gallery_item);
    //$(".carousel-indicators").append(gallery_item_indicator);
});

//on project click, show more details
function set_modal_details(project_id) {
    project_i = projects.find((project_i => project_i.id === project_id));

    $("#project_name").text(project_i.name);
    $("#project_desc").html(project_i.desc);

    $(".carousel-inner").children(".carousel-item").remove()
    //$(".carousel-inner").empty();
    $(".carousel-indicators").empty();
    $("#project_info").empty();

    var client = document.createElement("tr");
    var server = document.createElement("tr");
    var envi = document.createElement("tr");
    var db = document.createElement("tr");

    client.append(document.createElement("td"));
    client.firstChild.innerHTML = "צד לקוח";
    var client_td = document.createElement("td");
    var tags = document.getElementsByName("tags"+project_id+"client");
    tags = Array.from(tags);
    tags.map(tag_i => client_td.append(tag_i.cloneNode(true))); //make copy so original will remain in place
    client.append(client_td);

    tags = document.getElementsByName("tags"+project_id+"server");
    if(tags.length != 0)
    {
        server.append(document.createElement("td"));
        server.firstChild.innerHTML = "צד שרת";
        var server_td = document.createElement("td");
        tags = Array.from(tags);
        tags.map(tag_i => server_td.append(tag_i.cloneNode(true)));
        server.append(server_td);
    }
    else{   //no server side
        client.firstChild.innerHTML = "שפות";
    }

    /*
    server.append(document.createElement("td"));
    server.firstChild.innerHTML = "צד לקוח";
    var server_td = document.createElement("td");
    var tags = document.getElementsByName("tags"+project_id+"server").copy();
    tags = Array.from(tags);
    tags.map(tag_i => server_td.append(tag_i));
    server.append(server_td);
*/

    var db_td = document.createElement("td");
    db.append(document.createElement("td"));
    db.firstChild.innerHTML = "מסד נתונים";
    db_td.innerHTML = '<span class="badge rounded-pill bg-primary m-1">'+project_i.db+'</span>';;
    db.append(db_td);

    envi.append(document.createElement("td"));
    envi.firstChild.innerHTML = "סביבת עבודה";

    var envi_i_td = document.createElement("td");
    $.each(project_i.environment, function (envi_index, envi_i) {
        envi_i_td.innerHTML += '<span class="badge rounded-pill bg-primary m-1">'+envi_i+'</span>';
    });
    envi.append(envi_i_td);


    $("#project_info").empty();
    $("#project_info").append(client);
    if(tags.length != 0) $("#project_info").append(server);
    $("#project_info").append(db);
    $("#project_info").append(envi);

    $.each(project_i.imgs, function (i, img_i) {

        //create carousel item for gallery
        var gallery_item = document.createElement("div");
        gallery_item.classList.add("carousel-item");
        var gallery_img = document.createElement("img");
        gallery_img.src = "img/" + img_i;
        gallery_img.classList.add("img-fluid");
        gallery_item.append(gallery_img);
        var gallery_title = document.createElement("div");
        gallery_title.classList.add("carousel-caption", "d-none", "d-md-block");
        var gallery_title_h = document.createElement("h5");
        gallery_title_h.innerText = project_i.imgs_desc[i];
        gallery_title.append(gallery_title_h);
        gallery_item.append(gallery_title);

        //create carousel indicator for gallery
        var gallery_item_indicator = document.createElement("li");
        gallery_item_indicator.setAttribute("data-target", "#carouselExampleControls");
        gallery_item_indicator.setAttribute("data-slide-to", i); //next index start on 0
        gallery_item_indicator.classList.add("rounded-circle");

        gallery_item.classList.add("carousel-item");
        $(".carousel-inner").append(gallery_item);
        $(".carousel-indicators").append(gallery_item_indicator);

    });

    $(".carousel-inner").children(".carousel-item").first().addClass("active");

    $("#project_github").attr("href", project_i.github);
}
