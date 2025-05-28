// store/resume.js
import { defineStore } from "pinia";

export const useResumeStore = defineStore("resume", {
  state: () => ({
    // 当前编辑的简历数据
    currentResume: {
      id: null,
      basic: {
        name: "",
        age: "",
        phone: "",
        email: "",
        position: "",
        salary: "",
        city: "",
      },
      advantages: [],
      workExperience: [],
      projects: [],
      education: {
        school: "",
        degree: "",
        major: "",
        duration: "",
      },
      selfEvaluation: "",
    },

    // 简历列表
    resumeList: [],

    // 当前选择的模板
    selectedTemplate: 0,

    // 模板列表
    templates: [
      {
        id: 0,
        name: "经典模板",
        thumbnail: "/static/templates/classic.png",
        description: "传统简洁的简历布局，适合大多数行业",
      },
      {
        id: 1,
        name: "现代模板",
        thumbnail: "/static/templates/modern.png",
        description: "现代化设计，突出个人特色",
      },
      {
        id: 2,
        name: "简约模板",
        thumbnail: "/static/templates/minimal.png",
        description: "极简设计，专注内容本身",
      },
    ],
  }),

  getters: {
    // 获取当前简历的完整性百分比
    completionPercentage: (state) => {
      const { basic, advantages, workExperience, projects, education, selfEvaluation } = state.currentResume;
      let completed = 0;
      let total = 0;

      // 基本信息权重 (40%)
      const basicFields = ["name", "phone", "email", "position"];
      basicFields.forEach((field) => {
        total++;
        if (basic[field] && basic[field].trim()) completed++;
      });

      // 个人优势权重 (20%)
      total++;
      if (advantages && advantages.length > 0 && advantages.some((item) => item.trim())) {
        completed++;
      }

      // 工作经历权重 (20%)
      total++;
      if (workExperience && workExperience.length > 0 && workExperience.some((exp) => exp.company && exp.position)) {
        completed++;
      }

      // 项目经历权重 (10%)
      total++;
      if (projects && projects.length > 0 && projects.some((proj) => proj.name)) {
        completed++;
      }

      // 教育经历权重 (10%)
      total++;
      if (education && education.school && education.major) {
        completed++;
      }

      return Math.round((completed / total) * 100);
    },

    // 获取简历预览数据
    previewData: (state) => {
      return {
        ...state.currentResume,
        template: state.selectedTemplate,
      };
    },
  },

  actions: {
    // 初始化默认简历数据
    initDefaultResume() {
      this.currentResume = {
        id: Date.now(),
        basic: {
          name: "周锦龙",
          age: "27岁",
          phone: "13526463727",
          email: "765637726@qq.com",
          position: "前端开发工程师",
          salary: "10-11K",
          city: "郑州",
        },
        advantages: [
          "扎实的前端开发基础：熟练掌握 HTML、CSS、JavaScript，具备 5 年项目开发经验",
          "精通 Vue 生态：深入掌握 Vue 2 和 Vue 3 + TypeScript，以及 UniApp 一套代码多端开发",
          "跨平台桌面开发经验：使用 Electron 开发桌面端应用，实现多平台适配",
          "熟练使用现代前端工具：熟悉 Vite、electron-vite、webpack等构建工具",
          "后端与部署能力：具备 Java 后端开发经验，数据库操作与 SQL 语句编写",
          "用户体验与性能优化：具备优秀的用户体验与交互设计能力",
        ],
        workExperience: [
          {
            company: "河南富通信息技术有限公司",
            position: "前端开发工程师",
            duration: "2024.02-2025.03",
          },
          {
            company: "意智科界(无锡)技术有限公司",
            position: "前端开发工程师",
            duration: "2019.12-2024.02",
          },
        ],
        projects: [
          {
            name: "RPA自动化",
            tech: "vue3、typeScript、electron-vite、arco-design、Chrome插件、websocket、python、playwright、sm2",
            description: "使用 Electron-Vite 脚手架构建 RPA 桌面端应用，结合 Vite 的 HMR 热更新，大幅优化开发调试效率。统一封装 Axios 请求模块、Pinia 公共存储库和公用组件库，显著提升组件的复用性与开发迭代效率。",
          },
          {
            name: "评吸系统(pc)",
            tech: "vue3、ts、layui-vue3、pinia、echarts、sm2、mqtt",
            description: "页面统一封装axios请求及拦截器处理加密、pinia状态管理、按钮级权限自定义指令以及table的统一封装。使用mqtt物联网协议对评吸室的评吸盒子进行控制送电、断电、开关锁、收发消息通知。",
          },
          {
            name: "法兰管家（pc）",
            tech: "vite、vue3、typeScript、Pinia、element-plus、Echarts、fabricjs、html2canvas、jspdf",
            description: "全局模块：页面统一封装 fetch 请求以及图片/文件上传的方法，状态管理工具使用 pinia。Canvas 模块：使用 fabricjs 插件，封装底层核心代码，封装拖拽的方式来实现画图纸操作。",
          },
        ],
        education: {
          school: "武昌理工学院",
          degree: "本科",
          major: "计算机科学与技术",
          duration: "2015-2019",
        },
        selfEvaluation:
          "本人对着未来有着明确的职业目标和学习计划，将全力以赴成为一名优秀的全栈工程师；热爱技术，平时喜欢搜一些和发布博客掘金；抗压能力强，能接受较高强度的工作；有良好的代码编程习惯，善于封装常用的工具类，对常见的 BUG 和技术难点习惯做笔记；思路清晰，善于钻研，对新技术有着强烈的求知欲望。",
      };
    },

    // 保存简历到本地存储
    saveResume(resumeData) {
      try {
        if (resumeData) {
          this.currentResume = { ...resumeData };
        }

        const resumeJson = JSON.stringify(this.currentResume);
        uni.setStorageSync("currentResume", resumeJson);

        // 保存到简历列表
        this.saveToResumeList();

        return true;
      } catch (error) {
        console.error("保存简历失败:", error);
        return false;
      }
    },

    // 保存到简历列表
    saveToResumeList() {
      try {
        const existingIndex = this.resumeList.findIndex((resume) => resume.id === this.currentResume.id);

        const resumeItem = {
          ...this.currentResume,
          updateTime: new Date().toISOString(),
          template: this.selectedTemplate,
        };

        if (existingIndex >= 0) {
          this.resumeList[existingIndex] = resumeItem;
        } else {
          this.resumeList.unshift(resumeItem);
        }

        uni.setStorageSync("resumeList", JSON.stringify(this.resumeList));
      } catch (error) {
        console.error("保存简历列表失败:", error);
      }
    },

    // 从本地存储加载简历
    loadResume() {
      try {
        const resumeJson = uni.getStorageSync("currentResume");
        if (resumeJson) {
          this.currentResume = JSON.parse(resumeJson);
          return true;
        }
        return false;
      } catch (error) {
        console.error("加载简历失败:", error);
        return false;
      }
    },

    // 加载简历列表
    loadResumeList() {
      try {
        const listJson = uni.getStorageSync("resumeList");
        if (listJson) {
          this.resumeList = JSON.parse(listJson);
        }
      } catch (error) {
        console.error("加载简历列表失败:", error);
        this.resumeList = [];
      }
    },

    // 创建新简历
    createNewResume() {
      this.currentResume = {
        id: Date.now(),
        basic: {
          name: "",
          age: "",
          phone: "",
          email: "",
          position: "",
          salary: "",
          city: "",
        },
        advantages: [""],
        workExperience: [
          {
            company: "",
            position: "",
            duration: "",
          },
        ],
        projects: [
          {
            name: "",
            tech: "",
            description: "",
          },
        ],
        education: {
          school: "",
          degree: "",
          major: "",
          duration: "",
        },
        selfEvaluation: "",
      };
      this.selectedTemplate = 0;
    },

    // 加载指定简历
    loadResumeById(id) {
      const resume = this.resumeList.find((item) => item.id === id);
      if (resume) {
        this.currentResume = { ...resume };
        this.selectedTemplate = resume.template || 0;
        this.saveResume();
        return true;
      }
      return false;
    },

    // 删除简历
    deleteResume(id) {
      const index = this.resumeList.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.resumeList.splice(index, 1);
        uni.setStorageSync("resumeList", JSON.stringify(this.resumeList));
        return true;
      }
      return false;
    },

    // 复制简历
    duplicateResume(id) {
      const resume = this.resumeList.find((item) => item.id === id);
      if (resume) {
        const newResume = {
          ...resume,
          id: Date.now(),
          basic: {
            ...resume.basic,
            name: resume.basic.name + " (副本)",
          },
          updateTime: new Date().toISOString(),
        };
        this.resumeList.unshift(newResume);
        uni.setStorageSync("resumeList", JSON.stringify(this.resumeList));
        return newResume.id;
      }
      return null;
    },

    // 选择模板
    selectTemplate(templateId) {
      this.selectedTemplate = templateId;
      this.saveResume();
    },

    // 获取模板信息
    getTemplateById(id) {
      return this.templates.find((template) => template.id === id);
    },

    // 导出简历数据
    exportResumeData() {
      return {
        resume: this.currentResume,
        template: this.selectedTemplate,
        exportTime: new Date().toISOString(),
      };
    },

    // 导入简历数据
    importResumeData(data) {
      try {
        if (data.resume) {
          this.currentResume = { ...data.resume };
          this.currentResume.id = Date.now(); // 生成新ID
        }
        if (data.template !== undefined) {
          this.selectedTemplate = data.template;
        }
        this.saveResume();
        return true;
      } catch (error) {
        console.error("导入简历数据失败:", error);
        return false;
      }
    },

    // 验证简历数据完整性
    validateResume() {
      const errors = [];
      const { basic, advantages, workExperience } = this.currentResume;

      // 验证基本信息
      if (!basic.name || !basic.name.trim()) {
        errors.push("请填写姓名");
      }
      if (!basic.phone || !basic.phone.trim()) {
        errors.push("请填写手机号");
      }
      if (!basic.email || !basic.email.trim()) {
        errors.push("请填写邮箱");
      }
      if (!basic.position || !basic.position.trim()) {
        errors.push("请填写求职意向");
      }

      // 验证个人优势
      if (!advantages || advantages.length === 0 || !advantages.some((item) => item && item.trim())) {
        errors.push("请至少填写一个个人优势");
      }

      // 验证工作经历
      if (!workExperience || workExperience.length === 0 || !workExperience.some((exp) => exp.company && exp.position)) {
        errors.push("请至少填写一个工作经历");
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    },

    // 重置所有数据
    resetAll() {
      this.currentResume = {
        id: null,
        basic: {
          name: "",
          age: "",
          phone: "",
          email: "",
          position: "",
          salary: "",
          city: "",
        },
        advantages: [],
        workExperience: [],
        projects: [],
        education: {
          school: "",
          degree: "",
          major: "",
          duration: "",
        },
        selfEvaluation: "",
      };
      this.selectedTemplate = 0;
      uni.removeStorageSync("currentResume");
    },
  },
});
