import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExportExcel = ({ data, label }) => {
  const convertToLetter = (number) => {
    const asciiCode = 64 + number;
    const letter = String.fromCharCode(asciiCode);
    return letter;
  };
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();

    // Tạo sheet doanh thu
    console.log(data);
    data.forEach((sheet, index) => {
      let revenueSheet = workbook.addWorksheet(
        label[index].toLocaleLowerCase()
      );
      console.log(Object.keys(sheet[0]));
      const headers = Object.keys(sheet[0]).map((key) => {
        return { header: key, key: key, width: 15 };
      });

      // revenueSheet.title = 'Revenue Report';
      revenueSheet.columns = headers;

      const headerRow = revenueSheet.getRow(1);
      console.log(headerRow);
      headerRow._cells.forEach((item) => {
        item.style.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "43ff64d9" },
        };
      });
      headerRow.font = {
        color: { argb: "FFFFFFFF" },
        bold: true,
      };

      sheet.forEach((item) => {
        revenueSheet.addRow(item);
      });
      revenueSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
      // revenueSheet.spliceRows(1, 0, [Object.keys(sheet[0])[1].replace(/([A-Z])/g, ' $1').toUpperCase()]);
      console.log(label);
      revenueSheet.spliceRows(1, 0, [label[index]]);
      const length = Object.keys(sheet[0]).length;
      const postion = convertToLetter(length) + 1;
      console.log(postion);

      revenueSheet.mergeCells(`A1:${postion}`);
      const headerCell = revenueSheet.getCell("A1");
      headerCell.alignment = { horizontal: "center", vertical: "middle" };
    });

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "report.xlsx");
  };

  return (
    <div className="" onClick={exportToExcel}>
      Export to Excel
    </div>
  );
};

export default ExportExcel;
