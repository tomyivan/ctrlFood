import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config"; 
import { ErrorHandlerMiddleware } from "./common";
import { 
    routerBio, 
    routerSee, 
    routerSchdl,
    routerUsers,
    routerChk
} from "./infraestructure";
const app = express();
const PORT = process.env.PORT;
if( !PORT ) {
    console.error("No PORT environment variable set");
    process.exit(1);
}
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/v1/biometric', routerBio);
app.use('/api/v1/events', routerSee);
app.use('/api/v1/schedule', routerSchdl);
app.use('/api/v1/users', routerUsers);
app.use('/api/v1/check', routerChk);
app.use(ErrorHandlerMiddleware.handleError.bind(ErrorHandlerMiddleware));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
