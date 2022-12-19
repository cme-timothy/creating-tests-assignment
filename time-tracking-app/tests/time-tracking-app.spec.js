const { test, expect } = require("@playwright/test");
const {
  calenderYear,
  localDay,
  localMonth,
  localYear,
} = require("../src/data/calenderData");

const mockApi = async (page) => {
  await page.route("**/projects", async (route, request) => {
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
    await route.fulfill({
      status: 200,
    });
  });
  await page.route("**/tasks", async (route, request) => {
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
    await route.fulfill({
      status: 200,
    });
  });

  return page;
};

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
  mockApi(page);
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

  // see if newly created project exists in the list
  const projectName = page.getByTestId("Create Website");
  await expect(projectName).toBeVisible();

  // delete project
  const deleteButton = page.getByTestId("Create Website-delete");
  await Promise.all([
    page.waitForResponse("**/projects/1"),
    deleteButton.click(),
  ]);
});

test("open, interact add and delete task", async ({ page }) => {
  mockApi(page);
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Time tracking app/);
  await expect(page).toHaveURL(/.*/);

  // press tasks menu button
  const overviewButton = page.getByText("Tasks");
  await overviewButton.click();
  await expect(overviewButton).toBeEnabled();

  await page.getByText("Add a Task").click();

  await page.getByPlaceholder("Task name").fill("Create Button");

  // select project
  await page.getByTestId("selectProject").click();
  await page.getByTestId("Create Website").click();

  // test if calender has the correct starting date
  const calenderDate = page.getByTestId("date");
  await expect(calenderDate).toHaveText(
    `${Object.keys(calenderYear)[localMonth - 1]} ${localYear}`
  );

  const backButton = page.getByTestId("backButton");
  const forwardButton = page.getByTestId("forwardButton");
  await forwardButton.click();
  await backButton.click();

  // select date
  const dayButton = page.getByTestId(`${localDay}`);
  await expect(dayButton).toBeVisible();
  await expect(dayButton).toHaveCSS("background-color", "rgb(255, 192, 203)");
  await dayButton.click();

  await Promise.all([
    page.waitForResponse("**/tasks"),
    page.getByText("Add Task").click(),
  ]);

  // see if newly created task exists in the list
  const taskName = page.getByTestId("Create Button");
  await expect(taskName).toBeVisible();

  // delete task
  const deleteButton = page.getByTestId("Create Button-delete");
  await Promise.all([page.waitForResponse("**/tasks/1"), deleteButton.click()]);
});

test("select a date on the history page and see list", async ({ page }) => {
  mockApi(page);
  await page.goto("http://localhost:3000/History");
  await expect(page).toHaveTitle(/Task history/);
  await expect(page).toHaveURL(/.History/);

  await page.getByTestId("historySelect").click();
  await page.getByTestId("23 November 2022").click();
  const taskItem = page.getByTestId("Create Button");
  await expect(taskItem).toBeVisible();
});

test("start and stop a timer for a task", async ({ page }) => {
  mockApi(page);
  await page.goto("http://localhost:3000/Timer");
  await expect(page).toHaveTitle(/Task timer/);
  await expect(page).toHaveURL(/.Timer/);
  const timeText = page.getByTestId("Create Button-time");
  await expect(timeText).toHaveText("00:00:00");

  // start timer
  await Promise.all([
    page.getByTestId("Create Button-play").click(),
    await new Promise((resolve) => setTimeout(resolve, 5000)),
    expect(timeText).toHaveText("00:00:05"),
  ]);

  // stop timer
  await Promise.all([
    page.getByTestId("Create Button-play").click(),
    await new Promise((resolve) => setTimeout(resolve, 5000)),
    expect(timeText).toHaveText("00:00:05"),
  ]);
});
