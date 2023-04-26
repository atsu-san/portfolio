# Database Specification

## plants Table

|No.|Field|Type|Null|Key|Note|
|----|----|----|----|----|----|
|1|id|bigint|No|Primary||
|2|name|character varying|No|||
|3|description|text|Yes|||
|4|created_at|timestamp(6)|No|||
|5|updated_at|timestamp(6)|No|||
|6|status|character varying|Yes|||

## plant_images Table

|No.|Field|Type|Null|Key|Note|
|----|----|----|----|----|----|
|1|id|bigint|No|Primary||
|2|plant_id|bigint|No|Foreign||
|3|url|text|No|||
|4|created_at|timestamp(6)|No|||
|5|updated_at|timestamp(6)|No|||
|6|status|character varying|Yes|||
