import { Category, Country, CreditReport, CreditScore } from "./types";
/**
 *
 * @param creditReport the credit report for a user
 * @returns a credit score with a value and category
 */
export const getCreditScore = (creditReport: CreditReport): CreditScore => {
  let value = getValue(creditReport);
  let overDueInvoicePerc = overDueInvoicePercentage(creditReport);
  value = unpaidInvoicesImpact(overDueInvoicePerc, value);
 
  return {
    value: value,
    category: getCategory(value, creditReport.country)
  }
};

/**
 * @param value value to calculate percentage
 * @param total total value
 * @returns percentage with 2 decimal places. E.g. 0.25
 */
const calculatePercentage = (value: number, total: number) => {
  return Math.round((value / total) * 100) / 100;
};

/**
 * @param value value to calculate percentage
 * @param total total value
 * @returns percentage with 2 decimal places. E.g. 0.25
 */
const overDueInvoicePercentage = (creditReport: CreditReport): number  => {
  const totalInvoices = creditReport.paymentHistory.length;
  let unpaidInvoices = 0;

  for (const invoice of creditReport.paymentHistory) {
    if (invoice.status == "UNPAID" && invoice.dueDate < new Date()) {
      unpaidInvoices++;
    }
  }

  return calculatePercentage(unpaidInvoices, totalInvoices);
};

/**
 * @param unpaidInvoicesPercentage the unpaid imvoices percentage
 * @param value credit score value
 * @returns value
 */
const unpaidInvoicesImpact = (unpaidInvoicesPercentage: number, value: number): number  => {
  let updatedValue = value;

  if (unpaidInvoicesPercentage > .8) {
    updatedValue = updatedValue * 0.5;
  } else if(unpaidInvoicesPercentage >= 0.4 && unpaidInvoicesPercentage  <= 0.8 ) {
    updatedValue = updatedValue * 0.75;
  }

  return updatedValue;
};

/**
 * @param value value
 * @returns category 
 */
const getCategory = (value: number, country: Country = "UK"): Category => {
  // {min:990 category: "excellen"}

  if (country == "UK") {
    if (value <=560) {
      return "very poor";
    } else if (value > 560 && value <= 720) {
      return "poor";
    } else if (value > 720 && value <= 880) {
      return "fair";
    } else if (value > 880 && value <= 960) {
      return "good";
    } else {
      return "excellent";
    }
  } else if(country == "US") {
    if (value <=580) {
      return "very poor";
    } else if (value > 580 && value <= 669) {
      return "fair";
    } else if (value > 669 && value <= 739) {
      return "good";
    } else if (value > 739 && value <= 799) {
      return "very good";
    } else if (value > 799 && value <= 850) {
      return "exceptional";
    } else {
      return "excellent";
    }
  }

  throw new Error("invalid input");
};


/**
 * @param value value
 * @returns category 
 */
const getValue = (creditReport: CreditReport): number => {
  const creditUtilizationPercentage = creditReport.creditUtilisationPercentage;
  const paymentHistory = creditReport.paymentHistory;
  let value;
  if (paymentHistory.length == 0 && creditUtilizationPercentage == 0) {    
    value = 880;
  } else if (creditUtilizationPercentage < 0.3) {
    value = 999;
  } else if (creditUtilizationPercentage > 0.3 && creditUtilizationPercentage <= 0.5) {
    value = 960;
  } else if (creditUtilizationPercentage > 0.5 && creditUtilizationPercentage <= 0.7) {
    value = 880;
  } else if (creditUtilizationPercentage > 0.7 && creditUtilizationPercentage <= 0.9) {
    value = 720;
  } else {
    value = 560;
  }

  return value;
};
