pipeline{
  agent any
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5',daysToKeepStr: '', numToKeepStr: '5')
    disableConcurrentBuilds()
  }
  stages{
    stage('Hello') {
      steps {
        echo "hello"
      }
    }
    stage('Hoi') {
      when {
        branch "jenkinsTestCheck1"
      }
      steps {
        echo "It is jenkinsTestCheck1"
      }
    }
  }
}
