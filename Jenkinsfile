node('autolike'){
    stage('Build') {

                            checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                            extensions: [], userRemoteConfigs: [[credentialsId: 'git', url: 'https://github.com/Almas2002/autolike.git']]])

    }
    stage('build with docker') {

                              sh 'docker compose stop'
                              sh 'docker compose build'
                              sh 'docker compose up -d'

                }
}
