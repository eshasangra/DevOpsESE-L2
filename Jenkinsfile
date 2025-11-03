pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Build') {
            steps {
                echo "=== BUILD STAGE ==="
                echo "Branch: ${env.BRANCH_NAME}"
                sh '''
                cd inventory-api
                npm install || true
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
            when {
                branch 'dev'
            }
            steps {
                echo "=== DEPLOY STAGE ==="
                echo "Simulating Docker build and run for inventory-api (only for dev branch)"
                sh '''
                cd inventory-api
                echo "docker build -t inventory-api:latest ."
                echo "docker run -d -p 8080:8080 --name inventory-api inventory-api:latest"
                '''
            }
        }
    }

    post {
        success {
            echo "PIPELINE SUCCESS for branch ${env.BRANCH_NAME}"
        }
        failure {
            echo "PIPELINE FAILED for branch ${env.BRANCH_NAME}"
        }
    }
}
