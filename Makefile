# S3 Deploy
AWS_PATH_DEPLOY:=./build
AWS_BUCKET_NAME:=s3://dakota.thehappybeauty.co
AWS_CLOUDFRONT_ID:=E34MVHO0DAVRC4
AWS := aws

aws.deploy:
	$(AWS) s3 sync ${AWS_PATH_DEPLOY} ${AWS_BUCKET_NAME} --delete && \
	$(AWS) cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_ID} --paths '/*' && \
	$(AWS) cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_ID} --paths '/*'
