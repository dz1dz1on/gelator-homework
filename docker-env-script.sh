#!/bin/sh

touch .env
{
  printf  "API_KEY="$ARG_ENV_SECRET"
} >> .env