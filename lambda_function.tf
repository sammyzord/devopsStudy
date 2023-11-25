terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "eu-west-1"
}

resource "aws_lambda_function" "test_lambda" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "lambda_function.zip"
  function_name = "hello_world"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  depends_on    = [aws_iam_role_policy_attachment.lambda_role_policy_attachment]

  environment {
    variables = {
      foo = "bar"
    }
  }

}
resource "aws_lambda_function_url" "test_lambda_url" {
  function_name      = aws_lambda_function.test_lambda.function_name
  authorization_type = "NONE"
}

data "archive_file" "lambda_function_zip" {
  type        = "zip"
  source_dir  = "lambda"
  output_path = "lambda_function.zip"
}


resource "aws_iam_role" "lambda_role" {

  name = "lambda_role"
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Principal" : {
            "Service" : [
              "lambda.amazonaws.com"
            ]
          },
          Action = "sts:AssumeRole",
        }
      ]
  })
}

resource "aws_iam_policy" "lambda_policy" {

  name = "lambda_policy"
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          Effect = "Allow"
          Action = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ]
          Resource = ["arn:aws:logs:*:*:*"]
        }
      ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_role_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_policy.arn
  role       = aws_iam_role.lambda_role.name
}
