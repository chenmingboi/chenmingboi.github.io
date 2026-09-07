# Mingbo Chen · Academic Homepage

面向 Computer Systems / LLM Systems 的个人学术主页，保持简洁的白底、双栏和文献列表布局。

线上地址：[mingbochen.github.io](https://mingbochen.github.io/)
内容维护：[使用手册](./使用手册.md) · 审查记录：[AUDIT.md](./AUDIT.md)

## 架构

- React 19 + Vite 8，沿用现有单页锚点架构。
- Tailwind CSS 3 的基础样式与本地 CSS；无外部字体、分析脚本或运行时第三方请求。
- `src/data/profile.js` 是个人内容与 SEO 元数据的唯一维护入口。
- `npm run build` 先构建客户端，再用同一份 React 组件预渲染完整 HTML。正式页面在 JavaScript 不可用时仍可阅读、导航和展开 BibTeX。
- GitHub Actions 检查后发布 `dist/` 到 GitHub Pages；无后台服务。

## 开发与验证

使用 Node.js 24 或更新版本（CI 使用 24）：

```bash
npm ci
npm run dev
```

提交前：

```bash
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

浏览器访问 `http://127.0.0.1:4173/`，检查桌面和 320px / 390px 手机宽度。

可选的独立 QA 页面：

```bash
npm run preview:fixtures
```

- `http://127.0.0.1:4174/no-js`：不包含客户端 JavaScript 的正式内容。
- `http://127.0.0.1:4174/populated`：明确标注为测试数据的长论文、项目、奖项和 BibTeX。
- 测试页面仅监听本机，不写入 `dist/`，不参与部署。先运行 build，更新代码后重启该 QA 服务。

## 内容原则

当前只填写已存在的姓名、NJU、邮箱，以及站主给出的两个研究方向。职务、学位、导师、论文、项目、奖项、照片和学术账号不能推测。

空项目和奖项栏目自动隐藏，相应导航同步隐藏。论文栏目保留简短状态。新增链接时使用真实地址；本地 PDF 放在 `public/`，以 `/文件名.pdf` 引用。

## 发布

`main` 的 push 或手动 workflow dispatch 会运行 lint、测试和构建，再发布 GitHub Pages。Pull request 运行相同检查但不部署。GitHub 仓库的 Pages Source 应为 GitHub Actions。

```bash
git push origin main
gh run list --workflow deploy.yml --limit 1
```

`dist/` 由构建生成，不提交。生产 robots.txt 和 sitemap.xml 由资料中的网址和更新时间生成。变更依赖后提交 package-lock.json，以保持 CI 可复现。

## 保留的旧文件

旧版玻璃特效、博客组件、模板图片、App.css 和自定义鼠标素材仍在仓库中，当前主页不导入它们；恢复这些模块之前需重新检查样式与数据接口。当前采用系统指针，尊重访问者的系统无障碍设置。
