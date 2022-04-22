/**
 * @description utils controller
 * @author qingsds
 */
const path = require("path")
const fsExtra = require("fs-extra")
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { uploadFileFailInfo } = require("../model/errorInfo")

// 1M
const MAX_SIZE = 1024 * 1024 * 1024
const DEST_FILES_PATH = path.join(__dirname, "..", "..", "uploadFiles")

// 判断文件夹是否存在
fsExtra.pathExists(DEST_FILES_PATH).then(exist => {
    if (!exist) {
        fsExtra.ensureDir(DEST_FILES_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} filePath 文件路径
 * @param {number} size 文件大小
 * @param {string} type 文件类型
 */
async function saveFile({ name, filePath, size, type }) {
    // 首先判断文件大小,过大直接返回错误提示
    if (size > MAX_SIZE) {
        // 删除文件
        await fsExtra.remove(filePath)
        return new ErrorModel(uploadFileFailInfo)
    }

    // 移动文件
    const fileName = Date.now() + "." + name
    const destFilePath = path.join(DEST_FILES_PATH, fileName)
    await fsExtra.move(filePath, destFilePath)

    return new SuccessModel({
        url: "/" + fileName,
    })
}

module.exports = { saveFile }
