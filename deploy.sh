#!/usr/bin/env bash

echo Running Fairer Falkirk Deploy, current branch is $BRANCH
echo Is Pull Request is $IS_PULL_REQUEST

if [ $IS_PULL_REQUEST == true ]
    then
        echo Not Deploying Build $BUILD_NUMBER - Branch is $BRANCH, Is Pull Request is $IS_PULL_REQUEST
        return
fi

# Only deploy to Staging if we're on develop
if [ $BRANCH == "develop" ]
    then

        # Install awscli
        echo Installing awscli
        pip install --upgrade pip
        pip install awscli

        # Deploy to S3
        echo Deploying to S3
        aws s3 sync build/ s3://fairer-falkirk
fi
