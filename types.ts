export type CreditScore = {
  value: number;
  category: Category;
};

export type Category = "fair" | "good" | "excellent" | "poor" | "very poor" | "very good" | "exceptional"; 
export type Country = "US" | "UK";

export type Invoice = {
  dueDate: Date;
  status: "PAID" | "UNPAID";
};

export type CreditReport = {
  paymentHistory: Invoice[];
  creditUtilisationPercentage: number; // percentage 0.2, 0.5
  country: "US" | "UK"
};
