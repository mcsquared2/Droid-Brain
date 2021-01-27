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
        OrdnanceRow: function(data) {
            var row = $("<tr>");
            row.append($("td").text(data.Name));
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
            if ($("#ordnances-placeholder").length > 0) {
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
            // var data = DAL.Ordnance.GetAll();
            console.log("This is the population method");
            console.log(data)
            console.log(table);
            data.forEach(d => {
                console.log(d);
                table = document.getElementById("ordnances");
                row = table.insertRow();
                ordnanceName = row.insertCell(0);
                ordnanceName.innerHTML = d.Name;
                // table.append(SiteBuilder.Build.OrdnanceRow(d));
                
            })
        }
        
    }
}