#!/bin/sh

touch .env
{
  printf  "$ARG_ENV_SECRET"
} >> .env