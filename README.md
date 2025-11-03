# 🧩 Jenkins Multistage Pipeline – Task 2

**App:** inventory-api  
**Repo:** Jenkins-multistage-demo  
**Student:** Esha Sangra

---

## 🎯 Objective

To implement a **Multistage Jenkins Pipeline** with automatic builds and branch-based deployment.

**Pipeline Stages:**

1. **Build** → Installs dependencies and builds the app
2. **Test** → Runs test scripts
3. **Deploy** → Runs only for `dev` branch (conditional deployment)

---

## 🌳 Branch Structure

| Branch Name   | Purpose                  | Stages                |
| ------------- | ------------------------ | --------------------- |
| `feature-api` | Backend/API logic        | Build + Test          |
| `feature-ui`  | Frontend work            | (inactive)            |
| `dev`         | Integration + Deployment | Build + Test + Deploy |

---

## 🔄 Jenkins Multibranch Pipeline

Jenkins automatically detected and created jobs for each branch in the GitHub repo.

✅ `feature-api` → executes Build + Test  
✅ `dev` → executes Build + Test + Deploy  
❌ `feature-ui` → skipped (no Jenkinsfile)

**Trigger:**  
Merging `feature-api` → `dev` triggers the pipeline automatically.

---

## ⚙️ Jenkinsfile Overview

```groovy
pipeline {
  agent any
  options { timestamps() }

  stages {
    stage('Build') {
      steps {
        echo "=== BUILD STAGE ==="
        echo "Branch: ${env.BRANCH_NAME}"
        sh '''
          node -v
          npm -v
          cd inventory-api
          npm install
          npm run build
        '''
      }
    }

    stage('Test') {
      steps {
        echo "=== TEST STAGE ==="
        sh '''
          cd inventory-api
          npm test
        '''
      }
    }

    stage('Deploy') {
      when { branch 'dev' }
      steps {
        echo "=== DEPLOY STAGE ==="
        sh '''
          cd inventory-api
          echo "docker build -t inventory-api:latest ."
          echo "docker run -d -p 8080:8080 inventory-api"
        '''
      }
    }
  }

  post {
    success { echo "PIPELINE SUCCESS for branch ${env.BRANCH_NAME}" }
    failure { echo "PIPELINE FAILED for branch ${env.BRANCH_NAME}" }
  }
}
```
