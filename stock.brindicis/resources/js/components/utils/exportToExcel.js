import ExcelJS from 'exceljs';
import { fetchVariants } from '../../api/productVariantsApi';
import { toast } from 'react-toastify';

export const exportToExcel = async (products, token) => {

    if (products.length === 0) {
        toast.info('Sem produtos para exportar!');
        return;
    }

    const workbook = new ExcelJS.Workbook();

    const response = await fetchVariants(token);
    const variants = response;

    /* Folha 1: Produtos */
    const worksheet = workbook.addWorksheet('Produtos');

    worksheet.columns = [
        { header: '#', key: 'index', width: 5 },
        { header: 'Tipo', key: 'type', width: 15 },
        { header: 'Ref', key: 'ref', width: 15 },
        { header: 'Cor', key: 'color', width: 15 },
        { header: 'Nome', key: 'name', width: 25 },
        { header: 'Número', key: 'number', width: 10 },
        { header: 'Descrição', key: 'description', width: 25 },
        { header: 'Quantidade', key: 'quantity', width: 15 },
        { header: 'Gaveta', key: 'drawer', width: 15 },
        { header: 'Cx', key: 'cx', width: 10 },
        { header: 'PVP', key: 'pvp', width: 10 },
        { header: 'Categoria', key: 'category', width: 15 },
        { header: 'Família', key: 'family', width: 15 },
        { header: 'Estado', key: 'state', width: 10 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D3D3D3' },
        };
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });

    products.forEach((product, index) => {
        const row = worksheet.addRow({
            index: index + 1,
            type: product?.type ?? 'N/A',
            ref: product?.ref ?? 'N/A',
            color: product.colors.length === 1 ? product.colors[0].name : product.colors.length === 2
                ? `${product.colors[0].name}, ${product.colors[1].name}` : product.colors.length > 2 ? `${product.colors[0].name}, ${product.colors[1].name} + ${product.colors.length - 2}` : 'N/A',
            name: product?.name ?? 'N/A',
            number: product?.number ?? 'N/A',
            description: product?.description ?? 'N/A',
            quantity: product?.quantity ?? 0,
            drawer: product?.drawer ?? 'N/A',
            cx: product?.cx ?? 'N/A',
            pvp: `${product?.pvp} €` ?? 'N/A',
            category: product?.category?.name ?? 'N/A',
            family: product?.family?.name ?? 'N/A',
            state: product?.active === 1 ? 'Ativo' : 'Desativo',
        });

        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            cell.alignment = {
                horizontal: 'center',
                vertical: 'middle',
            };
        });
    });

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return;

        const quantityCell = row.getCell(8);
        const stateCell = row.getCell(14);

        if (quantityCell.value === 0) {
            quantityCell.font = { color: { argb: 'FF0000' } };
        }
        quantityCell.alignment = { horizontal: 'center', vertical: 'middle' };

        if (stateCell.value === 'Ativo') {
            stateCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '008000' } };
            stateCell.font = { color: { argb: 'FFFFFF' } };
        } else if (stateCell.value === 'Desativo') {
            stateCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000' } };
            stateCell.font = { color: { argb: 'FFFFFF' } };
        }
        stateCell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
            const cellValue = cell.value ? cell.value.toString() : '';
            maxLength = Math.max(maxLength, cellValue.length);
        });
        column.width = maxLength + 2;
    });

    /* Folha 2: Variantes */
    const worksheetVariants = workbook.addWorksheet('Variantes');

    worksheetVariants.columns = [
        { header: '#', key: 'index', width: 5 },
        { header: 'Ref', key: 'ref', width: 30 },
        { header: 'Cor', key: 'color', width: 20 },
        { header: 'Tamanho', key: 'size', width: 15 },
        { header: 'Quantidade', key: 'quantity', width: 15 },
    ];

    worksheetVariants.getRow(1).eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D3D3D3' },
        };
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });


    const variantsByRef = {};

    variants.forEach(variant => {
        if (!variantsByRef[variant.ref]) variantsByRef[variant.ref] = [];
        variantsByRef[variant.ref].push(variant);
    });

    let rowIndex = 2;

    Object.entries(variantsByRef).forEach(([ref, refVariants]) => {

        const variantsByColor = {};
        refVariants.forEach(variant => {
            if (!variantsByColor[variant.color]) variantsByColor[variant.color] = [];
            variantsByColor[variant.color].push(variant);
        });

        Object.entries(variantsByColor).forEach(([color, colorVariants]) => {

            const variantsBySize = {};
            colorVariants.forEach(variant => {
                const size = variant?.size || 'N/A';
                if (!variantsBySize[size]) variantsBySize[size] = 0;
                variantsBySize[size] += variant.quantity;
            });


            Object.entries(variantsBySize).forEach(([size, totalQuantity]) => {
                const row = worksheetVariants.addRow({
                    index: rowIndex++,
                    ref: ref,
                    color: color,
                    size: size,
                    quantity: totalQuantity,
                });

                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    cell.alignment = {
                        horizontal: 'center',
                        vertical: 'middle',
                    };
                });
            });
        });

        const emptyRow1 = worksheetVariants.addRow([]);
        const emptyRow2 = worksheetVariants.addRow([]);
        [emptyRow1, emptyRow2].forEach(row => {
            for (let col = 1; col <= 5; col++) {
                const cell = row.getCell(col);
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'D3D3D3' },
                };
            }
        });
    });

    worksheetVariants.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return;

        const quantityCell = row.getCell(5);

        if (quantityCell.value === 0) {
            quantityCell.font = { color: { argb: 'FF0000' } };
        }
        quantityCell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Lista_Produtos&Variantes.xlsx';
    link.click();
};
