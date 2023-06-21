---
sidebar_position: 5
---

# Sampling Point

The _Sampling Point_ is a location in the field where a device has been deployed. It holds information about the deployment like the date, which device were deployed, etc.

|   Field  | 	   Type	     | Used in search [?](../../balam-api/search-and-filter.md#search) | Description |  Observations | 
|:--------:|:-------------:|:------------------:|:------------------:|------------------:|
| identifier | string | ✓ | Optional identifier for the sampling point | Optional |
| additional_identifier | string | | Additional identifier for the sampling point | Optional |
| date_deployment | DateTime | | Date and time of device deployment | <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| date_collected | DateTime | | Date and time of device retrievement | Optional |
| location | Point | | Location of the deployment (lat/long) | Optional |
| altitude | Float | | Altitude of deployment | Optional |
| metadata | JSON | | Metadata of the deployment. Can hold extra information | Optional |
| device_id | Foreign Key (UUID) | | Device that were deployed | Optional |
| sampling_area_id | Foreign Key (UUID) | | Sampling area related | Optional |
| site_id | Foreign Key (UUID) | | Site related | Optional |
| project_id | Foreign Key (UUID) | | Project related | Optional |
