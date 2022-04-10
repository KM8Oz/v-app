import { notification } from "antd";
import { ipcRenderer } from "electron";
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
export const dirhame_formatter = new Intl.NumberFormat('ma-MA', {
    style: 'currency',
    currency: 'MAD'
});
const axios = require('axios');
export async function exportReleve({ data, dfacture}: {
    data: {
        NFacture:string,
        DFacture:string,
        Station:string,
        MVignettes:number,
        MBrut:number,
        MNet:number,
        number:number
    }[],
    dfacture: Date
}) {
    var _workbook = new Workbook();
    return axios.request({
        responseType: 'arraybuffer',
        url: 'https://res.cloudinary.com/dxjubrqnd/raw/upload/v1649618691/empty_releve_final_qnp3rp.xlsx',
        method: 'get',
        headers: {
            'Content-Type': 'blob',
        },
    })
        .then(res => {
                _workbook.xlsx.load(res.data).then(function (workbook) {
                let name = "RELEVE "+dfacture.toLocaleDateString('ma-MA', {
                    dateStyle:"short"
                });
                var worksheet = workbook.getWorksheet("RLV"); //  facture 212205
                console.log(worksheet.name, worksheet.getRow(11).getCell("F").value);
                worksheet.name =  name;
                worksheet.getRow(11).getCell("F").value = "DATE: "+dfacture.toLocaleDateString('ma-MA', {
                    dateStyle:"short"
                });
                data.forEach((ce, i) => {
                        worksheet.getRow(13+i).getCell("B").value = ce.NFacture;
                        worksheet.getRow(13+i).getCell("C").value = ce.DFacture;
                        worksheet.getRow(13+i).getCell("D").value = ce.Station;
                        worksheet.getRow(13+i).getCell("E").value = ce.number;
                        worksheet.getRow(13+i).getCell("F").value = ce.MVignettes;
                        worksheet.getRow(13+i).getCell("G").value = ce.MBrut;
                        worksheet.getRow(13+i).getCell("H").value = Number(ce.MVignettes - ce.MBrut);
                        worksheet.getRow(13+i).getCell("I").value = ce.MNet;
                })
                workbook.xlsx.writeBuffer({ filename: name }).then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), (name || "file") + ".xlsx"); 
                    notification.info({
                        message: "saved to xlsx file successfully!",
                        placement: "bottomRight"
                    });
                });
            });
        })
}

export interface VignettestypeFromServer {
    CArticle: string;
    CBar: string;
    CBon: string;
    uuid: string;
    CFournisseur: string;
    DBon: string;
    DFacture?: string;
    facture?:any;
    Kilos: string;
    MontantTotal: string;
    MontantTotalBrut: string;
    MontantVignette: string;
    NFacture?: string;
    station:string;
    PU: string;
    Quantity: string;
    SNTL: string;
    Signature: string;
    Ville: string;
    lastmachine: any;
    factured: boolean;
    archived: boolean;
    machine: any;
}