app = new app;
app.info(
    {
        title: 'Hello',
        bgcolor: '#000000'
    }
);
app.include(
    [
        { type: 'gui', path: '//lib//gui//mode.gui.js' },
        { type: 'style', path: 'lib//style//mode.style.css', id: 'mode' },
        { type: 'lib', path: 'lib//mode//mode.js', id: 'mode' }
    ]
);
app.ui(
    {
        Ground: [
            { container: 'APP_GUI', id: 'Ground_BGP' },
            { container: 'Ground_BGP', id: 'Ground_BUTTON' }
        ],
        Monitor: [
            { container: 'Ground_BUTTON', id: 'Monitor_Touch', tagName: 'input', type: 'button' }
        ]
    },true
);

function _entrance(ui) {
    ui.Monitor_Touch.value = 'Touch Me';
    ui.Monitor_Touch.onclick = function () {
        alert('Hello');
    }
}