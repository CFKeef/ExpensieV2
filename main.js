const electron = require('electron');
const {
	app,
	BrowserWindow,
	ipcMain,
	dialog
} = electron;
const path = require('path');
const fs = require("fs");

const {
	default: installExtension,
	REDUX_DEVTOOLS,
	REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

// Contains objects of format : ID (int), DATE (date), CUSTOMER (string), AMOUNT (INT). STATUS(INT)
let orders = [];

// Contains objects of format : ID (int), DATE (date), DESCRIPTION (string), AMOUNT (INT), STATUS(INT)
let expenses = [];

let stats = [
	{period: "Past 30 Days", gross: 0, expenses: 0, profit: 0, sales: 0},
	{period: "Past Year", gross: 0, expenses: 0, profit: 0, sales: 0},
	{period: "Lifetime", gross: 0, expenses: 0, profit: 0, sales: 0},
];

let chartData = [{
		name: "Total",
		value: 0
	},
	{
		name: "Profit",
		value: 0
	},
	{
		name: "Expenses",
		value: 0
	}
];
let monthlyData = [
	{num: 0, date: "Jan", Gross: 0, Expenses: 0, Profit: 0},
	{num: 1, date: "Feb", Gross: 0, Expenses: 0, Profit: 0},
	{num: 2, date: "April", Gross: 0, Expenses: 0, Profit: 0},
	{num: 3, date: "Mar", Gross: 0, Expenses: 0, Profit: 0},
	{num: 4, date: "May", Gross: 0, Expenses: 0, Profit: 0},
	{num: 5, date: "June", Gross: 0, Expenses: 0, Profit: 0},
	{num: 6, date: "July", Gross: 0, Expenses: 0, Profit: 0},
	{num: 7, date: "Aug", Gross: 0, Expenses: 0, Profit: 0},
	{num: 8, date: "Sept", Gross: 0, Expenses: 0, Profit: 0},
	{num: 9, date: "Oct", Gross: 0, Expenses: 0, Profit: 0},
	{num: 10, date: "Nov", Gross: 0, Expenses: 0, Profit: 0},
	{num: 11, date: "Dec", Gross: 0, Expenses: 0, Profit: 0},
];
let mainWindow;

process.env.NODE_ENV = 'dev';


function init() {
	// const isSecondInstance = app.makeSingleInstance(() => {
	// 	// Someone tried to run a second instance, we should focus our window.
	// 	try {
	// 		if (mainWindow) {
	// 			if (mainWindow.isMinimized()) {
	// 				mainWindow.restore();
	// 			};

	// 			mainWindow.focus();
	// 		};
	// 	} catch (err) {
	// 		// do nothing
	// 	};
	// });

	// end the process if theres a second app
	// if (isSecondInstance) {
	// 	app.quit()
	// };

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
	mainWindow.webContents.openDevTools({
		mode: 'detach'
	});

	installExtension(REDUX_DEVTOOLS)
		.then(name => console.log(`Added Extension:  ${name}`))
		.catch(err => console.log('An error occurred: ', err));

	installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => console.log(`Added Extension:  ${name}`))
		.catch(err => console.log('An error occurred: ', err));

	mainWindow.loadURL(
		process.env.NODE_ENV === 'dev' ?
		'http://localhost:3000' :
		`file://${path.join(__dirname, '/build/index.html')}`
	);

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
		mainWindow.webContents.openDevTools({
			mode: 'detach'
		});

	});
}

app.on('ready', init);


// IPC STUFF

// Returns orders list for dashboard page
ipcMain.on("retrieveOrders", (event) => {
	event.reply("ordersResponse", orders);
})

// Returns orders list for dashboard page
ipcMain.on("retrieveExpenses", (event) => {
	event.reply("expensesResponse", expenses);
})

// Returns stats list for dashboard page
ipcMain.on("retrieveStats", (event) => {
	event.reply("statsResponse", stats);
})

// Returns chart data for chart on dashboard page
ipcMain.on("retrieveChartData", (event) => {
	event.reply("chartDataResponse", chartData);
})

ipcMain.on("retrieveMonthlyData", (event) => {
	event.reply("monthlyDataResponse", monthlyData);
})

// Close program
ipcMain.on("close", () => {
	app.quit();
	process.exit(0);
})

// Minimizes Program
ipcMain.on("minimize", () => {
	mainWindow.minimize();
})

// Will update the user's stored order information information
ipcMain.on("updateOrdersStored", (event, args) => {

})

// Handles import process
ipcMain.on("handleImport", async (event,args)=> {
	let file = await dialog.showOpenDialog(mainWindow, {
		properties: ["openFile"]
	}).then(result => {
		return result.filePaths[0]
	});
	let content = fs.readFileSync(file, 'utf8', (err,data) => {
		if(err) {
			return null;
		}
		else return data;
	})
	event.reply("importResponse", content)
})