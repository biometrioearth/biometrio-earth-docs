---
sidebar_position: 6
---

# File

This serves just as a registry of the files that are stored in an S3 bucket, or in another location. It also holds extra information like the metadata extracted from the file by __beadmex__.

|   Field  | 	   Type	     | Used in search [?](../../balam-api/search-and-filter.md#search) | Description |  Observations | 
|:--------:|:-------------:|:------------------:|:------------------:|------------------:|
| name | string | ✓ | Name of the file | <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span> | 
| mime_type | string | | MIME Type of file | <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| url | string | ✓ | Url of the file. | <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| file_metadata | JSON | | Metadata of the file | Optional |
| metadata_schema_id | Foreign Key (UUID) | | To validate the metadata of the file. | Optional |
| sampling_point_id | Foreign Key (UUID) | | Related sampling point. | Optional |
| project_id | Foreign Key (UUID) | | Related project. | <span style={{ borderBottom: "1px solid green"}}>Required.</span> |