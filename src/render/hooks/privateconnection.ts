/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 19/12/2021 - 00:46:47
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2021
    * - Author          : 
    * - Modification    : 
**/
export const usePrivate = {
        set PrivateIO(v : SocketIOClient.Socket ) {
            this.PrivateIO = v;
        },
        get PrivateIO() : SocketIOClient.Socket {
            return  this.PrivateIO
        }
}