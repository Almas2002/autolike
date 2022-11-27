pipeline {
    agent any;
    node('autolike'){
            stage('Example Build') {
                steps {
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                    extensions: [], userRemoteConfigs: [[credentialsId: 'git', url: 'https://github.com/Almas2002/autolike.git']]])
                }
            }
            stage('build') {
                        steps {
                           docker compose stop
                           docker compose build
                           docker compose up -d
                        }
            }

    }
}