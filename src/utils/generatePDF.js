import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import formatDate from "./formatDate";
import validateFields from "./validateFields";

if (pdfMake && pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
}

const generatePDF = (billData, setError) => {
  if (!validateFields(billData, setError)) return;

  const docDefinition = {
    content: [
      // **Company Name & Invoice Title**
      {
        text: "Company Name Pvt. Ltd.",
        fontSize: 20,
        bold: true,
        alignment: "center",
        color: "#0073e6",
        margin: [0, 0, 0, 5],
      },
      { text: "INVOICE", style: "header", alignment: "center" },

      // **Invoice Details**
      {
        columns: [
          [
            { text: `Invoice No: ${billData.number || "N/A"}`, bold: true },
            { text: `Date: ${formatDate(billData.date)}` },
          ],
          [
            {
              text: `GST No: ${billData.gst || "N/A"}`,
              alignment: "right",
              bold: true,
            },
            {
              text: `Due Date: ${billData.dueDate || "N/A"}`,
              alignment: "right",
            },
          ],
        ],
        margin: [0, 10, 0, 10],
      },

      // **Billing & Shipping Details**
      {
        columns: [
          [
            { text: "Billed To:", style: "subheader" },
            { text: `Name: ${billData.client || "N/A"}` },
            { text: `Contact: ${billData.contact || "N/A"}` },
            { text: `Address: ${billData.address || "N/A"}` },
          ],
          [
            {
              text: "Shipping Details:",
              style: "subheader",
              alignment: "right",
            },
            {
              text: `Name: ${
                billData.shippingName || billData.client || "N/A"
              }`,
              alignment: "right",
            },
            {
              text: `Contact: ${
                billData.shippingContact || billData.contact || "N/A"
              }`,
              alignment: "right",
            },
            {
              text: `Address: ${
                billData.shippingAddress || billData.address || "N/A"
              }`,
              alignment: "right",
            },
          ],
        ],
        margin: [0, 10, 0, 20],
      },

      // **Item Table**
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "auto", "auto", "auto"],
          body: [
            [
              { text: "Item", style: "tableHeader" },
              { text: "Description", style: "tableHeader" },
              { text: "Quantity", style: "tableHeader" },
              { text: "Price", style: "tableHeader" },
              { text: "Total", style: "tableHeader" },
            ],
            ...(billData.items || []).map((item) => [
              item.item || "N/A",
              item.description || "N/A",
              item.quantity || "0",
              `₹ ${parseFloat(item.price || 0).toFixed(2)}`,
              `₹ ${parseFloat(item.total || 0).toFixed(2)}`,
            ]),
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 10, 0, 20],
      },

      // **Total Breakdown**
      {
        columns: [
          { text: "" },
          {
            table: {
              body: [
                [
                  { text: "Subtotal:", bold: true },
                  `₹ ${billData.subtotal || "0.00"}`,
                ],
                [
                  { text: "Tax (18% GST):", bold: true },
                  `₹ ${billData.tax || "0.00"}`,
                ],
                [
                  { text: "Shipping Charges:", bold: true },
                  `₹ ${billData.shippingCharges || "0.00"}`,
                ],
                [
                  {
                    text: "Grand Total:",
                    bold: true,
                    fontSize: 14,
                    color: "#0073e6",
                  },
                  {
                    text: `₹ ${billData.total || "0.00"}`,
                    bold: true,
                    fontSize: 14,
                    color: "#0073e6",
                  },
                ],
              ],
            },
            layout: "noBorders",
            alignment: "right",
          },
        ],
        margin: [0, 10, 0, 20],
      },

      // **Footer Message**
      {
        text: "Thank you for your business!",
        style: "footer",
        alignment: "center",
      },
    ],

    // **Styles**
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 2] },
      tableHeader: {
        bold: true,
        fillColor: "#f0f0f0",
        color: "#000",
        margin: [0, 5, 0, 5],
      },
      footer: { fontSize: 10, italics: true, margin: [0, 10, 0, 0] },
    },
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Invoice_${billData.number || "N/A"}.pdf`);
  // resetForm();
};

export default generatePDF;
