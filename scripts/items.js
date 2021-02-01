var showAddOrdnanceForm = false;
function ToggleAddOrdnance() {
    if (showAddOrdnanceForm) {
        $("#add-ordnance-form").hide()
        $("#toggle-add-ordnance-btn").html("Add Ordnance");
        showAddOrdnanceForm = false;
    } else {
        $("#add-ordnance-form").show()
        $("#toggle-add-ordnance-btn").html("Hide Add Ordnance Form");
        showAddOrdnanceForm = true;
    }
}