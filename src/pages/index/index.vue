<template>
  <view class="resume-editor">
    <!-- 顶部导航 -->
    <wd-navbar 
      title="简历编辑" 
      left-text="返回"
      @click-left="goBack"
      :border="false"
      custom-style="background-color: #4f46e5;"
    >
      <template #right>
        <view class="nav-actions">
          <wd-button 
            size="small" 
            type="success" 
            @click="previewResume"
            custom-style="margin-right: 8px;"
          >
            预览
          </wd-button>
          <wd-button 
            size="small" 
            type="primary" 
            @click="exportToPDF"
          >
            导出PDF
          </wd-button>
        </view>
      </template>
    </wd-navbar>

    <!-- 主体内容 -->
    <view class="editor-container">
      <!-- 侧边栏 - 编辑表单 -->
      <view class="editor-sidebar">
        <scroll-view scroll-y class="sidebar-scroll">
          <!-- 模板选择 -->
          <view class="section">
            <view class="section-title">选择模板</view>
            <view class="template-selector">
              <view 
                v-for="(template, index) in templates" 
                :key="index"
                class="template-item"
                :class="{ active: currentTemplate === index }"
                @click="selectTemplate(index)"
              >
                <image :src="template.thumbnail" class="template-thumb" />
                <text class="template-name">{{ template.name }}</text>
              </view>
            </view>
          </view>

          <!-- 基本信息 -->
          <view class="section">
            <view class="section-title">基本信息</view>
            <wd-cell-group>
              <wd-input 
                v-model="resumeData.basic.name"
                label="姓名"
                placeholder="请输入姓名"
                required
              />
              <wd-input 
                v-model="resumeData.basic.age"
                label="年龄"
                placeholder="请输入年龄"
                type="number"
              />
              <wd-input 
                v-model="resumeData.basic.phone"
                label="手机号"
                placeholder="请输入手机号"
                type="tel"
              />
              <wd-input 
                v-model="resumeData.basic.email"
                label="邮箱"
                placeholder="请输入邮箱"
                type="email"
              />
              <wd-input 
                v-model="resumeData.basic.position"
                label="求职意向"
                placeholder="请输入求职意向"
              />
              <wd-input 
                v-model="resumeData.basic.salary"
                label="期望薪资"
                placeholder="请输入期望薪资"
              />
              <wd-input 
                v-model="resumeData.basic.city"
                label="期望城市"
                placeholder="请输入期望城市"
              />
            </wd-cell-group>
          </view>

          <!-- 个人优势 -->
          <view class="section">
            <view class="section-title">个人优势</view>
           
            <view class="advantage-list">
              <view 
                v-for="(item, index) in resumeData.advantages" 
                :key="index"
                class="advantage-item"
              >
                <wd-textarea 
                  v-model="resumeData.advantages[index]"
                  :placeholder="`优势 ${index + 1}`"
                  :maxlength="200"
                  show-word-limit
                />
                <wd-button 
                  type="error" 
                  size="small" 
                  @click="removeAdvantage(index)"
                  custom-style="margin-top: 8px;"
                >
                  删除
                </wd-button>
              </view>
              <wd-button 
                type="primary" 
                plain 
                @click="addAdvantage"
                custom-style="margin-top: 8px;"
              >
                + 添加优势
              </wd-button>
            </view>
          </view>

          <!-- 工作经历 -->
          <view class="section">
            <view class="section-title">工作经历</view>
            <view class="experience-list">
              <view 
                v-for="(exp, index) in resumeData.workExperience" 
                :key="index"
                class="experience-item"
              >
                <wd-cell-group>
                  <wd-input 
                    v-model="exp.company"
                    label="公司名称"
                    placeholder="请输入公司名称"
                  />
                  <wd-input 
                    v-model="exp.position"
                    label="职位"
                    placeholder="请输入职位"
                  />
                  <wd-input 
                    v-model="exp.duration"
                    label="工作时间"
                    placeholder="如：2024.02-2025.03"
                  />
                </wd-cell-group>
                <wd-button 
                  type="error" 
                  size="small" 
                  @click="removeExperience(index)"
                  custom-style="margin-top: 8px;"
                >
                  删除
                </wd-button>
              </view>
              <wd-button 
                type="primary" 
                plain 
                @click="addExperience"
                custom-style="margin-top: 8px;"
              >
                + 添加工作经历
              </wd-button>
            </view>
          </view>

          <!-- 项目经历 -->
          <view class="section">
            <view class="section-title">项目经历</view>
            <view class="project-list">
              <view 
                v-for="(project, index) in resumeData.projects" 
                :key="index"
                class="project-item"
              >
                <wd-cell-group>
                  <wd-input 
                    v-model="project.name"
                    label="项目名称"
                    placeholder="请输入项目名称"
                  />
                  <wd-input 
                    v-model="project.tech"
                    label="技术栈"
                    placeholder="请输入技术栈"
                  />
                  <wd-textarea 
                    v-model="project.description"
                    label="项目描述"
                    placeholder="请输入项目描述"
                    :maxlength="500"
                    show-word-limit
                  />
                </wd-cell-group>
                <wd-button 
                  type="error" 
                  size="small" 
                  @click="removeProject(index)"
                  custom-style="margin-top: 8px;"
                >
                  删除
                </wd-button>
              </view>
              <wd-button 
                type="primary" 
                plain 
                @click="addProject"
                custom-style="margin-top: 8px;"
              >
                + 添加项目经历
              </wd-button>
            </view>
          </view>

          <!-- 教育经历 -->
          <view class="section">
            <view class="section-title">教育经历</view>
            <wd-cell-group>
              <wd-input 
                v-model="resumeData.education.school"
                label="学校"
                placeholder="请输入学校名称"
              />
              <wd-input 
                v-model="resumeData.education.degree"
                label="学历"
                placeholder="请输入学历"
              />
              <wd-input 
                v-model="resumeData.education.major"
                label="专业"
                placeholder="请输入专业"
              />
              <wd-input 
                v-model="resumeData.education.duration"
                label="时间"
                placeholder="如：2015-2019"
              />
            </wd-cell-group>
          </view>

          <!-- 自我评价 -->
          <view class="section">
            <view class="section-title">自我评价</view>
            <wd-textarea 
              v-model="resumeData.selfEvaluation"
              placeholder="请输入自我评价"
              :maxlength="500"
              show-word-limit
              :rows="6"
            />
          </view>
        </scroll-view>
      </view>

      <!-- 预览区域 -->
      <view class="preview-area">
        <view class="preview-container" id="resumePreview">
          <ResumeTemplate 
            :template="currentTemplate"
            :data="resumeData"
          />
        </view>
      </view>
    </view>

    <!-- 加载提示 -->
    <wd-loading :loading="isLoading" />
  </view>
</template>

<script setup>
import { useResumeStore } from '@/store/modules/resume.ts'
import ResumeTemplate from '@/pages/resumeTemplate/index.vue'

const resumeStore = useResumeStore()
const isLoading = ref(false)
const currentTemplate = ref(0)

// 模板数据
const templates = ref([
  {
    name: '经典模板',
    thumbnail: '/static/templates/classic.png'
  },
  {
    name: '现代模板', 
    thumbnail: '/static/templates/modern.png'
  },
  {
    name: '简约模板',
    thumbnail: '/static/templates/minimal.png'
  }
])

// 简历数据
const resumeData = reactive({
  basic: {
    name: '周锦龙',
    age: '27岁',
    phone: '13526463727',
    email: '765637726@qq.com',
    position: '前端开发工程师',
    salary: '10-11K',
    city: '郑州'
  },
  advantages: [
    '扎实的前端开发基础：熟练掌握 HTML、CSS、JavaScript，具备 5 年项目开发经验',
    '精通 Vue 生态：深入掌握 Vue 2 和 Vue 3 + TypeScript，以及 UniApp 一套代码多端开发',
    '跨平台桌面开发经验：使用 Electron 开发桌面端应用，实现多平台适配',
    '熟练使用现代前端工具：熟悉 Vite、electron-vite、webpack等构建工具',
    '后端与部署能力：具备 Java 后端开发经验，数据库操作与 SQL 语句编写',
    '用户体验与性能优化：具备优秀的用户体验与交互设计能力'
  ],
  workExperience: [
    {
      company: '河南富通信息技术有限公司',
      position: '前端开发工程师',
      duration: '2024.02-2025.03'
    },
    {
      company: '意智科界(无锡)技术有限公司',
      position: '前端开发工程师', 
      duration: '2019.12-2024.02'
    }
  ],
  projects: [
    {
      name: 'RPA自动化',
      tech: 'vue3、typeScript、elecreon-vite、arco-design、Chrome插件、websocket、python、playwright、sm2',
      description: '使用 Electron-Vite 脚手架构建 RPA 桌面端应用，结合 Vite 的 HMR 热更新，大幅优化开发调试效率。'
    },
    {
      name: '评吸系统(pc)',
      tech: 'vue3、ts、layui-vue3、pinia、echarts、sm2、mqtt',
      description: '页面统一封装axios请求及拦截器处理加密、pinia状态管理、按钮级权限自定义指令以及table的统一封装'
    }
  ],
  education: {
    school: '武昌理工学院',
    degree: '本科',
    major: '计算机科学与技术',
    duration: '2015-2019'
  },
  selfEvaluation: '本人对着未来有着明确的职业目标和学习计划，将全力以赴成为一名优秀的全栈工程师；热爱技术，平时喜欢搜一些和发布博客；抗压能力强，能接受较高强度的工作；有良好的代码编程习惯，善于封装常用的工具类。'
})

// 选择模板
const selectTemplate = (index) => {
  currentTemplate.value = index
}

// 添加/删除方法
const addAdvantage = () => {
  resumeData.advantages.push('')
}

const removeAdvantage = (index) => {
  resumeData.advantages.splice(index, 1)
}

const addExperience = () => {
  resumeData.workExperience.push({
    company: '',
    position: '',
    duration: ''
  })
}

const removeExperience = (index) => {
  resumeData.workExperience.splice(index, 1)
}

const addProject = () => {
  resumeData.projects.push({
    name: '',
    tech: '',
    description: ''
  })
}

const removeProject = (index) => {
  resumeData.projects.splice(index, 1)
}

// 预览简历
const previewResume = () => {
  uni.navigateTo({
    url: '/pages/preview/index'
  })
}

// 导出PDF
const exportToPDF = async () => {
  isLoading.value = true
  try {
    // 导出PDF逻辑
    await generatePDF()
    uni.showToast({
      title: 'PDF导出成功',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: 'PDF导出失败',
      icon: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

// 生成PDF
const generatePDF = async () => {
  // #ifdef H5
  const html2canvas = (await import('html2canvas')).default
  const jsPDF = (await import('jspdf')).default
  
  const element = document.getElementById('resumePreview')
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgWidth = 210
  const pageHeight = 295
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  
  let position = 0
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }
  
  pdf.save('resume.pdf')
  // #endif
  
  // #ifndef H5
  uni.showToast({
    title: 'PDF导出仅支持H5端',
    icon: 'none'
  })
  // #endif
}

// 返回
const goBack = () => {
  uni.navigateBack()
}

// 监听数据变化，自动保存
watch(resumeData, () => {
  resumeStore.saveResume(resumeData)
}, { deep: true })

onMounted(() => {
  // 加载保存的简历数据
  // const savedData = resumeStore?.getResume()
  // if (savedData) {
  //   Object.assign(resumeData, savedData)
  // }
})
</script>

<style lang="scss" scoped>
.resume-editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.editor-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editor-sidebar {
  width: 380px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  
  .sidebar-scroll {
    height: 100%;
    padding: 16px;
  }
}

.section {
  margin-bottom: 24px;
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid #4f46e5;
  }
}

.template-selector {
  display: flex;
  gap: 12px;
  
  .template-item {
    flex: 1;
    text-align: center;
    padding: 8px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    
    &.active {
      border-color: #4f46e5;
      background-color: #f0f0ff;
    }
    
    .template-thumb {
      width: 60px;
      height: 80px;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    
    .template-name {
      font-size: 12px;
      color: #666;
    }
  }
}

.advantage-item,
.experience-item,
.project-item {
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 12px;
}

.preview-area {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  
  .preview-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    min-height: 100%;
  }
}

.nav-actions {
  display: flex;
  align-items: center;
}

// 移动端适配
@media (max-width: 768px) {
  .editor-container {
    flex-direction: column;
  }
  
  .editor-sidebar {
    width: 100%;
    height: 60%;
  }
  
  .preview-area {
    height: 40%;
  }
}
</style>