var AemReact = AemReact || {};
/**
 * add a child to a Dnd-Zone. Usually the Dnd-Zone is hidden.
 */
AemReact.addChild = function(ctx, relPath, resourceType) {
	var e = CQ.WCM.getEditable(ctx.path + relPath + "/*");
	e.createParagraph({
		resourceType : resourceType
	});
}
/**
 * hide or show the editable at the path.
 */
AemReact.setVisibility = function(path, visible) {
	var editable = CQ.WCM.getEditable(path);
	if (editable) {
		if (visible) {
			editable.show();
		} else {
			editable.hide();
		}
	} else {
		var cb = function() {
            console.log("editablesready");
			AemReact.setVisibility(path, visible);
		}
		if (typeof window !== "undefined" && window.CQ) {
			// this is effective when age is initially rendered
            CQ.WCM.on("editablesready", cb, this);
            // this will be effective when element is dragged into parsys
		    setTimeout(cb,0);
		}
	}
}

AemReact.onDelete = function(editable) {
	console.log("deleted");
}
