/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/12/2021 - 23:35:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/12/2021
    * - Author          : 
    * - Modification    : 
**/
import * as io from "socket.io-client";
import { usePersistentStore } from "../store";
export const IOPublic= io("wss://dev.dup.company/public");
export const IOPrivate = (vale:any) => io("wss://dev.dup.company/private", {
    query:{
        tk: vale
    }
});
export const IOAdmin = io("wss://dev.dup.company/admin");