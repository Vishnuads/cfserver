
import crypto from "crypto";
import axios from "axios";
import PaymentModel from "../Models/paymentModel.js";

 

  

// INITIATE PAYMENT
export const initiatePayment = async (req, res) => {
  try {
    const { amount, course } = req.body;

    const merchantId = process.env.PAYPHI_MERCHANT_ID;
    const secretKey = process.env.PAYPHI_SECRET_KEY;
    const baseURL = process.env.PAYPHI_BASE_URL;

    const merchantTxnNo = Date.now().toString();
    const now = new Date();
    const txnDate =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const returnURL = `${process.env.BACKEND_URL}/api/payphi/callback`;

    const allowedAmounts = [5000, 45000, 30000];
    if (!allowedAmounts.includes(Number(amount))) {
      return res.status(400).json({ message: "Invalid payment amount." });
    }

    const body = {
      merchantId,
      merchantTxnNo,
      amount: Number(amount).toFixed(2),
      currencyCode: "356",
      payType: "0",
      customerEmailID: "test@example.com",
      transactionType: "SALE",
      txnDate,
      returnURL,
      customerMobileNo: "919876543210",
      addlParam1: course || "General",
      addlParam2: "Test2",
    };

    const msg =
      body.addlParam1 +
      body.addlParam2 +
      body.amount +
      body.currencyCode +
      body.customerEmailID +
      body.customerMobileNo +
      body.merchantId +
      body.merchantTxnNo +
      body.payType +
      body.returnURL +
      body.transactionType +
      body.txnDate;

    body.secureHash = crypto
      .createHmac("sha256", secretKey)
      .update(msg)
      .digest("hex");

    const response = await axios.post(`${baseURL}/initiateSale`, body);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: "Payment initiation failed",
      error: err.response?.data || err.message,
    });
  }
};

// CALLBACK
export const paymentCallback = async (req, res) => {
  let data = {};

  try {
    if (
      req.is("application/json") ||
      req.is("application/x-www-form-urlencoded")
    ) {
      data = req.body;
    } else {
      req.setEncoding("utf8");
      let raw = "";
      for await (const chunk of req) raw += chunk;

      try {
        data = JSON.parse(raw);
      } catch {
        raw.split("&").forEach((pair) => {
          const [key, value] = pair.split("=");
          if (key) data[key] = decodeURIComponent(value || "");
        });
      }
    }

    const responseCode =
      data.responseCode ||
      data.ResponseCode ||
      data.code ||
      data.status ||
      req.query.responseCode;

    let paymentStatus = "failed";
    if (["R1000", "0000", "0", "SUCCESS"].includes(responseCode)) {
      paymentStatus = "success";
    }
    // 🔥 FIX: RETURN USER TO FINAL STEP (step=3)
    return res.redirect(
      `${process.env.CLIENT_URL}/apply?step=3&payment=${paymentStatus}&course=${
        data.addlParam1 || ""
      }&amount=${data.amount || ""}`
    ); 
  } catch (err) { 
    return res.status(500).json({
      message: "Callback error",
      error: err.message,
    });
  }
};





// export const paymentCallback = async (req, res) => {
//   let data = {};

//   try {
//     // -------- Parse PayPhi Callback --------
//     if (
//       req.is("application/json") ||
//       req.is("application/x-www-form-urlencoded")
//     ) {
//       data = req.body;
//     } else {
//       req.setEncoding("utf8");
//       let raw = "";
//       for await (const chunk of req) raw += chunk;

//       try {
//         data = JSON.parse(raw);
//       } catch {
//         raw.split("&").forEach((pair) => {
//           const [key, value] = pair.split("=");
//           if (key) data[key] = decodeURIComponent(value || "");
//         });
//       }
//     }

//     // PayPhi response codes
//     const responseCode =
//       data.responseCode ||
//       data.ResponseCode ||
//       data.code ||
//       data.status ||
//       req.query.responseCode;

//     let paymentStatus = "failed";
//     if (["R1000", "0000", "0", "SUCCESS"].includes(responseCode)) {
//       paymentStatus = "success";
//     }

//     // -------- SAVE PAYMENT IN DATABASE --------
//     await PaymentModel.create({
//       client: {
//         name: data.customerName || "",
//         email: data.customerEmailID || "",
//         phone: data.customerMobileNo || "",
//         fatherName: "",
//         fatherPhone: "",
//         age: "",
//         gender: "",
//         dob: "",
//         address: "",
//         city: "",
//         state: "",
//         country: "India",
//         courses: [data.addlParam1 || ""],
//       },
//       amount: Number(data.amount || 0),
//       transactionId: data.merchantTxnNo || "N/A",
//       status: paymentStatus,
//     });

//     console.log("🟢 Payment Saved to DB");

//     // -------- REDIRECT TO FRONTEND (STEP 3) --------
//     return res.redirect(
//       `http://localhost:3001/payment?step=3&payment=${paymentStatus}&course=${
//         data.addlParam1 || ""
//       }&amount=${data.amount || ""}`
//     );
//   } catch (err) {
//     console.error("Callback Error:", err);

//     return res.status(500).json({
//       message: "Callback error",
//       error: err.message,
//     });
//   }
// };

