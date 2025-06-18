pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    stages {
        stage('Checkout') {
            steps {
                // Faz o checkout do código
                git branch: 'main', url: 'https://github.com/Hugogome2/teste-api-ebac.git'
                bat 'npm install'
            }
        }

        stage('CI') {
            steps {
          bat 'npm run ci'
      }
     post {
        always {
            // Se gerar XML JUnit, descomente a linha abaixo:
            // junit 'reports/**/*.xml'
            echo '💡 Para publicar JUnit, habilite o junit() acima.'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline ok'
        }
        failure {
            echo '❌ Pipeline falhou'
        }
    }
}