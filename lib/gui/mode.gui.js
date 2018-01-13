if (control == 'Ground') {
    gui_tag = document.createElement('div');
    document.getElementById(ui[control][i - 1].container).appendChild(gui_tag);
    gui_tag.className = 'Ground';
    gui_tag.id = ui[control][i - 1].id;
    var controlID = ui[control][i - 1].id;
    gui[controlID] = gui_tag;
}
if (control == 'Monitor') {
    gui_tag = document.createElement(ui[control][i - 1].tagName);
    document.getElementById(ui[control][i - 1].container).appendChild(gui_tag);
    gui_tag.type = 'button';
    gui_tag.id = ui[control][i - 1].id;
    var controlID = ui[control][i - 1].id;
    gui[controlID] = gui_tag;
}