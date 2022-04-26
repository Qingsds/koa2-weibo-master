/**
 * @description 用户关系单元测试
 * @author qingsds
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
    USER_ID,
    USER_NAME,
    COOKIE,
    _USER_ID,
    _USER_NAME,
} = require('../testUserInfo')

test('先取消关注', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: _USER_ID })
        .set('Cookie', COOKIE)

    expect(1).toBe(1)
})

test('lis 关注 qingsds, 结果应该成功', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({ userId: _USER_ID })
        .set('Cookie', COOKIE)

    expect(res.body.errno).toBe(0)
})

test('获取 qingsds 粉丝, 结果应该由 lis', async () => {
    const result = await getFans(_USER_ID)
    const { fansCount, fansList } = result.data
    const hasUserName = fansList.some(item => item.userName === USER_NAME)
    expect(fansCount > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

test('获取 lis 的关注人, 结果应该有 qingsds', async () => {
    const result = await getFollowers(USER_ID)
    const { followerCount, followers } = result.data
    const hasUserName = followers.some(item => item.userName === _USER_NAME)
    expect(followerCount > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

test('lis 取消关注 qingsds,结果应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: _USER_ID })
        .set('Cookie', COOKIE)

    expect(res.body.errno).toBe(0)
})
