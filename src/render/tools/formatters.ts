import { notification } from "antd";
import { ipcRenderer } from "electron";
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
export const dirhame_formatter = new Intl.NumberFormat('ma-MA', {
    style: 'currency',
    currency: 'MAD',
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const axios = require('axios');
export async function exportFacture({ data, nfacture, dfacture, name }: {
    data: {
        codebar: string,
        date: any,
        station: string,
        codebon: string,
        article: string,
        qte: number,
        pu: number,
        mt_vignette: number,
        montant_total: number,
        montant_brut: number,
        remise: number
    }[],
    name: string,
    nfacture: string,
    dfacture: Date
}) {
    var _workbook = new Workbook();
    // let pathc = await ipcRenderer.invoke('downloads')

    return axios.request({
        responseType: 'arraybuffer',
        url: 'https://res.cloudinary.com/dxjubrqnd/raw/upload/v1647375447/facture_nmbujc.xlsx',
        // url: 'https://res.cloudinary.com/dupagadir/raw/upload/v1646868390/FACTURES_bf3dil.xltx',
        // url: 'https://res.cloudinary.com/dupagadir/raw/upload/v1647389440/facture-213020_gnx3to.xlsx',
        method: 'get',
        headers: {
            'Content-Type': 'blob',
        },
    })
        .then(res => {
                // console.log(res.data);
                
                _workbook.xlsx.load(res.data).then(function (workbook) {
                var worksheet = workbook.getWorksheet("facture");
                // console.log('file:', res.data, { worksheet, _workbook });
                // console.log(worksheet.getRows(0,49));
                let replacement  = [
                    {text: "                           "},
                    {text: "           "},
                    {text: "  "},
                    {text: `FACTURE : ${nfacture} `},
                    {text: "                                                  …                                                 "},
                    {text: `Date : ${dfacture.toLocaleString()}`},
                ]
                worksheet.getRow(10).values = [{
                    richText: worksheet.getRow(12).values[1].richText.map((s:any, i:number)=>s={...s,text:replacement[i].text})
                }]
                worksheet.name = name;
                data.forEach((ce, i) => {
                    worksheet.getRow(15+i).values = [
                    ce.codebar, 
                    ce.date, 
                    ce.station,
                    ce.codebon,
                    ce.article,
                    ce.qte,
                    ce.pu,
                    ce.mt_vignette,
                    ce.montant_brut,
                    ce.remise,
                    ce.montant_total
                    ];
                })
                workbook.xlsx.writeBuffer({ filename: name }).then((buffer) => {
                    // const element = document.createElement("a");
                    // element.href = URL.createObjectURL(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
                    // element.style.position = "fixed"
                    // element.style.zIndex = "-100"
                    // element.download = (name || "file") + ".xlsx";
                    // document.body.appendChild(element); // Required for this to work in FireFox
                    // element.click();
                    // document.body.removeChild(element);
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
    CFournisseur: string;
    DBon: string;
    DFacture: string;
    Kilos: string;
    MontantTotal: string;
    MontantTotalBrut: string;
    MontantVignette: string;
    NFacture: string;
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