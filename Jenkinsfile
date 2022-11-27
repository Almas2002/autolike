node('autolike'){
    stage('Build') {

                            checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                            extensions: [], userRemoteConfigs: [[credentialsId: 'git', url: 'https://github.com/Almas2002/autolike.git']]])

    }
    stage('docker') {

                               docker compose stop
                               docker compose build
                               docker compose up -d

                }
}
