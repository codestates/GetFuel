#!/bin/bash
cd /home/ubuntu/GetFuel/server

export JWT_ACCESS_SECRET=$(aws ssm get-parameters --region us-east-1 --names JWT_ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export JWT_REFRESH_SECRET=$(aws ssm get-parameters --region us-east-1 --names JWT_REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export JWT_ACCESS_EXPIRES=$(aws ssm get-parameters --region us-east-1 --names JWT_ACCESS_EXPIRES --query Parameters[0].Value | sed 's/"//g')
export JWT_REFRESH_EXPIRES=$(aws ssm get-parameters --region us-east-1 --names JWT_REFRESH_EXPIRES --query Parameters[0].Value | sed 's/"//g')
export DB_HOST=$(aws ssm get-parameters --region us-east-1 --names DB_HOST --query Parameters[0].Value | sed 's/"//g')
export HOST_PORT=$(aws ssm get-parameters --region us-east-1 --names HOST_PORT --query Parameters[0].Value | sed 's/"//g')
export BCRYPT_SALT_ROUNDS=$(aws ssm get-parameters --region us-east-1 --names BCRYPT_SALT_ROUNDS --query Parameters[0].Value | sed 's/"//g')
export OPINET_API_CODE=$(aws ssm get-parameters --region us-east-1 --names OPINET_API_CODE --query Parameters[0].Value | sed 's/"//g')






authbind --deep pm2 start app.js