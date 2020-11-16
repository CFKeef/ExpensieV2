const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');

const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

let orders = [
  {id: 1, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 2, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 3, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 4, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 5, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 6, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 7, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 8, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 9, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
  {id: 10, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
]

let chartData = [
  {name: "Expenses", value: 24440},
  {name: "Profit", value: 44444}
]

let stats = [
  {name: "Gross", past30Days: 2550, pastYear: 10560, lifetime: 20000},
  {name: "Expenses", past30Days: 2550, pastYear: 10560, lifetime: 20000},
  {name: "Profit", past30Days: 2550, pastYear: 10560, lifetime: 20000},
  {name: "Sales Count", past30Days: 2550, pastYear: 10560, lifetime: 20000},
]

let mainWindow;

process.env.NODE_ENV = 'dev';

function init() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: '#17181a',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    frame: false,
    show: true,
    resize: false
  });
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  mainWindow.loadURL(
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '/build/index.html')}`
  );

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    
  });
}

app.on('ready', init);


// IPC STUFF

// Returns orders list for dashboard page
ipcMain.on("retrieveOrders", (event, arg) => {
  event.reply("ordersResponse", orders);
})

// Returns stats list for dashboard page
ipcMain.on("retrieveStats", (event, arg) => {
  event.reply("statsResponse", stats);
})

// Returns chart data for chart on dashboard page
ipcMain.on("retrieveChartData", (event,arg) => {
  event.reply("chartDataResponse", chartData);
})