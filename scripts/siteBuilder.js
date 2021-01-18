var SiteBuilder = {
    Build: {
        Table: function (placeholderId, id, headerRow, properties=TABLE_BUILD_PROPERTIES){
            var table = $("<table>").addClass(properties.class).prop("id", id);
            var placeholder = $(placeholderId);
            table.append(headerRow);
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
            var row = $("<tr>").addClass(properties.rowClass);
            row.append($("td").text(element.Name));
            return row;
        },
        OrdnanceHeader: function() {
            var row = $("<tr>");
            row.append($("<th>").text("Name"));
            return row
        }
    },
    Load: {
        OrdnanceData: function() {
            if ($("#ordnances-placeholder")) {
                return true
            }
            return false;
        }
    },
    Populate: {
        OrdnanceTable:function(data){
            var table = $("#ordnances");
            if (table.length == 0){
                SiteBuilder.Build.Table("#ordnances-placeholder", "ordnances", SiteBuilder.Build.OrdnanceHeader());
                table = $("#ordnances");
            } else {
                table.empty();
            }
            var data = DAL.Ordnance.GetAll();
            console.log(data);

        }
        
    }
}