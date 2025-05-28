<template>
  <view class="resume-template" :class="`template-${template}`">
    <!-- 经典模板 -->
    <view v-if="template === 0" class="classic-template">
      <!-- 头部信息 -->
      <view class="header-section">
        <view class="basic-info">
          <text class="name">{{ data.basic.name }}</text>
          <view class="info-row">
            <text class="info-item">{{ data.basic.age }}</text>
            <text class="info-item">{{ data.basic.phone }}</text>
            <text class="info-item">{{ data.basic.email }}</text>
          </view>
          <view class="position-info">
            <text class="position">{{ data.basic.position }}</text>
            <text class="salary">期望薪资：{{ data.basic.salary }}</text>
            <text class="city">期望城市：{{ data.basic.city }}</text>
          </view>
        </view>
      </view>

      <!-- 个人优势 -->
      <view class="section" v-if="data.advantages?.length">
        <view class="section-title">个人优势</view>
        <view class="advantages-list">
          <view 
            v-for="(advantage, index) in data.advantages" 
            :key="index"
            class="advantage-item"
            v-if="advantage.trim()"
          >
            {{ index + 1 }}. {{ advantage }}
          </view>
        </view>
      </view>

      <!-- 工作经历 -->
      <view class="section" v-if="data.workExperience?.length">
        <view class="section-title">工作经历</view>
        <view class="experience-list">
          <view 
            v-for="(exp, index) in data.workExperience" 
            :key="index"
            class="experience-item"
            v-if="exp.company || exp.position"
          >
            <view class="exp-header">
              <text class="company">{{ exp.company }}</text>
              <text class="position">{{ exp.position }}</text>
              <text class="duration">{{ exp.duration }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 项目经历 -->
      <view class="section" v-if="data.projects?.length">
        <view class="section-title">项目经历</view>
        <view class="projects-list">
          <view 
            v-for="(project, index) in data.projects" 
            :key="index"
            class="project-item"
            v-if="project.name"
          >
            <view class="project-header">
              <text class="project-name">{{ project.name }}</text>
            </view>
            <view class="project-tech" v-if="project.tech">
              <text class="tech-label">技术栈：</text>
              <text class="tech-content">{{ project.tech }}</text>
            </view>
            <view class="project-desc" v-if="project.description">
              <text class="desc-label">技术实现：</text>
              <text class="desc-content">{{ project.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 教育经历 -->
      <view class="section" v-if="data.education?.school">
        <view class="section-title">教育经历</view>
        <view class="education-item">
          <view class="edu-info">
            <text class="school">{{ data.education.school }}</text>
            <text class="degree">{{ data.education.degree }}</text>
            <text class="major">{{ data.education.major }}</text>
            <text class="duration">{{ data.education.duration }}</text>
          </view>
        </view>
      </view>

      <!-- 自我评价 -->
      <view class="section" v-if="data.selfEvaluation">
        <view class="section-title">自我评价</view>
        <view class="evaluation-content">
          {{ data.selfEvaluation }}
        </view>
      </view>
    </view>

    <!-- 现代模板 -->
    <view v-else-if="template === 1" class="modern-template">
      <view class="modern-header">
        <view class="avatar-section">
          <view class="avatar-placeholder"></view>
        </view>
        <view class="basic-info">
          <text class="name">{{ data.basic.name }}</text>
          <text class="position">{{ data.basic.position }}</text>
          <view class="contact-info">
            <view class="contact-item">📞 {{ data.basic.phone }}</view>
            <view class="contact-item">📧 {{ data.basic.email }}</view>
            <view class="contact-item">🏙️ {{ data.basic.city }}</view>
            <view class="contact-item">💰 {{ data.basic.salary }}</view>
          </view>
        </view>
      </view>

      <view class="modern-body">
        <view class="left-column">
          <!-- 个人优势 -->
          <view class="modern-section" v-if="data.advantages?.length">
            <text class="modern-title">🌟 核心优势</text>
            <view class="advantages-grid">
              <view 
                v-for="(advantage, index) in data.advantages.slice(0, 4)" 
                :key="index"
                class="advantage-card"
                v-if="advantage.trim()"
              >
                {{ advantage }}
              </view>
            </view>
          </view>

          <!-- 技能标签 -->
          <view class="modern-section">
            <text class="modern-title">🔧 技术栈</text>
            <view class="skills-tags">
              <text class="skill-tag">Vue3</text>
              <text class="skill-tag">TypeScript</text>
              <text class="skill-tag">Electron</text>
              <text class="skill-tag">UniApp</text>
              <text class="skill-tag">Pinia</text>
              <text class="skill-tag">Vite</text>
            </view>
          </view>
        </view>

        <view class="right-column">
          <!-- 工作经历 -->
          <view class="modern-section" v-if="data.workExperience?.length">
            <text class="modern-title">💼 工作经历</text>
            <view class="timeline">
              <view 
                v-for="(exp, index) in data.workExperience" 
                :key="index"
                class="timeline-item"
                v-if="exp.company"
              >
                <view class="timeline-dot"></view>
                <view class="timeline-content">
                  <text class="company">{{ exp.company }}</text>
                  <text class="position">{{ exp.position }}</text>
                  <text class="duration">{{ exp.duration }}</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 项目经历 -->
          <view class="modern-section" v-if="data.projects?.length">
            <text class="modern-title">🚀 项目经历</text>
            <view class="project-cards">
              <view 
                v-for="(project, index) in data.projects" 
                :key="index"
                class="project-card"
                v-if="project.name"
              >
                <text class="project-name">{{ project.name }}</text>
                <text class="project-tech">{{ project.tech }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 简约模板 -->
    <view v-else-if="template === 2" class="minimal-template">
      <view class="minimal-header">
        <text class="name">{{ data.basic.name }}</text>
        <text class="position">{{ data.basic.position }}</text>
        <view class="contact-line">
          {{ data.basic.phone }} • {{ data.basic.email }} • {{ data.basic.city }}
        </view>
      </view>

      <!-- 简约内容 -->
      <view class="minimal-content">
        <!-- 工作经历 -->
        <view class="minimal-section" v-if="data.workExperience?.length">
          <text class="minimal-title">Experience</text>
          <view class="minimal-line"></view>
          <view 
            v-for="(exp, index) in data.workExperience" 
            :key="index"
            class="minimal-item"
            v-if="exp.company"
          >
            <view class="item-header">
              <text class="item-title">{{ exp.position }}</text>
              <text class="item-duration">{{ exp.duration }}</text>
            </view>
            <text class="item-subtitle">{{ exp.company }}</text>
          </view>
        </view>

        <!-- 项目经历 -->
        <view class="minimal-section" v-if="data.projects?.length">
          <text class="minimal-title">Projects</text>
          <view class="minimal-line"></view>
          <view 
            v-for="(project, index) in data.projects" 
            :key="index"
            class="minimal-item"
            v-if="project.name"
          >
            <text class="item-title">{{ project.name }}</text>
            <text class="item-tech">{{ project.tech }}</text>
            <text class="item-desc">{{ project.description }}</text>
          </view>
        </view>

        <!-- 教育经历 -->
        <view class="minimal-section" v-if="data.education?.school">
          <text class="minimal-title">Education</text>
          <view class="minimal-line"></view>
          <view class="minimal-item">
            <view class="item-header">
              <text class="item-title">{{ data.education.major }}</text>
              <text class="item-duration">{{ data.education.duration }}</text>
            </view>
            <text class="item-subtitle">{{ data.education.school }} • {{ data.education.degree }}</text>
          </view>
        </view>

        <!-- 技能 -->
        <view class="minimal-section" v-if="data.advantages?.length">
          <text class="minimal-title">Skills</text>
          <view class="minimal-line"></view>
          <view class="skills-list">
            <text 
              v-for="(advantage, index) in data.advantages" 
              :key="index"
              class="skill-item"
              v-if="advantage.trim()"
            >
              {{ advantage }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  template: {
    type: Number,
    default: 0
  },
  data: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.resume-template {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: #333;
  background: #fff;
  min-height: 842px; // A4 height
  width: 595px; // A4 width
  margin: 0 auto;
}

/* 经典模板样式 */
.classic-template {
  .header-section {
    border-bottom: 2px solid #4f46e5;
    padding-bottom: 20px;
    margin-bottom: 30px;
    
    .name {
      font-size: 32px;
      font-weight: bold;
      color: #4f46e5;
      display: block;
      margin-bottom: 8px;
    }
    
    .info-row {
      display: flex;
      gap: 20px;
      margin-bottom: 8px;
      
      .info-item {
        font-size: 14px;
        color: #666;
      }
    }
    
    .position-info {
      display: flex;
      gap: 20px;
      
      .position {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      
      .salary, .city {
        font-size: 14px;
        color: #666;
      }
    }
  }
  
  .section {
    margin-bottom: 30px;
    
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #4f46e5;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
  }
  
  .advantages-list {
    .advantage-item {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 1.8;
    }
  }
  
  .experience-list {
    .experience-item {
      margin-bottom: 16px;
      
      .exp-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .company {
          font-weight: 600;
          font-size: 16px;
        }
        
        .position {
          color: #666;
          font-size: 14px;
        }
        
        .duration {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  
  .projects-list {
    .project-item {
      margin-bottom: 20px;
      
      .project-header {
        margin-bottom: 8px;
        
        .project-name {
          font-weight: 600;
          font-size: 16px;
          color: #333;
        }
      }
      
      .project-tech {
        margin-bottom: 8px;
        
        .tech-label {
          font-weight: 600;
          color: #4f46e5;
        }
        
        .tech-content {
          font-size: 14px;
          color: #666;
        }
      }
      
      .project-desc {
        .desc-label {
          font-weight: 600;
          color: #4f46e5;
          display: block;
          margin-bottom: 4px;
        }
        
        .desc-content {
          font-size: 14px;
          line-height: 1.8;
        }
      }
    }
  }
  
  .education-item {
    .edu-info {
      display: flex;
      gap: 15px;
      align-items: center;
      
      .school {
        font-weight: 600;
        font-size: 16px;
      }
      
      .degree, .major {
        font-size: 14px;
        color: #666;
      }
      
      .duration {
        font-size: 12px;
        color: #999;
        margin-left: auto;
      }
    }
  }
  
  .evaluation-content {
    font-size: 14px;
    line-height: 1.8;
    text-align: justify;
  }
}

/* 现代模板样式 */
.modern-template {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  .modern-header {
    display: flex;
    align-items: center;
    padding: 30px;
    margin-bottom: 30px;
    
    .avatar-section {
      .avatar-placeholder {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        margin-right: 30px;
      }
    }
    
    .basic-info {
      flex: 1;
      
      .name {
        font-size: 36px;
        font-weight: bold;
        display: block;
        margin-bottom: 8px;
      }
      
      .position {
        font-size: 18px;
        opacity: 0.9;
        display: block;
        margin-bottom: 12px;
      }
      
      .contact-info {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        
        .contact-item {
          font-size: 14px;
          opacity: 0.8;
        }
      }
    }
  }
  
  .modern-body {
    display: flex;
    gap: 30px;
    padding: 0 30px 30px;
    
    .left-column {
      flex: 1;
    }
    
    .right-column {
      flex: 2;
    }
  }
  
  .modern-section {
    margin-bottom: 30px;
    
    .modern-title {
      font-size: 20px;
      font-weight: bold;
      display: block;
      margin-bottom: 16px;
    }
  }
  
  .advantages-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    
    .advantage-card {
      background: rgba(255,255,255,0.1);
      padding: 12px;
      border-radius: 8px;
      font-size: 12px;
      line-height: 1.4;
    }
  }
  
  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .skill-tag {
      background: rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
    }
  }
  
  .timeline {
    .timeline-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      
      .timeline-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: white;
        margin-right: 16px;
        margin-top: 6px;
        flex-shrink: 0;
      }
      
      .timeline-content {
        flex: 1;
        
        .company {
          font-weight: 600;
          font-size: 16px;
          display: block;
        }
        
        .position {
          font-size: 14px;
          opacity: 0.8;
          display: block;
        }
        
        .duration {
          font-size: 12px;
          opacity: 0.6;
          display: block;
        }
      }
    }
  }
  
  .project-cards {
    display: grid;
    gap: 16px;
    
    .project-card {
      background: rgba(255,255,255,0.1);
      padding: 16px;
      border-radius: 8px;
      
      .project-name {
        font-weight: 600;
        font-size: 16px;
        display: block;
        margin-bottom: 8px;
      }
      
      .project-tech {
        font-size: 12px;
        opacity: 0.8;
        display: block;
      }
    }
  }
}

/* 简约模板样式 */
.minimal-template {
  color: #333;
  
  .minimal-header {
    text-align: center;
    padding: 40px 0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 40px;
    
    .name {
      font-size: 32px;
      font-weight: 300;
      display: block;
      margin-bottom: 8px;
      letter-spacing: 2px;
    }
    
    .position {
      font-size: 16px;
      color: #666;
      display: block;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .contact-line {
      font-size: 14px;
      color: #999;
    }
  }
  
  .minimal-content {
    .minimal-section {
      margin-bottom: 40px;
      
      .minimal-title {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #333;
        display: block;
        margin-bottom: 8px;
      }
      
      .minimal-line {
        height: 1px;
        background: #e0e0e0;
        margin-bottom: 20px;
      }
    }
    
    .minimal-item {
      margin-bottom: 20px;
      
      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 4px;
        
        .item-title {
          font-weight: 600;
          font-size: 16px;
        }
        
        .item-duration {
          font-size: 12px;
          color: #999;
        }
      }
      
      .item-subtitle {
        font-size: 14px;
        color: #666;
        display: block;
        margin-bottom: 8px;
      }
      
      .item-tech {
        font-size: 12px;
        color: #999;
        display: block;
        margin-bottom: 8px;
      }
      
      .item-desc {
        font-size: 14px;
        line-height: 1.6;
        display: block;
      }
    }
    
    .skills-list {
      .skill-item {
        display: block;
        font-size: 14px;
        margin-bottom: 8px;
        padding-left: 16px;
        position: relative;
        
        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #666;
        }
      }
    }
  }
}

// 响应式适配
@media (max-width: 768px) {
  .resume-template {
    width: 100%;
    padding: 16px;
    min-height: auto;
  }
  
  .modern-body {
    flex-direction: column !important;
    gap: 20px !important;
  }
  
  .modern-header {
    flex-direction: column !important;
    text-align: center;
    
    .avatar-section {
      margin-bottom: 20px;
      
      .avatar-placeholder {
        margin: 0 auto !important;
      }
    }
  }
  
  .advantages-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>