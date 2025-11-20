import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Simple PDF content - in production, use a proper PDF library
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
/F2 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj
4 0 obj
<<
/Length 2000
>>
stream
BT
/F1 28 Tf
100 750 Td
(WealthWise Finance Planner) Tj
0 -40 Td
/F2 14 Tf
(Complete Budgeting & Investment Tracking System) Tj
0 -60 Td
/F1 20 Tf
(MONTHLY BUDGET WORKSHEET) Tj
0 -40 Td
/F2 12 Tf
(Income Sources) Tj
0 -25 Td
(Salary/Wages: $____________) Tj
0 -20 Td
(Other Income: $____________) Tj
0 -20 Td
(Total Income: $____________) Tj
0 -40 Td
/F1 16 Tf
(Expenses) Tj
0 -25 Td
/F2 12 Tf
(Housing (Rent/Mortgage): $____________) Tj
0 -20 Td
(Utilities: $____________) Tj
0 -20 Td
(Groceries: $____________) Tj
0 -20 Td
(Transportation: $____________) Tj
0 -20 Td
(Insurance: $____________) Tj
0 -20 Td
(Entertainment: $____________) Tj
0 -20 Td
(Savings: $____________) Tj
0 -20 Td
(Other: $____________) Tj
0 -25 Td
(Total Expenses: $____________) Tj
0 -40 Td
/F1 16 Tf
(Net Income: $____________) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000295 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
395
%%EOF`

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="WealthWise-Finance-Planner.pdf"')
  res.send(Buffer.from(pdfContent))
}

