import { expect, describe, it } from "vitest";
import { getCreditScore } from "./credit-score";

describe("getCreditScore", () => {

  //UK
  it("Country: UK - should return 560(very poor) if the credit utilisation is more than 90%", () => {
    const creditReport = {
      paymentHistory: [],
      country: "UK",
      creditUtilisationPercentage: 0.95,
    };

    const creditScore = getCreditScore(creditReport);

    expect(creditScore.value).toBe(560);
    expect(creditScore.category).toBe("very poor");
  });

  it("Country: UK - should return 720(poor) if the credit utilisation is between 70% and 90%", () => {
    const creditReport = {
      paymentHistory: [],
      country: "UK",
      creditUtilisationPercentage: 0.8,
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(720);
    expect(creditScore.category).toBe("poor");
  });

  it("Country: UK - should return 880(fair) if the credit utilisation is between 50% and 70%", () => {
    const creditReport = {
      paymentHistory: [],
      country: "UK",
      creditUtilisationPercentage: 0.6,
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(880);
    expect(creditScore.category).toBe("fair");
  });

  it("Country: UK - should return 960(good) if the credit utilisation is between 30% and 50%", () => {
    const creditReport = {
      paymentHistory: [],
      country: "UK",
      creditUtilisationPercentage: 0.4,
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(960);
    expect(creditScore.category).toBe("good");
  });

  it("Country: UK - should return 999(excellent) if the credit utilisation is less than 30%", () => {
    const creditReport = {
      paymentHistory: [],
      country: "UK",
      creditUtilisationPercentage: 0.2,
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(999);
    expect(creditScore.category).toBe("excellent");
  });

  it("Country: UK - should return 880(fair) if the credit utilisation is 0% and there is no payment history ", () => {
    const creditReport = {
      paymentHistory: [],
      country: "UK",
      creditUtilisationPercentage: 0,
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(880);
    expect(creditScore.category).toBe("fair");
  });

  it("Country: UK - should return 480(very poor) if the credit utilisation is between 30% and 50% - and more that 80% invoices are overdue", () => {
    const creditReport = {
      paymentHistory: [{status: "UNPAID", dueDate: new Date("1970-01-01")}],
      creditUtilisationPercentage: 0.4,
      country: "UK",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(480);
    expect(creditScore.category).toBe("very poor");
  });

  it("Country: UK - should return 720(poor) if the credit utilisation is between 30% and 50% - and overdue invoices are between 40% and 80%", () => {
    const creditReport = {
      paymentHistory: [{status: "UNPAID", dueDate: new Date("1970-01-01")}, {status: "UNPAID", dueDate: new Date("2033-01-01")}],
      creditUtilisationPercentage: 0.4,
      country: "UK",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(720);
    expect(creditScore.category).toBe("poor");
  });

  // US
  it("Country: US - should return 560(very poor) if the credit utilisation is more than 90%", () => {
    const creditReport = {
      paymentHistory: [],
      creditUtilisationPercentage: 0.95,
      country: "US",
    };

    const creditScore = getCreditScore(creditReport);

    expect(creditScore.value).toBe(560);
    expect(creditScore.category).toBe("very poor");
  });

  it("Country: US - should return 720(good) if the credit utilisation is between 70% and 90%", () => {
    const creditReport = {
      paymentHistory: [],
      creditUtilisationPercentage: 0.8,
      country: "US",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(720);
    expect(creditScore.category).toBe("good");
  });

  it("Country: US - should return 880(excellent) if the credit utilisation is between 50% and 70%", () => {
    const creditReport = {
      paymentHistory: [],
      creditUtilisationPercentage: 0.6,
      country: "US",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(880);
    expect(creditScore.category).toBe("excellent");
  });

  it("Country: US - should return 960(good) if the credit utilisation is between 30% and 50%", () => {
    const creditReport = {
      paymentHistory: [],
      creditUtilisationPercentage: 0.4,
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(960);
    expect(creditScore.category).toBe("good");
  });

  it("Country: US - should return 999(excellent) if the credit utilisation is less than 30%", () => {
    const creditReport = {
      paymentHistory: [],
      creditUtilisationPercentage: 0.2,
      country: "US"
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(999);
    expect(creditScore.category).toBe("excellent");
  });

  it("Country: US - should return 880(fair) if the credit utilisation is 0% and there is no payment history ", () => {
    const creditReport = {
      paymentHistory: [],
      creditUtilisationPercentage: 0,
      country: "US",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(880);
    expect(creditScore.category).toBe("excellent");
  });

  it("Country: US - should return 480(very poor) if the credit utilisation is between 30% and 50% - and more that 80% invoices are overdue", () => {
    const creditReport = {
      paymentHistory: [{status: "UNPAID", dueDate: new Date("1970-01-01")}],
      creditUtilisationPercentage: 0.4,
      country: "US",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(480);
    expect(creditScore.category).toBe("very poor");
  });

  it("Country: US - should return 720(good) if the credit utilisation is between 30% and 50% - and overdue invoices are between 40% and 80%", () => {
    const creditReport = {
      paymentHistory: [{status: "UNPAID", dueDate: new Date("1970-01-01")}, {status: "UNPAID", dueDate: new Date("2033-01-01")}],
      creditUtilisationPercentage: 0.4,
      country: "US",
    };
    const creditScore = getCreditScore(creditReport);
    expect(creditScore.value).toBe(720);
    expect(creditScore.category).toBe("good");
  });
});
