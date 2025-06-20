pipeline {
    agent any
    
    options {
        ansiColor('xterm')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Hugogome2/teste-api-ebac.git'
            }
        }

        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }

        stage('Subir Servidor') {
            steps {
                bat 'start /b npm start'
            }
        }

        stage('Executar Testes') {
            steps {
                bat 'npm test'
            }
        }
    }
}