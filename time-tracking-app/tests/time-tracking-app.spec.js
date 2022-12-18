const { test, expect } = require("@playwright/test");

test("navigate between pages", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Time tracking app/);
  await expect(page).toHaveURL(/.*/);

  const overviewButton = page.getByTestId("buttonId-overview");
  const historyButton = page.getByTestId("buttonId-history");
  const timerButton = page.getByTestId("buttonId-timer");

  await historyButton.click();

  await expect(page).toHaveTitle(/Task history/);
  await expect(page).toHaveURL(/.*History/);

  await timerButton.click();

  await expect(page).toHaveTitle(/Task timer/);
  await expect(page).toHaveURL(/.*Timer/);

  await overviewButton.click();

  await expect(page).toHaveTitle(/Time tracking app/);
  await expect(page).toHaveURL(/.*/);
});

test("open, interact and add project", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Time tracking app/);
  await expect(page).toHaveURL(/.*/);

  await page.getByText("Add a Project").click();

  await page.getByPlaceholder("Project name").fill("Create Website");
  await page.getByTestId("selectColor").click();
  await page.getByTestId("colorPink").click();
  await page.getByText("Add Project").click();
});
