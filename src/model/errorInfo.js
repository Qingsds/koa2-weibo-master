/**
 * @description 失败信息集合
 * @author qingsds
 */

module.exports = {
    // 用户名已存在
    registerUserNameIsExistInfo: {
        errno: 10001,
        message: "用户名已存在 请检查",
    },
    // 注册失败
    registerFailInfo: {
        errno: 10002,
        message: "注册失败 请重试",
    },
    registerUserNameNotExistInfo: {
        errno: 10003,
        message: "用户名不存在，可以注册",
    },
    loginFailInfo: {
        errno: 10004,
        message: "登录失败 请检查您的用户名和密码",
    },
    loginCheckFailInfo: {
        errno: 10005,
        message: "当前未登录",
    },
    changePasswordFailInfo: {
        errno: 10007,
        message: "修改密码失败",
    },
    changeInfoFailInfo: {
        errno: 10008,
        message: "修改基本信息失败",
    },
    jsonSchemaFailInfo: {
        errno: 10009,
        message: "数据格式校验不通过 请检查",
    },
    // 删除用户失败
    deleteUserFailInfo: {
        errno: 10010,
        message: "删除用户失败",
    },
    // 添加关注失败
    addFollowerFailInfo: {
        errno: 10011,
        message: "添加关注失败",
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        errno: 10012,
        message: "取消关注失败",
    },
    // 创建微博失败
    createBlogFailInfo: {
        errno: 11001,
        message: "创建微博失败，请重试",
    },
    // 删除微博失败
    deleteBlogFailInfo: {
        errno: 11002,
        message: "删除微博失败，请重试",
    },
    // 上传文件失败
    uploadFileFailInfo: {
        errno: 11003,
        message: "图片过大, 请重试",
    },
}
