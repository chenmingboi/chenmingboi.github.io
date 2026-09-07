# Academic homepage 审查记录

审查日期：2026-09-07。基线提交：`969e4ea`。目标站点：[mingbochen.github.io](https://mingbochen.github.io/)。

## 架构与审查范围

仓库是 React 19 + Vite 8 + Tailwind CSS 3 的单页项目，经 GitHub Actions 发布到 GitHub Pages。没有服务端、数据库或客户端路由，也没有 Sites 配置，继续使用已有部署方式。

阅读了全部入口与展示组件、profile 数据、CSS、构建/lint/Tailwind/PostCSS 配置、工作流、robots/sitemap、README 和中文手册；检查了锁文件、资源清单、Git 状态、远程 main 与既有发布记录。玻璃效果、博客组件、模板 CSS 和图片均不在当前页面导入链上，保留而不继续扩展。基线 lint/build 均成功。

## 六个维度的结论与处理

| 维度 | 基线问题 | 已实施 |
| --- | --- | --- |
| 内容结构 | About、Publications、Awards 几乎全是维护者占位提示；没有明确研究方向或可读邮箱 | 简介、研究兴趣、论文、可选项目/奖项、联系方式；隐藏空的可选栏目并同步导航；个人内容集中管理 |
| 视觉 | 1260px 宽内容、渐变头像、章节编号和大面积空状态；内容稀少时显得像未填写的模板 | 收窄到 1080px，克制的衬线章节标题、系统正文字体、细分隔线、平面缩写标识和小面积留白 |
| 移动端 | 小屏先展示大头像与大量留空提示；折叠菜单占用正文空间 | 760px 及以下单栏、紧凑横向简介、原生且持续可见的导航、44px 主要交互高度和长文本换行 |
| SEO | 手工 HTML fallback 与 React 数据重复维护，摘要声称存在未填写栏目；仍是 Vite favicon | 同源预渲染正文；统一 title/description/canonical/OG/Twitter；ProfilePage + Person；自动生成 sitemap/robots；MC favicon |
| Accessibility | 缺少跳过导航；灰色小字弱；移动菜单语义与焦点处理不足；动画前内容隐藏 | 完整 main/h1/章节标签；可见键盘焦点和固定 skip link；原生链接与 details；系统指针；减少动态效果和打印样式 |
| 工程 | 仅简单动画就加载约 323 KB JS；无内容回归检查；CI 未 lint；依赖存在公告 | 移除动画依赖，复用现有架构预渲染；资料/资源校验与 7 项回归检查；Node 24 和 CI 质量门；兼容依赖更新 |

内容边界：仅沿用 Mingbo Chen、NJU、邮箱，并加入任务明确给出的 Computer systems / LLM systems 研究兴趣。没有新增职务、学位、导师、履历、真实论文、项目、奖项或未确认账号。测试夹具使用 Test Researcher，并且不进入生产构建。

## 验证结果

- `npm run lint`：通过。
- `npm test`：7/7 通过。
- `npm run build`：通过；构建后 HTML 含完整正文、可解析 JSON-LD、单个主标题/主内容，UTF-8 声明位于头部；robots/sitemap 地址一致。
- 依赖：首次联网 npm audit 为 7 项（5 high、2 low），应用现有 semver 范围内更新后为 0 项。没有使用 force 或进行框架主版本迁移。
- 最终构建 JS：198.11 KB / gzip 61.90 KB；基线 322.96 KB / gzip 102.46 KB，压缩后减少约 39.6%。
- CSS：10.45 KB / gzip 3.25 KB；基线 16.09 KB / gzip 4.53 KB。这里报告文件体积，不把它当作真实网络性能或 Lighthouse 分数。

浏览器实际观察（Codex 内置 Chromium）：

| 场景 | 结果 |
| --- | --- |
| 原线上 1440×1000、390×844 | 检查原设计、空状态与移动菜单，确认与仓库一致 |
| 本地 production 1440×1000 | 双栏布局、章节层级和页脚正常，无横向溢出，无控制台错误/警告 |
| 本地 production 768×1024 | 双栏正常，正文与邮箱未溢出 |
| 本地 production 390×844、320×740 | 单栏正常，主导航持续可见，长邮箱可换行，无横向溢出 |
| 键盘 | Tab 显示 skip link，位置为视口顶部 8px；Enter 后焦点进入 main-content |
| 导航 | About / Publications / Contact 和 Back to top 抵达对应锚点；所有导航目标存在且唯一 |
| 无客户端脚本的 HTML | 手机下正文与样式可见、联系导航有效；没有 module script |
| 独立合成条目 320px | 长标题、作者、资源链接和长 BibTeX 均无横向溢出；原生 disclosure 可鼠标展开、Enter 关闭 |
| 开发模式 | 客户端渲染、导航正常，无 hydration 或运行错误 |
| 对比度 | 实测白底正文 13.98:1、辅助文字 6.12:1、链接 7.35:1 |

邮箱通过 DOM 检查真实 mailto 目标，不发送测试邮件。当前没有已确认的外部学术资源可做远端可用性验证。减少动态效果和打印规则做了代码检查，未将其称为真机系统偏好/打印机验证。未运行 Lighthouse、独立 axe 扫描、真实 iOS Safari、Firefox、屏幕阅读器或真实移动网络测试；不宣称完整 WCAG 合规认证或实测 Core Web Vitals。

## 遗留 TODO 与风险

1. 最有价值的内容工作：本人补充准确的当前身份、院系、研究问题和真实学术产出。仅有两个研究兴趣的主页仍然内容偏少，设计不能替代研究成果。
2. 在本人确认后添加 CV、论文、Code、BibTeX、Scholar/ORCID/GitHub。不能用搜索到的同名人员资料补全。
3. 真实头像、分享图片、中文姓名和可公开的完整履历暂未提供，因此未展示。
4. 用真实移动 Safari 和屏幕阅读器补测，尤其在论文/项目增多后检查导航换行、标题层级与长文本。
5. 旧 BlogPreview/GlassPanel、liquidGlass、App.css、模板 SVG/PNG 和 cursor 素材已保留，未引入页面。若以后希望清理，应单独确认删除范围。
6. GitHub Pages 控制服务器响应头；本次不添加假定可生效的服务端配置。搜索收录/排名仍需站主从 Search Console 观察。
7. 更新依赖时 Windows 提示一个旧 rolldown 二进制临时目录仍被运行中的预览进程占用；新依赖的构建和测试正常，该目录位于忽略的 node_modules，不在提交中。

## 修改文件

| 文件 | 变更 |
| --- | --- |
| `.github/workflows/deploy.yml` | Node 24；发布前 lint/test/build；PR 只验证；部署权限收敛到 deploy job。 |
| `README.md` | 更新架构、构建、验证、部署和旧文件说明。 |
| `eslint.config.js` | 覆盖新增 Node .mjs 脚本和测试，区分 Node 全局变量。 |
| `index.html` | 移除重复的占位正文和个人元数据，保留预渲染模板与编码信息。 |
| `package-lock.json` | 移除动画依赖并锁定兼容安全更新，含 Vite 8.2.2、PostCSS 8.5.28。 |
| `package.json` | 增加 Node 要求、测试和预渲染/QA 命令；移除 framer-motion。 |
| `public/favicon.svg` | 用轻量 MC 矢量标识替换 Vite 模板图标。 |
| `src/App.jsx` | 主内容语义、跳过导航、可选栏目和统一资料注入。 |
| `src/components/About.jsx` | 真实简介与研究兴趣的清晰层级。 |
| `src/components/Awards.jsx` | 空集合隐藏、年份排序、语义化条目。 |
| `src/components/Contact.jsx` | 由同一链接数组生成可读、可复制联系方式。 |
| `src/components/Footer.jsx` | 内容更新时间和原生返回顶部链接。 |
| `src/components/Hero.jsx` | 静态简介、克制的缩写标识和可选身份/资源。 |
| `src/components/Navbar.jsx` | 持续可见的原生锚点导航，小屏自动换行。 |
| `src/components/Projects.jsx` | 可选项目结构，支持角色、摘要和资源。 |
| `src/components/Publications.jsx` | 年份分组、作者顺序、原生 BibTeX disclosure 和可选资源。 |
| `src/components/Reveal.jsx` | 保留兼容包装组件，移除依赖滚动/动画才显示内容的行为。 |
| `src/data/profile.js` | 集中站点元数据、已确认个人信息与可选学术条目结构。 |
| `src/index.css` | 收敛布局与字级；对比度、焦点、小屏换行、系统指针、打印和减少动态效果。 |
| `src/main.jsx` | 生产 HTML hydration；开发空模板使用客户端渲染。 |
| `vite.config.js` | 从资料数据生成页面与分享元数据。 |
| `使用手册.md` | 更新内容字段、真实信息边界、验证和发布流程。 |

## 新增文件

| 文件 | 用途 |
| --- | --- |
| `AUDIT.md` | 记录全仓审查、改进依据、验证范围和遗留 TODO。 |
| `scripts/seo.mjs` | 生成一致的 SEO 标签与安全转义的 ProfilePage/Person JSON-LD。 |
| `scripts/validate-profile.mjs` | 验证必填字段、年份、日期、唯一 ID 与安全链接。 |
| `scripts/prerender.mjs` | 预渲染同一 React 页面，检查本地资源并生成抓取文件。 |
| `scripts/preview-fixtures.mjs` | 仅本机可访问的无脚本/合成内容 QA 服务，不发布测试页面。 |
| `tests/fixtures.mjs` | 明确标注的合成学术条目，用于边界布局与空数据测试。 |
| `tests/homepage.test.mjs` | 7 项资料、导航、空栏目、文献排序和 SEO 回归检查。 |

未删除任何受版本控制的文件。生成的 dist 和 node_modules 不提交。

## 下一步：补充真实研究内容并验证

在项目目录更新 `src/data/profile.js`，然后运行：

```bash
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

预期：检查全绿、页面展示准确的研究身份和至少一条有出处的学术内容（若确实存在）。评审标准：事实可核对、作者顺序和年份正确、资源可打开、320px 下不溢出、键盘导航完整。命令失败时先修复首个报错并复跑；内容尚未确认时继续留空，不以示例代替。
