const path = require('path');
const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    show: false, // para evitar parpadeos
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.maximize(); // modo maximizado
  win.show();     // mostrar la ventana

  win.loadFile('build/index.html'); // o donde esté tu HTML
}

app.whenReady().then(() => {
  createWindow();
});
