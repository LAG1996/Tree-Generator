const MousePosition = {
	x: null,
	y: null,
}

let lockedFunc = null;

$(document).ready(() => {

	$('.control-panel').on('click', '.control', (evt) => {
		
		const t = $(evt.currentTarget)

		if (t.hasClass('toggle-collapse')) {
			togglePanelVisibility(evt);
		}

	});

	$('.control-panel').on('mousedown', '.control', (evt) => {
		const t = $(evt.currentTarget)

		if (t.hasClass('panel-move')) {
			MousePosition.x = evt.clientX;
			MousePosition.y = evt.clientY;

			lockedFunc = movePanel;
		}
	});

	$('.control-panel').on('mouseup', '.control', (evt) => {
		lockedFunc = null;
	});

	$('.control-panel').on('mousemove', (evt) => {
		if (lockedFunc != null) {
			lockedFunc(evt);
		}
	});

});

const togglePanelVisibility = function(evt) {
	// find whether the body is showing or hiding
	const body = $(evt.currentTarget).closest('.control-panel').find('.body');
	const icon = $(evt.currentTarget);

	if (body.is(':visible')) {
		body.hide();
		icon.removeClass('fa-caret-up').addClass('fa-caret-down');
	} else {
		body.show();
		icon.removeClass('fa-caret-down').addClass('fa-caret-up');
	}
}

const movePanel = function(evt) {
	const panel = $(evt.currentTarget).closest('.control-panel');
	const offset = panel.offset();
	const currentX = evt.clientX;
	const currentY = evt.clientY;

	panel.offset({ top: offset.top + (currentY - MousePosition.y), left: offset.left + (currentX - MousePosition.x )});
	MousePosition.x = currentX;
	MousePosition.y = currentY;
}
