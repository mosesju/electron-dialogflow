const electron = require('electron');
const path = require('path');
const url = require('url');
const callAndCleanFulfillment = require('./testPromise.js')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;

app.on('ready', function(){
    const { BrowserWindow } = require('electron');
    win = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: { nodeIntegration: true }
    });
    win.loadURL(url.format({
        pathname : path.join(__dirname,'/public/index.html'),
        // Protocol can be a url or a file path
        protocol: 'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    

    win.on('closed', function(){
        app.quit();
    });
});

ipcMain.on('item:add', function(e, item){
    fulfillment_response = callAndCleanFulfillment.main(item);
    win.webContents.send('item:add', item);
    // win.close();
});

const mainMenuTemplate = [
    {
        label:'File'
        /*
        submenu:[
            {label:''},
            {label:''},
            {label:'Quit'},
            click(){
                app.quit();
            }}
        ];
        */
    }
];

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                click(item, focusedWindow){
                     focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}