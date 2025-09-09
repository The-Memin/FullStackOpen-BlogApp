const { test, expect, beforeEach, describe } = require('@playwright/test')
const {showLoginForm, loginWith, createBlog,likeBlog , TEST_USER } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: { username: TEST_USER.username, name: TEST_USER.name, password: TEST_USER.password },
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Log in to application')).toBeVisible()
        await showLoginForm(page)
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            loginWith(page, { username: TEST_USER.username, password: TEST_USER.password })
            await expect(page.getByText(`${TEST_USER.name} logged in`)).toBeVisible()
        } )
        test('fails with wrong credentials', async ({ page }) => {
            loginWith(page, { username: TEST_USER.username, password: 'wrong' })
            await expect(page.getByText('Wrong username or password')).toBeVisible()
            await expect(page.getByText(`${TEST_USER.name} logged in`)).not.toBeVisible()
            const errorDiv = page.locator('.error')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
        })

        describe('When logged in', () => {
               beforeEach(async ({ page }) => {
                    loginWith(page, { username: TEST_USER.username, password: TEST_USER.password })
               })
               test('a new blog can be created', async ({ page }) => {
                    createBlog(page, { title: 'a blog created by playwright', author: 'playwright', url: 'http://playwright.dev' })
                    await expect(page.getByText(`a new blog You're NOT gonna need it! by playwright added`)).toBeVisible()
                    await expect(page.getByText('a blog created by playwright')).toBeVisible()
               })
               describe('and several blogs exist', () => {
                    beforeEach(async ({ page, request }) => {
                        await createBlog(page, { title: 'first blog', author: TEST_USER.username, url: 'http://first.blog' })
                        await createBlog(page, { title: 'second blog', author: 'author2', url: 'http://second.blog' })
                        await createBlog(page, { title: 'third blog', author: 'author3', url: 'http://third.blog' })
                    })
                    test('one of those can be liked', async ({ page }) => {
                        await page.pause()
                        await page.getByText('second blog').getByRole('button', { name: 'view' }).click()
                        const blogContainer = await page.getByText('second blog').locator('..')
                        await blogContainer.getByRole('button', { name: 'like' }).click()
                        await expect(blogContainer.getByText('Likes: 1')).toBeVisible()
                    })
                    test('one of those can be deleted', async ({ page }) => {
                        await page.getByText('first blog').getByRole('button', { name: 'view' }).click()
                        const blogContainer = await page.getByText('first blog').locator('..')

                        page.once('dialog', async dialog => {
                            expect(dialog.type()).toBe('confirm')
                            expect(dialog.message()).toBe(`Remove blog You're NOT gonna need it! by ${TEST_USER.username}`)
                            await dialog.accept()
                        })

                        await blogContainer.getByRole('button', { name: 'remove' }).click()
                        await expect(page.getByText('first blog')).not.toBeVisible()
                    })

                    test('delete button is only shown for blogs created by the logged in user', async ({ page, request }) => {
                        await page.getByText('first blog').getByRole('button', { name: 'view' }).click()
                        const blogContainer1 = await page.getByText('first blog').locator('..')
                        await expect(blogContainer1.getByRole('button', { name: 'remove' })).toBeVisible()

                        await page.getByText('second blog').getByRole('button', { name: 'view' }).click()
                        const blogContainer = await page.getByText('second blog').locator('..')
                        await expect(blogContainer.getByRole('button', { name: 'remove' })).not.toBeVisible()

                        await page.getByText('third blog').getByRole('button', { name: 'view' }).click()
                        const blogContainer3 = await page.getByText('third blog').locator('..')
                        await expect(blogContainer3.getByRole('button', { name: 'remove' })).not.toBeVisible()
                    })

                    test('blogs are ordered according to likes', async ({ page, request }) => {
                        await likeBlog(page,'second blog', 2)
                        await likeBlog(page,'third blog', 1)
                        
                        const blogContainers = await page.locator('.blog').all()
                        await expect(blogContainers[0]).toContainText('second blog')
                        await expect(blogContainers[1]).toContainText('third blog')
                        await expect(blogContainers[2]).toContainText('first blog')
                    })
               })
        })
    })
})