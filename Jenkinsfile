node('slaveNode1'){
    stage('Build') {
        steps {
                            checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                            extensions: [], userRemoteConfigs: [[credentialsId: 'git', url: 'https://github.com/Almas2002/autolike.git']]])
                        }
    }
    stage('docker') {
                            steps {
                               docker compose stop
                               docker compose build
                               docker compose up -d
                            }
                }
}
