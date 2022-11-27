pipeline {
    agent any;
    stages {
        stage('Example Build') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                extensions: [], userRemoteConfigs: [[credentialsId: 'git', url: 'https://github.com/Almas2002/autolike.git']]])
            }
        }
    }
}