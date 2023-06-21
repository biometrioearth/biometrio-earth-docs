---
sidebar_position: 3
---

# Device

Has information about the devices used in the field. If they are broken, active or stolen, and can be related directly to the _Project_ or to a _Site_.

|   Field  | 	   Type	     | Used in search [?](../../balam-api/search-and-filter.md#search) | Description |  Observations | 
|:--------:|:-------------:|:------------------:|:------------------:|------------------:|
| serial_number | string | ✓ | The device's serial number | <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| additional_identifier | string | ✓ | An additional device identifier, could be a stock number or an id if it were imported from another DB | Optional |
| device_type | string | ✓ | The device's type, like a camera, recorder, etc. | <span style={{ borderBottom: "1px solid green"}}>Required.</span> | 
| brand | string |  | Device's brand name | <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| status | string | | Status of the device. It can be active, inactive, broken or missing | <span style={{ borderBottom: "1px solid green"}}>Required.</span> | 
| current_site_id | Foreign Key (UUID) | | The current site where device has been deployed | Optional |
| current_project | Foreign Key (UUID) | | The current project where device has been deployed | Optional |