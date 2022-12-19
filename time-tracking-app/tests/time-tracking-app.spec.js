const { test, expect } = require("@playwright/test");
const {
  calenderYear,
  localDay,
  localMonth,
  localYear,
} = require("../src/data/calenderData");

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

test("open, interact add and delete project", async ({ page }) => {
  await page.route("**/projects", async (route, request) => {
    console.log(request.postData());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          name: "Create Website",
          color: "pink",
          id: 1,
        },
      ]),
    });
  });
  await page.route("**/projects/1", async (route, request) => {
    console.log(request.postData());
    await route.fulfill({
      status: 200,
    });
  });
  await page.route("**/tasks", async (route, request) => {
    console.log(request.postData());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Time tracking app/);
  await expect(page).toHaveURL(/.*/);

  await page.getByText("Add a Project").click();

  await page.getByPlaceholder("Project name").fill("Create Website");
  await page.getByTestId("selectColor").click();
  await page.getByTestId("colorPink").click();

  await Promise.all([
    page.waitForResponse("**/projects"),
    page.getByText("Add Project").click(),
  ]);

  const projectName = page.getByTestId("Create Website");
  await expect(projectName).toBeVisible();

  const deleteButton = page.getByTestId("Create Website-delete");

  await Promise.all([
    page.waitForResponse("**/projects/1"),
    deleteButton.click(),
  ]);
});

test("open, interact add and delete task", async ({ page }) => {
  await page.route("**/projects", async (route, request) => {
    console.log(request.postData());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          name: "Create Website",
          color: "pink",
          id: 1,
        },
      ]),
    });
  });
  await page.route("**/tasks", async (route, request) => {
    console.log(request.postData());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          project: "Create Website",
          color: "pink",
          name: "Create Button",
          date: "23 November 2022",
          time: "00:00:00",
          seconds: 0,
          projectId: "1",
          id: 1,
        },
      ]),
    });
  });
  await page.route("**/tasks/1", async (route, request) => {
    console.log(request.postData());
    await route.fulfill({
      status: 200,
    });
  });
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Time tracking app/);
  await expect(page).toHaveURL(/.*/);

  const overviewButton = page.getByText("Tasks");
  await overviewButton.click();
  await expect(overviewButton).toBeEnabled();

  await page.getByText("Add a Task").click();

  await page.getByPlaceholder("Task name").fill("Create Button");
  await page.getByTestId("selectProject").click();
  await page.getByTestId("Create Website").click();

  const calenderDate = page.getByTestId("date");
  await expect(calenderDate).toHaveText(
    `${Object.keys(calenderYear)[localMonth - 1]} ${localYear}`
  );

  const backButton = page.getByTestId("backButton");
  const forwardButton = page.getByTestId("forwardButton");
  await forwardButton.click();
  await backButton.click();

  const dayButton = page.getByTestId(`${localDay}`);
  await expect(dayButton).toBeVisible();
  await expect(dayButton).toHaveCSS("background-color", "rgb(255, 192, 203)");
  await dayButton.click();

  await Promise.all([
    page.waitForResponse("**/tasks"),
    page.getByText("Add Task").click(),
  ]);

  const taskName = page.getByTestId("Create Button");
  await expect(taskName).toBeVisible();

  const deleteButton = page.getByTestId("Create Button-delete");

  await Promise.all([page.waitForResponse("**/tasks/1"), deleteButton.click()]);
});
