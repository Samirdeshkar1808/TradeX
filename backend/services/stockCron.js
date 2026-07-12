const cron = require('node-cron');
const stockServices = require("./stockServices");

console.log("Stock cron loaded");

cron.schedule("*/15 * * * *", async () => {

    await stockServices.updateStockPrices();

});