window.GUI_File = new Array();
class app {
    info(info) {
        document.title = info.title;
    }
    include(include) {
        var i = 0;
        while (i < include.length) {
            i = i + 1;
            if (include[i - 1].type == 'bin') {
                var binPath = '"' + include[i - 1].path + '"';
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () { callback(request.readyState, request.status, request.responseText); }
                request.open('post', 'bin/mode.php', true);
                request.send('{ "fun":"includeBin", "binPath":' + binPath + ' }');
                function callback(readyState, status, responseText) {
                    if (readyState == 4 && status == 200) {
                        var responseObj = JSON.parse(responseText);
                        if (responseObj.fun == 'includeBin') {
                            if (responseObj.return != 'OK') {
                                console.log('WARN:includeBin is not OK');
                            }
                        }
                    }
                }
            }
            if (include[i - 1].type == 'gui') {
                GUI_File = new Array();
                GUI_File.push(include[i - 1].path);
            }
            if (include[i - 1].type == 'lib') {
                var tag = document.createElement('script');
                document.getElementById('APP_BODY').appendChild(tag);
                tag.type = 'text/javascript';
                tag.charset = 'UTF-8';
                tag.src = include[i - 1].path;
                tag.id = 'LIB_' + include[i - 1].id;
            }
            if (include[i - 1].type == 'style') {
                var tag = document.createElement('link');
                document.getElementById('APP_HEAD').appendChild(tag);
                tag.type = 'text/css';
                tag.rel = 'stylesheet';
                tag.href = include[i - 1].path;
                tag.id = 'STYLE_' + include[i - 1].id;
            }
        }
    }
    ui(ui,bool) {
        var guiFile = '';
        var i = 0;
        while (i < window.GUI_File.length) {
            i = i + 1;
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () { callback(request.readyState, request.status, request.responseText); }
            request.open('post', 'bin/mode.php', true);
            request.send('{ "fun":"fileRead", "filePath":' + '"' + window.GUI_File[i - 1] + '"' + ' }');
            function callback(readyState, status, responseText) {
                if (readyState == 4 && status == 200) {
                    var responseObj = JSON.parse(responseText);
                    if (responseObj.fun == 'fileRead') {
                        guiFile = guiFile + responseObj.return;
                        if(bool == false){
                            return _loadGUI();
                        }
                        if(bool == true){
                            _entrance(_loadGUI());
                        }
                    }
                }
            }
        }
        function _loadGUI() {
            var gui = {};
            var gui_tag;
            for (var control in ui) {
                var i = 0;
                while (i < ui[control].length) {
                    i = i + 1;
                    eval(guiFile);
                    var controlID = ui[control][i - 1].id;;
                    gui[controlID] = gui_tag;
                }
            }
            return gui;
        }
    }
    clear(control){
        document.getElementById(control).innerHTML = '';
    }
}