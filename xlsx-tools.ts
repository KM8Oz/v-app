import { Workbook } from "exceljs";
export function exportFacture({ data,nfacture, dfacture, name }: {
    data: {
        codebar: string,
        date: Date,
        station: string,
        codebon: string,
        article: string,
        qte: number,
        pu: number,
        mt_vignette: number
    }[],
    name: string,
    nfacture:string,   
    dfacture:Date
}) {
/**
 * @param data: Array<{
 *              @param codebar: string \ Code bar of the bon.
 *              @param date: Date \ bon date of issue.
 *              @param station: string \ station name where the vignette got used. 
 *              @param codebon: string \ the code indicated in the voucher.
 *              @param article:string \ product name as shown in the erp.
 *              @param qte: number \ quantity of products in Units.
 *              @param pu: number \ price for unit.
 *              @param mt_vignette: number \ total price indicated by the accountant.
 *           }>
 * @param name: string \ name of the file exported and the spreadSheat also.
 * @param nfacture: string \ facture number as indicated in the erp.
 * @param dfacture: string \ date of issue of facturation as in erp.
 * @copyright: github/km8oz
 * @template: exportFacture({
 *   name: "test",
 *   data: [{
 *       date: new Date(),
 *       qte: 30.28,
 *       pu: 9.8,
 *       station: "STATION SERVICE AKKA",
 *       article: "GAZOIL",
 *       codebar: "AE0929288",
 *       codebon: "J989898",
 *       mt_vignette: 300
 *   }],
 *   nfacture:"10918230",
 *   dfacture:new Date()
 *   })
 */
return new Promise((resolve, reject)=>{
    var workbook = new Workbook();
    workbook.xlsx.readFile("../assets/FACTURE.xlsx")
        .then(function () {
            var worksheet = workbook.getWorksheet("facture");
            worksheet.getRow(12).values = [{
                richText: [
                  { text: '                           ' },
                  { font: { bold: true, size: 12, color: { theme: 7 }, name: 'Arial', family: 2 }, text: '           ' },
                  { font: { bold: true, size: 12, color: { argb: 'FF32AA79' }, name: 'Arial', family: 2 }, text: '  ' },
                  { font: { bold: true, size: 12, color: { argb: 'FF32AA79' }, name: 'Arial', family: 2 }, text: `FACTURE : ${nfacture} ` },
                  {
                    font: { bold: true, size: 12, color: { argb: 'FF32AA79' }, name: 'Arial', family: 2 },
                    text: '                                                                                                                         '
                  },
                  { font: { bold: true, size: 12, color: { argb: 'FF32AA79' }, name: 'Arial', family: 2 }, text: `Date : ${dfacture.toLocaleString()}` }
                ]
              }]

            workbook.worksheets[0].name = name;
            data.forEach((ce, i) => {
                worksheet.getRow(16).values = [(ce.codebar).replace(/[^a-zA-Z]/g, ""), (ce.codebar).replace(/[^0-9]/g, ""), ce.date, ce.station,
                ce.codebon,
                ce.article,
                ce.qte,
                ce.pu,
                ce.mt_vignette,
                {
                    formula: `G${16 + i}*H${16 + i}`,
                    date1904: false
                },
                {
                    formula: `J${16 + i}*0.5%`,
                    date1904: false
                },
                {
                    formula: `J${16 + i}-K${16 + i}`,
                    date1904: false
                }];
                worksheet.getRow(16 + i).eachCell((cell, colNumber) => {
                    if (colNumber < 12) {
                        cell.alignment = {
                            horizontal: 'center'
                        }
                        cell.font = {
                            family: 11,
                            bold: true
                        }
                        cell.border = {
                            top: {
                                style: "thin"
                            },
                            bottom: {
                                style: "thin"
                            },
                            left: {
                                style: "thin"
                            },
                            right: {
                                style: "thin"
                            }
                        }
                    }
                    if (colNumber == 12) {
                        cell.alignment = {
                            horizontal: 'center'
                        }
                        cell.font = {
                            family: 11,
                            bold: true
                        }
                        cell.border = {
                            top: {
                                style: "thin"
                            },

                            bottom: {
                                style: "thin"
                            },
                            left: {
                                style: "thin"
                            },
                            right: {
                                style: "medium"
                            }
                        }
                    }
                })
            })
            workbook.xlsx.writeFile(`./${name}.xlsx`).then(() => {
                resolve('saved')
            }).catch((err)=>{
                reject("error:"+JSON.stringify(err))
            });
        });

})
}
