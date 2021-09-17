const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const PROJECT_NAME = 'cdk-fargate-express';
const PROJECT_DESCRIPTION = 'A sample JSII construct lib for Express Apps in AWS Fargate';
const AUTOMATION_TOKEN = 'AUTOMATION_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/pahud/cdk-fargate-express.git',
  authorName: 'Pahud Hsieh',
  authorEmail: 'pahudnet@gmail.com',
  cdkVersion: '1.79.0',
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud', 'cdk-automation'],
  },
  keywords: [
    'aws',
    'cdk',
    'fargate',
    'express',
  ],
  catalog: {
    twitter: 'pahudnet',
    announce: false,
  },
  defaultReleaseBranch: 'main',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-ecs-patterns',
  ],
  python: {
    distName: 'cdk-fargate-express',
    module: 'cd_fargate_express',
  },
});

project.package.addField('resolutions', {
  'pac-resolver': '^5.0.0',
  'set-value': '^4.0.1',
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
