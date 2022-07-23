/**
 * @description 上传图片工具路由
 * @author qingsds
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const formidableUploadKoa = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')
router.post(
  '/upload',
  loginRedirect,
  formidableUploadKoa(),
  async (ctx, next) => {
    const uploadFile = ctx.req.files['file']
    const { name, path, size, type } = uploadFile
    ctx.body = await saveFile({
      name,
      filePath: path,
      size,
      type,
    })
  }
)

module.exports = router
