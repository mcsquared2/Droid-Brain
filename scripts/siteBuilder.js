var SiteBuilder = {
    buildNavBar: function (activePage) {
        var links = "<ul>"
        Object.keys(PAGES).forEach(element => {
            links += "<a href=" + PAGES[element].link +"><li>" + PAGES[element].display + "</li></a>"    
        });
        links += "</ul>"
        $("#nav-placeholder").append(links);
        
    }
}