const electron = require('electron');
const {
	app,
	BrowserWindow,
	ipcMain,
	dialog
} = electron;
const path = require('path');
const fs = require("fs");
const storage = require("electron-json-storage");
const os = require("os");
console.log(storage.getDataPath())
const {
	default: installExtension,
	REDUX_DEVTOOLS,
	REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

// Contains objects of format : ID (int), DATE (date), CUSTOMER (string), AMOUNT (INT). STATUS(INT)
storage.set()
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
	storage.has("orders", (err, hasKey) => {
		if(err) event.reply("ordersResponse", orders);

		if(hasKey) {
			storage.get("orders", (err, data) => {
				event.reply("ordersResponse", data.orders);
			})
		}
		else event.reply("ordersResponse", orders);
	})
})

// Returns orders list for dashboard page
ipcMain.on("retrieveExpenses", (event) => {
	storage.has("expenses", (err, hasKey) => {
		if(err) event.reply("expensesResponse", expenses);

		if(hasKey) {
			storage.get("expenses", (err, data) => {
				event.reply("expensesResponse", data.expenses);
			})
		}
		else event.reply("expensesResponse", expenses);
	})
})

// Returns stats list for dashboard page
ipcMain.on("retrieveStats", (event) => {
	storage.has("stats", (err, hasKey) => {
		if(err) event.reply("statsResponse", stats);

		if(hasKey) {
			storage.get("stats", (err, data) => {
				event.reply("statsResponse", data.stats);
			})
		}
		else event.reply("statsResponse", stats);
	})
})

// Returns chart data for chart on dashboard page
ipcMain.on("retrieveChartData", (event) => {
	storage.has("chartData", (err, hasKey) => {
		if(err) event.reply("chartDataResponse", chartData);

		if(hasKey) {
			storage.get("chartData", (err, data) => {
				event.reply("chartDataResponse", data.chartData);
			})
		}
		else event.reply("chartDataResponse", chartData);
	})
})

ipcMain.on("retrieveMonthlyData", (event) => {
	storage.has("monthlyData", (err, hasKey) => {
		if(err) event.reply("monthlyDataResponse", monthlyData);

		if(hasKey) {
			storage.get("monthlyData", (err, data) => {
				event.reply("monthlyDataResponse", data.monthlyData);
			})
		}
		else event.reply("monthlyDataResponse", monthlyData);
	})
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
	saveOrders(args);
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


ipcMain.on("saveData", async (event,args)=> {
	saveOrders(args.orders);
	saveExpenses(args.expenses);
	saveData(args.data);
	saveStats(args.stats);
	saveMonthlyData(args.monthlyData)
})

ipcMain.on("handleExport", async (event,args)=> {
	
})

const saveOrders = async (orders) => {
	storage.set('orders', {orders: orders});
}
const saveExpenses = async (expenses) => {
	storage.set('expenses', {expenses: expenses});
}
const saveStats = async (stats) => {
	storage.set('stats', {stats: stats});
}
const saveData = async (data) => {
	storage.set('data', {data: data});
}
const saveMonthlyData = async (data) => {
	storage.set('monthlyData', {monthlyData: data});
}