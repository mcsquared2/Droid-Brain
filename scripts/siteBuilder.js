var SiteBuilder = {
    Build: {
        Table: function (placeholderId, id, properties=TABLE_BUILD_PROPERTIES){
            var table = $("<table>").class(properties.class).id(id);
            var placeholder = $(placeholderId);
            placeholder.append(table);  
        },
        NavBar: function (activePage) {
            var links = "<ul>"
            Object.keys(PAGES).forEach(element => {
                links += "<a href=" + PAGES[element].link +"><li>" + PAGES[element].display + "</li></a>"    
            });
            links += "</ul>"
            $("#nav-placeholder").append(links);
            
        },
        OrdnanceRow: function(data, rowProperties) {
            var row = $("<tr>").class(properties.rowClass);
            row.append($("td").text(element.Name));
            return row;
        }
    },
    Populate: {
        PopulateOrdnanceTable:function(){
            var table = $("#ordnances");
            if (table.length == 0){
                SiteBuilder.Build.Table("ordnances-placeholder", "ordnances");
                table = $("#ordnances");
            }
            var data = "";

        }
        
    }
}