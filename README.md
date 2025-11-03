# Jenkins Multistage Pipeline – Task 2

**App:** inventory-api  
**Repo:** Jenkins-multistage-demo  
**Student:** Esha Sangra  
**Objective:** Implement a multi-stage Jenkins CI/CD pipeline using branch merging.

## Branches
- `feature-api` → Build + Test stages only  
- `dev` → Build + Test + Deploy (triggered on merge from feature-api)
- `feature-ui` → Frontend placeholder

## Jenkinsfile
Defines three stages:
1. **Build:** npm install & build
2. **Test:** npm test
3. **Deploy:** Executes only for `dev` branch using `when { branch 'dev' }`

## Summary
✔️ Jenkins Multibranch Pipeline configured  
✔️ Auto-branch detection from GitHub  
✔️ Pipeline triggered on merge (feature-api → dev)  
✔️ Multi-stage execution per branch  
