import { expect } from '@playwright/test'

const TEST_USER = {
    name: 'TestUser',
    username: 'test-user',
    password: 'password123**'
}

const showLoginForm = async (page) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByPlaceholder('username')).toBeVisible()
    await expect(page.getByPlaceholder('password')).toBeVisible()
}

const loginWith = async (page, { username, password }) => {
    await showLoginForm(page)
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
    await page.getByRole('button', { name: 'create a new blog' }).click()
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(title).waitFor()
}

const likeBlog = async (page, title, times) => {
  const blogContainer = page.getByText(title).locator('..');
  await blogContainer.getByRole('button', { name: 'view' }).click();
  for (let i = 0; i < times; i++) {
    const expectedLikes = i + 1;
    await blogContainer.getByRole('button', { name: 'like' }).click();
    await expect(blogContainer).toContainText(`Likes: ${expectedLikes}`);
  }
  return blogContainer;
}

export {
    TEST_USER,
    showLoginForm,
    loginWith,
    createBlog,
    likeBlog
}