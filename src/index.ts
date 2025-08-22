import ZKLib from "node-zklib";
import 'dotenv/config';
const IP = process.env.IP || '';
const test = async () => {



    let zkInstance = new ZKLib(IP, 4370, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()
        // zkInstance.getRealTimeLogs((data)=>{
        // do something when some checkin 
            // console.log("response");
            // console.log(data)
        // })
        await zkInstance.enableDevice()
        const info = await zkInstance.getInfo()
        zkInstance.getRealTimeLogs((data)=>{
        // do something when some checkin 
            console.log(data)
        })
        // const response = await zkInstance.getVersion()
        // console.log(response);
        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        // console.log(await zkInstance.getInfo())
    } catch (e) {
        console.log(e)
        // if (e.code === 'EADDRINUSE') {
        // }
    }


    // Get users in machine 
    // const users = await zkInstance.getUsers()
    // console.log(users)


    // Get all logs in the machine 
    // Currently, there is no filter to take data, it just takes all !!
    // const logs = await zkInstance.getAttendances()
    // console.log(logs)


    // const attendances = await zkInstance.getAttendances('10.20.0.7', (percent, total)=>{
    //     // this callbacks take params is the percent of data downloaded and total data need to download 
    // })

     // YOu can also read realtime log by getRealTimelogs function

    // console.log('check users', users)

    // zkInstance.getRealTimeLogs((data)=>{
    //     // do something when some checkin 
    //     console.log(data)
    // })



    // delete the data in machine
    // You should do this when there are too many data in the machine, this issue can slow down machine 
    // zkInstance.clearAttendanceLog();


    // Disconnect the machine ( don't do this when you need realtime update :))) 
    // await zkInstance.disconnect()

}

test()