node {
  stage "Checkout"
  checkout(
    [$class: 'GitSCM', branches: [[name: '*/master']],
     doGenerateSubmoduleConfigurations: false,
     extensions: [[$class: 'CleanBeforeCheckout']],
     submoduleCfg: [],
     userRemoteConfigs:
       [[url: 'git@github.com:designit/cfc-chef.git']]])

  stage "NPM Update"
  sh "npm update"

  stage "Maven Build and Unit Test"
  def mvnHome = tool name: 'Default', type: 'hudson.tasks.Maven$MavenInstallation'
  sh "${mvnHome}/bin/mvn clean package"

  stage "Publish Unit Test Report"
  step([$class: 'JUnitResultArchiver', testResults: '**/src/target/test-reports/test-*.xml'])

  stage "Release project artefatcs to Nexus"
  //sh "${mvnHome}/bin/mvn clean release:prepare release:perform"
  sh "${mvnHome}/bin/mvn clean deploy"

  stage "Deploy to AEM"
  sh "${mvnHome}/bin/mvn clean install -PautoInstallPackage -Daem.host=aem-author.chelsea.rig -Daem.port=80"
}
