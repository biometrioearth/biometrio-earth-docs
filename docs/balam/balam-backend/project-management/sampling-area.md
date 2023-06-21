---
sidebar_position: 4
---

# Sampling Area

This one has a similar structure as the _Site_ but instead of a __Polygon__ it saves a __Point__ and a __radius__ to draw a circle of the area where devices are been deployed.

|   Field  | 	   Type	     | Used in search [?](../../balam-api/search-and-filter.md#search) | Description |  Observations | 
|:--------:|:-------------:|:------------------:|:------------------:|------------------:|
| identifier | string | ✓ | Sampling point identifier within the company | <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| description | string | | Short description of the sampling area | Optional |
| metadata | JSON | | Sampling area's metadata where we can include extra information | Optional |
| center_of_area | Point | | Georeference of central point of the area | Optional |
| radius_of_area | Float | | Radius (in kilometers) of the area | Optional |
| site_id | Foreign Key (UUID) | | Holds the relation with the _Site_ model | <span style={{ borderBottom: "1px solid green"}}>Required.</span> |