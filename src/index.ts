

import Zkteco from "zkteco-js";
import "dotenv/config";
const IP = process.env.IP || '';
const manageZktecoDevice = async () => {
    console.log("Starting ZKTeco device management...");
    console.log(`Connecting to device at IP: ${IP}`);
    const device = new Zkteco(IP, 4370, 5200, 5000);

    try {
        // Create socket connection to the device
        await device.createSocket();

        // Retrieve and log all attendance records
        // const attendanceLogs = await device.getAttendances();
        // console.log(attendanceLogs);

        // Listen for real-time logs
        await device.getRealTimeLogs((realTimeLog) => {
            // console.log("Real-time log received:");
            console.log(realTimeLog);
        });

        // Manually disconnect after using real-time logs
        // await device.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

manageZktecoDevice();